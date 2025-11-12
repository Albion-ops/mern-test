import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button disabled onClick={handleClick}>Click me</Button>);
    expect(getByText('Click me')).toBeDisabled();
  });

  it('applies variant styles correctly', () => {
    const { getByText, rerender } = render(<Button variant="default">Default</Button>);
    expect(getByText('Default')).toHaveClass('bg-primary');
    
    rerender(<Button variant="destructive">Destructive</Button>);
    expect(getByText('Destructive')).toHaveClass('bg-destructive');
  });
});
