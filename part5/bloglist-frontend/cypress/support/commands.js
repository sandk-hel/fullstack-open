// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', ({ name, username, password  }) => {
  cy.request({
    url: '/api/users',
    method: 'POST',
    body: { name, username, password }
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    url: '/api/login',
    method: 'POST',
    body: { username, password }
  }).then(({ body }) => {
    localStorage.setItem('BlogListAppUserKey', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: '/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('BlogListAppUserKey')).token}`
    }
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('BlogListAppUserKey')
  cy.visit('http://localhost:3000')
})