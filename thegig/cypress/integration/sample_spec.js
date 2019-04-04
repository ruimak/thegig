
describe('discography tests', () => {
    it('',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.url()                   // 8.
      .should('include', 'artist/Foals/albums')
      
    })
    it('clicks more albums button click an album then vists the url',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        
        cy.contains('show more').click()
        
        cy.contains('Part 1').click({ force: true })               // 8.
      cy.url().should('include', 'Foals/albums/Part%201%20Everything%20Not%20Saved%20Will%20Be%20Lost')
      
    }) 
    it('clicks top song then vists the url',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.contains('Cassius').click({ force: true })
        cy.url().should('include', 'Foals/song/Cassius')
    })
    it('five songs render in top songs',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.get('[data-cy="Paper"]').should('have.length', 5)
        
    })
    it('first item of rest of items renders number 7',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.contains('show more').click()
        cy.get('[data-cy="Card"]').should('have.length', 5)
        
    })
})

describe('my band test',() => {
    it('click on band and goes to news',() => {
        cy.visit('http://localhost:3000/myBands')
        cy.wait(6000);
        cy.get('[data-cy="MybandLink"]').eq(1).click()
        cy.url().should('include', '/news')

    })
    // it.only('click on band and goes to news',() => {
    //     const bands = 'Foals'
        
        
    //     cy.visit('http://localhost:3000/myBands')
    //     cy.wait(6000);
    //     cy.get('[data-cy="MybandRemove"]').eq(1).click()
    //     cy.contains('Progress').should('not.exist')

    // })
    
    
})

describe.only('Top of charts',() => {
it('clicks and render the rnb chart and checks theres 50 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(1).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 50)

})
it('clicks and render the hot100 chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    // cy.wait(6000);
    // cy.get('[data-cy="chartsbutton"]').eq().click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 100)

})
it('clicks and render the top uk chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    // cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(2).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 20)

})
it('clicks and render the top rock chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    // cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(3).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 50)

})
it('clicks and render the top pop chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    // cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(4).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 40)

})
it.only('clicks on artist name then redirects them to the right url', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartArtist"]').eq(1).click({ force: true })
    cy.url().should('include', '/artist')
    

})
it.only('clicks on artist name then redirects them to the right url', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartTrack"]').eq(1).click({ force: true })
    cy.url().should('include', '/song')
    

})
})





