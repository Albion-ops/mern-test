import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that works fine
const WorkingComponent = () => <div>Working content</div>;

describe('ErrorBoundary Component', () => {
  // Suppress console errors for this test
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );
    expect(getByText('Working content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
