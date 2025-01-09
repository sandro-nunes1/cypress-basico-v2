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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('initialVisit', () => {
    cy.visit('src/index.html') 
})

Cypress.Commands.add('fillMandatoryFieldsAdd', (firstName, secundName, email, texto) => {
  
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(secundName)
    cy.get('#open-text-area').type(texto, {delay: 0})
    cy.get('#email').type(email)
})


Cypress.Commands.add('fillMandatoryFieldsAddObject', (data) => {
  
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.secundName)
    cy.get('#open-text-area').type(data.texto, {delay: 0})
    cy.get('#email').type(data.email)
})

Cypress.Commands.add('clickSubmitResult', (Result) => {
    cy.get('button[type="submit"]').click()
    cy.get(Result).should('be.visible')
})