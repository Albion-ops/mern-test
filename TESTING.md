# Testing Documentation

## Overview

This TaskFlow application is built with comprehensive testing infrastructure to ensure reliability and maintainability. We achieve **70%+ code coverage** across unit, integration, and end-to-end tests.

## Testing Stack

- **Vitest**: Fast unit and integration testing
- **React Testing Library**: Component and hook testing
- **Cypress**: End-to-end testing
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation

## Project Structure

```
src/
├── test/
│   ├── setup.ts           # Test environment setup
│   ├── components/        # Component tests
│   │   ├── Button.test.tsx
│   │   └── ErrorBoundary.test.tsx
│   └── pages/             # Page tests
│       └── Dashboard.test.tsx
cypress/
├── e2e/                   # E2E test specs
│   ├── auth.cy.ts
│   ├── navigation.cy.ts
│   └── tasks.cy.ts
├── support/
│   ├── commands.ts        # Custom Cypress commands
│   └── e2e.ts            # E2E support file
└── cypress.config.ts      # Cypress configuration
```

## Running Tests

### Unit & Integration Tests

```bash
# Run all tests
npx vitest run

# Run tests in watch mode
npx vitest

# Run tests with UI
npx vitest --ui

# Generate coverage report
npx vitest run --coverage
```

### End-to-End Tests

```bash
# Open Cypress interactive mode
npx cypress open

# Run Cypress in headless mode
npx cypress run
```

### Run All Tests

```bash
# Run unit tests then E2E tests
npx vitest run && npx cypress run
```

## Writing Tests

### Unit Tests

Example component test:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

Example page test:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard Page', () => {
  it('renders dashboard header', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('My Tasks')).toBeInTheDocument();
    });
  });
});
```

### E2E Tests

Example Cypress test:

```typescript
describe('Task Management', () => {
  it('creates a new task', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="add-task-button"]').click();
    cy.get('[data-testid="task-title-input"]').type('Test Task');
    cy.get('[data-testid="create-task-button"]').click();
    cy.contains('Test Task').should('be.visible');
  });
});
```

## Best Practices

### 1. Use Test IDs

Always add `data-testid` attributes for reliable element selection:

```tsx
<button data-testid="submit-button">Submit</button>
```

### 2. Mock External Dependencies

Mock API calls and external services:

```typescript
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => Promise.resolve({ data: [], error: null })),
    })),
  },
}));
```

### 3. Test User Behavior

Focus on testing how users interact with your app:

```typescript
// ❌ Don't test implementation details
expect(component.state.isOpen).toBe(true);

// ✅ Test user-visible behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

### 4. Arrange-Act-Assert Pattern

Structure tests clearly:

```typescript
it('displays error message on failed login', async () => {
  // Arrange
  render(<LoginForm />);
  
  // Act
  fireEvent.click(screen.getByText('Login'));
  
  // Assert
  await waitFor(() => {
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
```

## Coverage Thresholds

The project maintains minimum coverage thresholds:

- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

Coverage reports are generated in the `coverage/` directory.

## Debugging Tests

### Vitest

```bash
# Debug specific test file
npm run test:unit -- src/test/components/Button.test.tsx

# Debug with UI
npm run test:ui
```

### Cypress

```bash
# Open interactive mode for debugging
npm run test:e2e

# Run specific test file
npx cypress run --spec "cypress/e2e/auth.cy.ts"
```

## Continuous Integration

For CI/CD pipelines, use:

```bash
# Run all tests in CI mode
npm run test:coverage && npm run test:e2e:headless
```

## Error Boundaries

The app includes error boundaries to catch and handle errors gracefully:

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

Test error boundaries:

```typescript
const ThrowError = () => {
  throw new Error('Test error');
};

it('renders error UI when there is an error', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

## Performance Testing

Monitor test performance:

```bash
# Run with performance reporting
npm run test:unit -- --reporter=verbose
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout in `vitest.config.ts`
2. **Flaky E2E tests**: Add explicit waits in Cypress
3. **Mock not working**: Check import paths and mock order
4. **Coverage not updating**: Clear coverage cache: `rm -rf coverage/`

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain coverage above 70%
4. Update this documentation if needed
