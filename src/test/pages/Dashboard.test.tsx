import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '@/pages/Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          data: [],
          error: null,
        })),
      })),
      insert: vi.fn(() => ({ error: null })),
      update: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
      delete: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({
        data: {
          session: {
            user: {
              id: 'test-user-id',
              email: 'test@example.com',
            },
          },
        },
      })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderDashboard = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard', async () => {
    const { getByText } = renderDashboard();
    await waitFor(() => {
      expect(getByText('TaskFlow')).toBeInTheDocument();
    });
  });
});
