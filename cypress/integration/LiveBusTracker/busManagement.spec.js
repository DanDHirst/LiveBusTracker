describe('Bus Management', () => {
    beforeEach(() => {
        //before each test navigate to the bus managemnt page
        cy.visit('https://live-bus-tracker.herokuapp.com/busmanagement')
    })
    it('addBus to bus page', () => {
        //form input and submition
        cy.get('#nextStop').clear().type("Pilgrims Mews")
        cy.get('#Lat').clear().type("50.378278")
        cy.get('#Lng').clear().type("-4.148529")
        cy.get('#busID').clear().type("1000")
        cy.get('body > :nth-child(6) > button').click()

        //check data matches input
        cy.get('tr').last().find('#tableBusNo').last().should('have.text','1000')
        cy.get('tr').last().find('#tableNextStop').last().should('have.text','Pilgrims Mews')
        cy.get('tr').last().find('#tableLat').last().should('have.text','50.378278')
        cy.get('tr').last().find('#tableLng').last().should('have.text','-4.148529')

    })
    it('edit bus on the page', () => {
        cy.get('tr').last().find('#editBus').last().click()
        //form input and submition
        cy.get('#nextStop').clear().type("Pilgrims")
        cy.get('#Lat').clear().type("50.378277")
        cy.get('#Lng').clear().type("-4.148528")
        cy.get('#busNo').clear().type("1001")
        cy.get('button').click()

        //check data matches input
        cy.get('tr').last().find('#tableBusNo').last().should('have.text','1001')
        cy.get('tr').last().find('#tableNextStop').last().should('have.text','Pilgrims')
        cy.get('tr').last().find('#tableLat').last().should('have.text','50.378277')
        cy.get('tr').last().find('#tableLng').last().should('have.text','-4.148528')
    })

    it('remove bus on the page', () => {
        //remove bus
        cy.get('table').find('#delete').last().click()
    })
    



})