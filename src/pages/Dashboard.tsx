import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } else {
      setTasks((data || []) as Task[]);
    }
    setLoading(false);
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .insert([{ title, description, priority, user_id: user.id }]);

    if (error) {
      toast.error('Failed to create task');
      console.error(error);
    } else {
      toast.success('Task created!');
      setTitle('');
      setDescription('');
      setPriority('medium');
      setShowForm(false);
      fetchTasks();
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to update task');
    } else {
      toast.success('Task updated!');
      fetchTasks();
    }
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to delete task');
    } else {
      toast.success('Task deleted!');
      fetchTasks();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-primary" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <Button variant="outline" onClick={signOut} data-testid="signout-button">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">My Tasks</h2>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} data-testid="add-task-button">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
              <CardDescription>Add a new task to your list</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    data-testid="task-title-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    data-testid="task-description-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                    <SelectTrigger data-testid="task-priority-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" data-testid="create-task-button">Create Task</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No tasks yet. Create your first task!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4" data-testid="tasks-list">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow" data-testid={`task-${task.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <CardTitle className="text-xl">{task.title}</CardTitle>
                        {task.description && (
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                        )}
                      </div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Select value={task.status} onValueChange={(v) => updateTaskStatus(task.id, v as any)}>
                        <SelectTrigger className="w-[150px]" data-testid={`status-select-${task.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      data-testid={`delete-task-${task.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
