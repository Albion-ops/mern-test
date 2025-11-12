# Debugging Guide

## Overview

This guide covers debugging tools, techniques, and best practices for the TaskFlow application.

## Debugging Tools

### 1. Browser DevTools

#### Console Logging

Strategic console logging is implemented throughout the app:

```typescript
// Error logging
console.error('Failed to fetch tasks:', error);

// Debug logging (development only)
if (import.meta.env.DEV) {
  console.log('User state updated:', user);
}
```

#### Network Tab

Monitor API requests:
- Check request/response in Network tab
- Look for failed requests (red)
- Inspect headers and payloads

#### React DevTools

Install [React Developer Tools](https://react.dev/learn/react-developer-tools):
- Inspect component tree
- View props and state
- Track re-renders

### 2. Error Boundaries

The app uses error boundaries to catch runtime errors:

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

When an error occurs:
- User sees friendly error message
- Error details logged to console
- Option to reset and return home

### 3. TypeScript

Type checking helps catch errors early:

```bash
# Run type checking
npx tsc --noEmit
```

### 4. Vitest Debugging

Debug unit tests:

```bash
# Debug specific test
npm run test:unit -- --reporter=verbose Button.test.tsx

# Run with UI
npm run test:ui
```

### 5. Cypress Debugging

Debug E2E tests:

```bash
# Interactive mode
npm run test:e2e

# With Chrome DevTools
npx cypress open --browser chrome
```

Cypress debugging features:
- Time travel through test steps
- Screenshot on failure
- Video recording
- Network stubbing

## Common Issues & Solutions

### Authentication Issues

**Problem**: User can't log in

**Debug steps**:
1. Check browser console for errors
2. Verify email/password are correct
3. Check Network tab for auth API calls
4. Verify Lovable Cloud is enabled
5. Check RLS policies in database

```typescript
// Add debug logging
const signIn = async (email: string, password: string) => {
  console.log('Attempting sign in for:', email);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error('Sign in error:', error);
};
```

### Data Not Loading

**Problem**: Tasks not appearing in dashboard

**Debug steps**:
1. Check browser console for errors
2. Verify user is authenticated
3. Check Network tab for database queries
4. Verify RLS policies allow access
5. Check if data exists in database

```typescript
// Add debug logging
const fetchTasks = async () => {
  console.log('Fetching tasks for user:', user?.id);
  const { data, error } = await supabase
    .from('tasks')
    .select('*');
  
  console.log('Tasks response:', { data, error });
};
```

### CORS Errors

**Problem**: CORS policy blocking requests

**Solution**: Lovable Cloud handles CORS automatically. If you see CORS errors:
1. Verify you're using the correct Supabase client
2. Check that you're not making direct fetch calls
3. Ensure edge functions include CORS headers

### Build Errors

**Problem**: Build fails

**Debug steps**:
1. Check terminal for error messages
2. Run `npm install` to ensure dependencies are up to date
3. Clear cache: `rm -rf node_modules .vite && npm install`
4. Check for TypeScript errors: `npx tsc --noEmit`

### Test Failures

**Problem**: Tests failing unexpectedly

**Debug steps**:
1. Run tests individually: `npm run test:unit -- Button.test.tsx`
2. Check if mocks are properly configured
3. Verify test data and assertions
4. Look for timing issues (add `waitFor` if needed)

## Performance Debugging

### React Profiler

Use React DevTools Profiler:
1. Open React DevTools
2. Go to Profiler tab
3. Start recording
4. Interact with app
5. Stop recording
6. Analyze render times

### Performance Monitoring

Add performance markers:

```typescript
performance.mark('fetch-tasks-start');
await fetchTasks();
performance.mark('fetch-tasks-end');
performance.measure('fetch-tasks', 'fetch-tasks-start', 'fetch-tasks-end');
```

View in DevTools Performance tab.

## Database Debugging

### Check RLS Policies

View current policies in Lovable Cloud:
1. Open Cloud tab
2. Navigate to Database → Tables
3. Select table
4. View policies

### Query Debugging

Add `.explain()` to debug queries:

```typescript
const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .explain({ analyze: true });
```

### Check User Context

Verify authenticated user ID:

```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user?.id);
```

## Environment Variables

Debug environment variable issues:

```typescript
// Check if variables are loaded
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Env mode:', import.meta.env.MODE);
```

Note: `.env` file is auto-generated and managed by Lovable Cloud.

## Source Maps

Source maps are enabled in development for easier debugging:
- Set breakpoints in original TypeScript files
- Step through code in DevTools
- View original stack traces

## Debugging Checklist

Before reporting an issue:

- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Verify user authentication state
- [ ] Check database RLS policies
- [ ] Run tests to isolate issue
- [ ] Try in incognito/private browsing
- [ ] Clear browser cache
- [ ] Check if issue is reproducible

## Error Tracking

### Development

Errors are logged to console with full stack traces.

### Production

Consider adding error tracking service:
- Sentry
- LogRocket
- Rollbar

## Useful Commands

```bash
# Type checking
npx tsc --noEmit

# Lint checking
npm run lint

# Run all tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Clear all caches
rm -rf node_modules .vite coverage dist
npm install
```

## Getting Help

If you're stuck:

1. Check error message carefully
2. Search error in this documentation
3. Review test files for examples
4. Check browser DevTools
5. Review Lovable Cloud logs (Cloud tab)

## Best Practices

1. **Use descriptive error messages**
   ```typescript
   // ❌ Bad
   throw new Error('Error');
   
   // ✅ Good
   throw new Error('Failed to create task: title is required');
   ```

2. **Add context to logs**
   ```typescript
   // ❌ Bad
   console.log(error);
   
   // ✅ Good
   console.error('Failed to fetch tasks for user:', user?.id, error);
   ```

3. **Use error boundaries**
   ```typescript
   // Wrap components that might fail
   <ErrorBoundary>
     <SuspiciousComponent />
   </ErrorBoundary>
   ```

4. **Handle async errors**
   ```typescript
   try {
     await fetchData();
   } catch (error) {
     console.error('Data fetch failed:', error);
     toast.error('Failed to load data');
   }
   ```

## Additional Resources

- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)
- [React Debugging](https://react.dev/learn/debugging)
- [Cypress Debugging](https://docs.cypress.io/guides/guides/debugging)
- [Vitest Debugging](https://vitest.dev/guide/debugging.html)
