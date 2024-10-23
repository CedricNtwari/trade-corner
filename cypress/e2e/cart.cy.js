Cypress.Commands.add('login', (username, password) => {
  cy.visit('/signin')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/')
  cy.window().then((win) => {
    const token = win.localStorage.getItem('token')
    expect(token).to.exist
  })
})

describe('Profile and Order Management', () => {
  beforeEach(() => {
    cy.login('newuser', '871547@cece')
  })

  it('should allow a user to update their profile', () => {
    cy.visit('/profiles/4')
    cy.get('[data-testid="edit-details-button"]').click()
    cy.get('input[name="phone_number"]').clear().type('+41791234567')
    cy.get('button[type="submit"]').click()
    cy.contains('Profile updated successfully').should('be.visible')
    cy.contains('+41791234567').should('be.visible')
  })

  it('should display order history on the profile page', () => {
    cy.visit('/profiles/4')
    cy.get('[data-testid="order-history-section"]').should('be.visible')
    cy.get('.OrderPage_OrderCard__20-4i').should('have.length.greaterThan', 0)
    cy.get('.OrderPage_OrderCard__20-4i').first().click()
    cy.url().should('include', '/order-details')
  })
})
