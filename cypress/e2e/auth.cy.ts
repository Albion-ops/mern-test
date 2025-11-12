describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('displays auth page correctly', () => {
    cy.contains('TaskFlow').should('be.visible');
    cy.contains('Manage your tasks efficiently').should('be.visible');
    cy.get('[data-testid="signin-email"]').should('be.visible');
    cy.get('[data-testid="signin-password"]').should('be.visible');
  });

  it('switches between sign in and sign up tabs', () => {
    cy.contains('Sign Up').click();
    cy.get('[data-testid="signup-name"]').should('be.visible');
    cy.get('[data-testid="signup-email"]').should('be.visible');
    cy.get('[data-testid="signup-password"]').should('be.visible');

    cy.contains('Sign In').click();
    cy.get('[data-testid="signin-email"]').should('be.visible');
    cy.get('[data-testid="signin-password"]').should('be.visible');
  });

  it('validates required fields on sign in', () => {
    cy.get('[data-testid="signin-button"]').click();
    cy.get('[data-testid="signin-email"]:invalid').should('exist');
  });

  it('validates required fields on sign up', () => {
    cy.contains('Sign Up').click();
    cy.get('[data-testid="signup-button"]').click();
    cy.get('[data-testid="signup-name"]:invalid').should('exist');
  });
});
