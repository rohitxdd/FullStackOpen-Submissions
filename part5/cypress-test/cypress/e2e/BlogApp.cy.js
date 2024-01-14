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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('rohitxd')
      cy.get('input:last').type('qwerty')
      cy.contains('Login').click()
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('[data-testid="input-title"]').type("cypress title")
      cy.get('[data-testid="input-author"]').type("cypress author")
      cy.get('[data-testid="input-url"]').type("cypress.com")
      cy.get('[data-testid="button-submit"]').click()
      cy.contains('A new Blog cypress title added')
      cy.get('[data-testid="blog-title"]').contains('cypress title')

      it('User can like a blog', function () {
        cy.get('[data-testid="toggleButton"]').click()
      })

    })

    describe('After Blog Created', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('[data-testid="input-title"]').type("cypress title")
        cy.get('[data-testid="input-author"]').type("cypress author")
        cy.get('[data-testid="input-url"]').type("cypress.com")
        cy.get('[data-testid="button-submit"]').click()
      })

      it('User can like a blog', function () {
        cy.get('[data-testid="toggleButton"]').click()
        cy.get('[data-testid="button-like"]').click()
        cy.get('[data-testid="blog-likes"]').contains('Likes 1')
      })

      it("User can delete blog", function () {
        cy.get('[data-testid="toggleButton"]').click()
        cy.window().then((win) => {
          cy.stub(win, 'confirm').returns(true);
        });
        cy.contains('Remove').click()
        cy.contains('No Blogs to Show')
      })
    })

    describe('For other user', function () {
      beforeEach(function () {
        cy.contains('New Blog').click()
        cy.get('[data-testid="input-title"]').type("cypress title")
        cy.get('[data-testid="input-author"]').type("cypress author")
        cy.get('[data-testid="input-url"]').type("cypress.com")
        cy.get('[data-testid="button-submit"]').click()
        cy.contains('Logout').click()
        const reqBody = {
          username: "notrohitxd",
          name: "rohit",
          password: "qwerty"
        }
        cy.request('POST', 'http://localhost:3000/api/users', reqBody)
        cy.get('input:first').type('notrohitxd')
        cy.get('input:last').type('qwerty')
        cy.contains('Login').click()
      })

      it('only the creator can see the delete button', function () {
        cy.get('[data-testid="toggleButton"]').click()
        cy.get('[data-testid="blog-remove"]').should('not.exist');
      })

      it('blogs are ordered according to likes', function () {
        cy.contains('New Blog').click()
        cy.get('[data-testid="input-title"]').type("Second Blog")
        cy.get('[data-testid="input-author"]').type("cypress author")
        cy.get('[data-testid="input-url"]').type("cypress.com")
        cy.get('[data-testid="button-submit"]').click()

        cy.get('.blogs').eq(0).get('[data-testid="toggleButton"]').eq(0).click()
        cy.get('[data-testid="button-like"]').click()
        cy.contains('Hide').click()
        cy.get('[data-testid="toggleButton"]').eq(1).click()
        cy.get('[data-testid="button-like"]').click()
        cy.get('[data-testid="button-like"]').click()
        cy.get('.blogs').eq(0).should('contain', 'Second Blog')
      })

    })

  })

})