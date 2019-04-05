
describe('discography tests', () => {
    it('',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.wait(9000);
        cy.url()                   // 8.
      .should('include', 'artist/Foals/albums')
      
    })
    it('clicks more albums button click an album then vists the url',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.wait(9000);
        cy.contains('show more').click()
        
        cy.contains('Part 1').click({ force: true })               // 8.
      cy.url().should('include', 'Foals/albums/Part%201%20Everything%20Not%20Saved%20Will%20Be%20Lost')
      
    }) 
    it('clicks top song then vists the url',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.wait(9000);
        cy.contains('Cassius').click({ force: true })
        cy.url().should('include', 'Foals/song/Cassius')
    })
    it('five songs render in top songs',() => {
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.wait(9000);
        cy.get('[data-cy="Paper"]').should('have.length', 5)
        
    })
    it('first item of rest of items renders number 7',() => {
        
        cy.visit('http://localhost:3000/artist/Foals/albums/')
        cy.wait(9000);
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

describe('Top of charts',() => {
it('clicks and render the rnb chart and checks theres 50 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(1).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 50)

})
it('clicks and render the hot100 chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    // cy.get('[data-cy="chartsbutton"]').eq().click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 100)

})
it('clicks and render the top uk chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(2).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 20)

})
it('clicks and render the top rock chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(3).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 50)

})
it('clicks and render the top pop chart and checks theres 100 songs', () => {
    cy.visit('http://localhost:3000/topCharts')
    // cy.wait(6000);
    cy.get('[data-cy="chartsbutton"]').eq(4).click()
    cy.get('[data-cy="chartssongs"]').should('have.length', 40)

})
it('clicks on artist name then redirects them to the right url', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartArtist"]').eq(1).click({ force: true })
    cy.url().should('include', '/artist')
    

})
it('clicks on artist name then redirects them to the right url', () => {
    cy.visit('http://localhost:3000/topCharts')
    cy.wait(6000);
    cy.get('[data-cy="chartTrack"]').eq(1).click({ force: true })
    cy.url().should('include', '/song')
    

})
})

describe('bandEvents',() => {
    it('', ()=> {
        let url = 'https://concerts1.livenation.com/event/'
        cy.visit('http://localhost:3000/artist/Foals/events/')
        cy.wait(6000);
        cy.get('[data-cy="eventPicture"]').eq(0).click()
        cy.url().should('include', 'livenation.com/event/')

    })
    it('', ()=> {
        
        cy.visit('http://localhost:3000/artist/Foals/events/')
        cy.wait(6000);
        cy.get('[data-cy="eventArtist"]').contains('Foals')
           
        })

    
})


describe('testing searchbar',() => {
    it('types out foals in searchbar,click foals, then checks the right url',() => {
 cy.visit('http://localhost:3000/')
    cy.wait(7000);
    cy.get('.searchAndNav').children().eq(0).children().eq(0)
    .children().eq(0).children().eq(0).children().type('foals')
    cy.wait(7000)
    cy.contains('Foals').click()
    cy.url().should('include', 'artist/Foals/news/')


    })
    it('types out foals in searchbar,cheaks for band suggestions and song suggestions',() => {
        cy.visit('http://localhost:3000/')
           cy.wait(7000);
           cy.get('.searchAndNav').children().eq(0).children().eq(0)
           .children().eq(0).children().eq(0).children().type('foals')
           cy.wait(7000)
           cy.contains('Bands')
           cy.contains('Songs')
       
       
           })
           it('types out foals in searchbar,finds by foals,clicks and goes to right url',() => {
            cy.visit('http://localhost:3000/')
               cy.wait(7000);
               cy.get('.searchAndNav').children().eq(0).children().eq(0)
               .children().eq(0).children().eq(0).children().type('foals')
               cy.wait(7000)
               
               cy.contains('by Foals').click()
               cy.url().should('include', 'song/')
           
           
               })
            })




               describe.only('navbar tests',() => {
          it('test myband link',() => {
            cy.visit('http://localhost:3000/')
            cy.wait(7000);
            cy.contains('My Bands').click()
            cy.url().should('include', '/myBands')
          })
          it('test my Events link',() => {
            cy.visit('http://localhost:3000/')
            cy.wait(7000);
            cy.contains('My Events').click()
            cy.url().should('include', '/myEvents')
          })
          it('test Top charts link',() => {
            cy.visit('http://localhost:3000/')
            cy.wait(8000);
            cy.contains('Top Charts').click()
            cy.url().should('include', '/topCharts')
          })
          it('test Top charts link',() => {
            cy.visit('http://localhost:3000/')
            cy.wait(8000);
            cy.get('.app').children().eq(0).children()
            .eq(0).children().eq(0).children()
            .eq(2).children().eq(0).click()
            cy.url().should('include', '/settings')
          })
               })

               describe('tests for artist navbar',() => {
               
                   it('clicks on discography',() => {
                    cy.visit('http://localhost:3000/artist/Foals/news')
                    cy.wait(10000);
                    cy.contains('News').click()
                    cy.url().should('include', '/news')
                   })
                   it('clicks on discography',() => {
                    cy.visit('http://localhost:3000/artist/Foals/news')
                    cy.wait(10000);
                    cy.contains('Discography').click()
                    cy.url().should('include', '/albums')
                   })
                   it('clicks on discography',() => {
                    cy.visit('http://localhost:3000/artist/Foals/news')
                    cy.wait(10000);
                    cy.contains('Band Info').click()
                    cy.url().should('include', '/info')
                   })
                   it.only('clicks on events',() => {
                    cy.visit('http://localhost:3000/artist/Foals/news')
                    cy.wait(10000);
                    cy.contains(/^Events/).click()
                    cy.url().should('include', 'http://localhost:3000/artist/Foals/events/')
                   })
                   it.only('clicks on events',() => {
                    cy.visit('http://localhost:3000/artist/Foals/news')
                    cy.wait(10000);
                    cy.contains(/^Setlists/).click()
                    cy.url().should('include', 'setlists/')
                   })
               })





               describe.only('error testing', () =>{
                  it('',() => {
                    cy.visit('http://localhost:3000/band')
                    cy.wait(7000)
                    cy.contains('Whoops')


                  }) 
               })






