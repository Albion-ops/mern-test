describe('Navigation', () => {
  it('loads the home page', () => {
    cy.visit('/');
    cy.contains('TaskFlow').should('be.visible');
    cy.contains('The modern task management solution').should('be.visible');
  });

  it('navigates to auth page from home', () => {
    cy.visit('/');
    cy.contains('Get Started').click();
    cy.url().should('include', '/auth');
    cy.contains('Sign In').should('be.visible');
  });

  it('displays 404 page for invalid routes', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('Oops! Page not found').should('be.visible');
  });

  it('has working return to home link on 404 page', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false });
    cy.contains('Return to Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
