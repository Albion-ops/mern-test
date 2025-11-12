describe('Task Management', () => {
  beforeEach(() => {
    // Note: In a real app, you'd use cy.login() with test credentials
    // For this demo, we'll test the UI components that should be visible
    cy.visit('/dashboard', { failOnStatusCode: false });
  });

  it('protects dashboard route when not authenticated', () => {
    // Should redirect to auth page
    cy.url().should('include', '/auth');
  });

  // These tests would run after authentication in a real scenario
  it.skip('displays the dashboard header', () => {
    cy.contains('TaskFlow').should('be.visible');
    cy.get('[data-testid="signout-button"]').should('be.visible');
  });

  it.skip('shows add task button', () => {
    cy.get('[data-testid="add-task-button"]').should('be.visible');
  });

  it.skip('opens create task form', () => {
    cy.get('[data-testid="add-task-button"]').click();
    cy.get('[data-testid="task-title-input"]').should('be.visible');
    cy.get('[data-testid="task-description-input"]').should('be.visible');
    cy.get('[data-testid="task-priority-select"]').should('be.visible');
  });

  it.skip('creates a new task', () => {
    cy.get('[data-testid="add-task-button"]').click();
    cy.get('[data-testid="task-title-input"]').type('Test Task');
    cy.get('[data-testid="task-description-input"]').type('This is a test task');
    cy.get('[data-testid="create-task-button"]').click();
    cy.contains('Test Task').should('be.visible');
  });
});
