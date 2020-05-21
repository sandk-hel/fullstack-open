describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen'})
      // cy.request('POST', 'http://localhost:3001/api/login', {
      //   username: 'mluukkai', password: 'salainen'
      // }).then(response => {
      //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000')
      // })
      // cy.contains('login').click()
      // cy.get('#username').type('mluukkai')
      // cy.get('#password').type('salainen')
      // cy.get('#login-button').click()
    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
        /*2
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important')
          */
          /* 1
        cy.contains('second note')
          .contains('make important')
          .click()
        
        cy.contains('second note')
          .contains('make not important')
          */
      })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
        // cy.contains('new note').click()
        // cy.get('input').type('another note cypress')
        // cy.contains('save').click()
      })

      it('it can be made important', function() {
        cy.contains('another note cypress')
        .parent()
        .find('button')
        .click()
        cy.contains('another note cypress')
          .parent()
          .find('button')
          .contains('make not important')
      })
    })

  })
})