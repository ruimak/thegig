describe('my first test', () => {
    it('does not do much',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.url()                   // 8.
      .should('include', 'artist/Foals/albums')
    })
})