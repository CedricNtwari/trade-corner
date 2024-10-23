describe('Product Listing and Details', () => {
  it('should display products on the marketplace', () => {
    cy.visit('/products')
    cy.get('[data-testid^="product-card-"]').should('have.length.greaterThan', 0)
  })

  it('should filter products based on category', () => {
    cy.visit('/products')
    cy.get('[data-testid="filter-men"]').click()
    cy.get('[data-testid^="product-card"]').each(($card) => {
      cy.wrap($card)
        .find('.ProductsPage_ProductCategory__3S-nH')
        .then(($category) => {
          cy.log($category.text())
          cy.wrap($category).should('contain', 'MEN')
        })
    })
  })

  it('should show product details when clicking on a product', () => {
    cy.visit('/products')
    cy.get('[data-testid^="product-card-"]').first().click()
    cy.url().should('include', '/products/')
    cy.get('[data-testid="product-name"]').should('be.visible')
    cy.get('[data-testid="product-description"]').should('be.visible')
  })
})
