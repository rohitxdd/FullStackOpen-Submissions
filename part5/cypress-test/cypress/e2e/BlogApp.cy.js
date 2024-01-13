describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log In to Application')
  })
})