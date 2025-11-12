import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Zap, Shield, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            TaskFlow
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            The modern task management solution with comprehensive testing and enterprise-grade reliability
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Built for Reliability</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Fully Tested</h3>
                <p className="text-muted-foreground">
                  70%+ code coverage with Jest, React Testing Library, and Cypress E2E tests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Fast & Efficient</h3>
                <p className="text-muted-foreground">
                  Built with modern React, TypeScript, and Vite for optimal performance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 mb-4 text-success" />
                <h3 className="text-xl font-bold mb-2">Secure by Design</h3>
                <p className="text-muted-foreground">
                  Row-level security policies and error boundaries ensure data protection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <BarChart className="h-12 w-12 mb-4 text-warning" />
                <h3 className="text-xl font-bold mb-2">Production Ready</h3>
                <p className="text-muted-foreground">
                  Full logging, debugging tools, and performance monitoring setup
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers building reliable applications with TaskFlow
          </p>
          <Button asChild size="lg">
            <Link to="/auth">Start Building Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 TaskFlow. Built with Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
