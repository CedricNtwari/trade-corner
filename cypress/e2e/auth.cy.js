describe('Authentication Flow', () => {
  it('should allow a user to sign up', () => {
    cy.visit('/signup')
    cy.get('input[name="username"]').type('newuser')
    cy.get('input[name="password1"]').type('Password123')
    cy.get('input[name="password2"]').type('Password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
  })

  it('should allow a user to log in', () => {
    cy.visit('/signin')
    cy.get('input[name="username"]').type('newuser')
    cy.get('input[name="password"]').type('Password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
  })

  it('should show an error for invalid login', () => {
    cy.visit('/signin')
    cy.get('input[name="username"]').type('wronguser')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Unable to log in with provided credentials')
  })
})

describe('Login Error Handling', () => {
  it('should display an error message for invalid login credentials', () => {
    cy.visit('/signin')
    cy.get('input[name="username"]').type('invaliduser')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Unable to log in with provided credentials.').should('be.visible')
  })
})

describe('Signup Error Handling', () => {
  it('should display an error for password and confirm password mismatch', () => {
    cy.visit('/signup')
    cy.get('input[name="username"]').type('newuser')
    cy.get('input[name="password1"]').type('Password123')
    cy.get('input[name="password2"]').type('Password456')
    cy.get('button[type="submit"]').click()
    cy.contains('This password is too common.').should('be.visible')
  })
})
