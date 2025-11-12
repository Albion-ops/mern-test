/// <reference types="cypress" />

// Custom command to login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth');
  cy.get('[data-testid="signin-email"]').type(email);
  cy.get('[data-testid="signin-password"]').type(password);
  cy.get('[data-testid="signin-button"]').click();
});

export {};
