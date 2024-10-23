describe('Profile and Order Management', () => {
  beforeEach(() => {
    cy.visit('/signin')
    cy.get('input[name="username"]').type('newuser')
    cy.get('input[name="password"]').type('871547@cece')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
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
    cy.get('.p-4 ProfilePage_ProductsSection__2I6z7').should('be.visible')
    cy.get('.OrderPage_OrderCard__20-4i').should('have.length.greaterThan', 0)
    cy.get('.OrderPage_OrderCard__20-4i').first().click()
    cy.url().should('include', '/order-details')
  })
})
