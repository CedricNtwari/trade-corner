describe('Navigation Menu', () => {
  it('should display the menu when clicking the menu button', () => {
    cy.visit('/')
    cy.get('[data-testid="menu-button"]').click()
    cy.get('[data-testid="dropdown-menu"]').should('be.visible')
  })

  it('should hide navigation links for the /profile route when not logged in', () => {
    cy.visit('/profile')
    cy.get('[data-testid="menu-button"]').click()
    cy.get('[data-testid="desktop-profile"]').should('not.exist')
  })

  it('should show navigation links for logged-in users', () => {
    cy.login('newuser', '871547@cece')
    cy.get('[data-testid="menu-button"]').click()
    cy.get('[data-testid="desktop-profile"]').should('exist')
  })
})
