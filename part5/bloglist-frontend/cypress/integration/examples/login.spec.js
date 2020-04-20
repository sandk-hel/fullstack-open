describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button').contains('login')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.createUser({name: 'Sandeep Koirala', 
                  username: 'k6sandeep', 
                  password: 'TestSekret1'})
    })

    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('k6sandeep')
      cy.get('input#password').type('TestSekret1')
      cy.get('button#login').click()

      cy.get('input#username').should('not.exist')
      cy.get('input#password').should('not.exist')
      cy.get('button#login').should('not.exist')

      cy.contains('blogs')
      cy.contains('logout')
      cy.contains('Sandeep Koirala logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('k6sandeep')
      cy.get('input#password').type('TestSekret')
      cy.get('button#login').click()

      cy.get('.error').contains('wrong username or password')
      cy.contains('Sandeep Koirala logged in').should('not.exist')
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'k6sandeep', password: 'TestSekret1' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('input#title').type('Test blog title')
        cy.get('input#author').type('Example Test Author')
        cy.get('input#url').type('http://example.com/test-blog/url')
        cy.get('form').submit()
        
        cy.get('.success').contains('a new blog `Test blog title` by Example Test Author added')
        cy.get('.main-content').contains('Test blog title Example Test Author')
      })
    })
  })
})