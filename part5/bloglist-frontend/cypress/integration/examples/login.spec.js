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

    describe('When logged in', function() {
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

      describe('Blog', function() {
        beforeEach(function() {
          cy.addBlog({title: 'Test blog', 
          author: 'Example Author', 
          url: 'http://example.com/test-blog' })
        })

        it('A blog can be liked', function() {
          cy.get('.main-content')
            .as('main-content')
            .contains('view')
            .click()

          cy.get('.detail-content')
            .contains('likes 0')
            .contains('like')
            .click()
            .parent()
            .contains('likes 1')
            .contains('like')
            .click()
            .parent()
            .contains('likes 2')
            .parent()
            // Note that remove can be seen for this user
            .contains('remove')
        })

        describe('Deleting', function() {
          beforeEach(function() {
            cy.createUser({name: 'Sabina Koirala', 
            username: 'sbnkrl', 
            password: 'SekretSabina'})
            cy.login({username: 'sbnkrl', password: 'SekretSabina'})
            cy.addBlog({'title': 'Sabina\'s blog', author: 'Test author 2', url: 'http://example.com/sabina/blog'})
          })

          it('does not show remove button for other user blog', function() {
            // Blog created by other user
            cy.get('.main-content')
              .contains('Test blog Example Author')
              .parent()
              .as('main-content')
              
            cy.get('@main-content')
              .contains('view')
              .click()

            // Does not have remove button
            cy.get('@main-content')
              .contains('remove')
              .should('not.exist')
          })
          
          it('show remove button for own blog and is possible to delete', function() {
            cy.get('.main-content')
              .contains('Sabina\'s blog Test author 2')
              .parent()
              .as('main-content')

            cy.get('@main-content')
              .contains('view')
              .click()

            cy.get('@main-content')
              .contains('remove')
              .click()
            
            cy.get('.success').contains('Blog \`Sabina\'s blog\` removed')
            cy.get('.main-content')
              .contains('Sabina\'s blog Test author 2')
              .should('not.exist')
          })
        })
      })

      describe('blog ordering', function() {
        beforeEach(function() {
          cy.login({ username: 'k6sandeep', password: 'TestSekret1' })
          cy.addBlog({'title': 'Blog with 10 likes', author: 'Test author', url: 'http://localhost.com', likes: 10})
          cy.addBlog({'title': 'Blog with 3 likes', author: 'Test author', url: 'http://localhost.com', likes: 3})
          cy.addBlog({'title': 'Blog with 12 likes', author: 'Test author', url: 'http://localhost.com', likes: 12})
          cy.addBlog({'title': 'Blog with 5 likes', author: 'Test author', url: 'http://localhost.com', likes: 5})
          cy.addBlog({'title': 'Blog with 4 likes', author: 'Test author', url: 'http://localhost.com', likes: 4})
          cy.addBlog({'title': 'Blog with 0 likes', author: 'Test author', url: 'http://localhost.com'})
        })

        it('should order blogs', function() {
          // Notice that the likes are ordered with child indexes
          // ie. at 1 => 12 likes, at 2 => 10 likes and so on
          cy.get('div:nth-child(3) > div:nth-child(1)')
            .contains('Blog with 12 likes')
          cy.get('div:nth-child(3) > div:nth-child(2)')
            .contains('Blog with 10 likes')
          cy.get('div:nth-child(3) > div:nth-child(3)')
            .contains('Blog with 5 likes')
          cy.get('div:nth-child(3) > div:nth-child(4)')
            .contains('Blog with 4 likes')
          cy.get('div:nth-child(3) > div:nth-child(5)')
            .contains('Blog with 3 likes')
          cy.get('div:nth-child(3) > div:nth-child(6)')
            .contains('Blog with 0 likes')
        })
      })
    })
  })
})