describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:5173')
    const reqBody = {
      username: "rohitxd",
      name: "rohit",
      password: "qwerty"
    }
    cy.request('POST', 'http://localhost:3000/api/users', reqBody)

  })

  it('Login form is shown', function () {
    cy.contains('Log In to Application')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('rohitxd')
      cy.get('input:last').type('qwerty')
      cy.contains('Login').click()
      cy.contains('Login Successful')

    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('invaliduser')
      cy.get('input:last').type('somepassword')
      cy.contains('Login').click()
      cy.contains('invalid username and password.')
    })
  })

})