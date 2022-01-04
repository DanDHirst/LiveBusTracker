describe('Bus Management', () => {
    before(() => {
        // set up application so first stop is setup for test
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(1).click()
        cy.get('form > button').click()
    })
    beforeEach(() => {
        //navigate to bus tracker page
        cy.visit('https://live-bus-tracker.herokuapp.com/')
    })
    after(() => {
        //clean up to select bus
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(1).click()
        cy.get('form > button').click()
        cy.visit('https://live-bus-tracker.herokuapp.com/')
    })
    it('check refresh map works', () => {
        //check bus button refreshes the map
        cy.get('[onclick="socketRequest()"]').click()
    })
    it('check socket alerts when bus is due on stop selected', () => {
        //select location and click refresh
        cy.get('#locations').select('Railway Station')
        cy.get('[onclick="socketRequest()"]').click()
        cy.get('#locations').should('have.value', 'Railway Station')
        //check the popup is displayed
        cy.get('.modal-body > p').should("have.text","Your Bus Stop Is Next!")
        cy.get("#myModal").should("be.visible")

    })
    it('check bus can switch locations', () => {
        //change the location of the bus
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(2).click()
        cy.get('form > button').click()
        cy.visit('https://live-bus-tracker.herokuapp.com/')
        //select location and click refresh
        cy.get('#locations').select("Western Approach Flats")
        cy.get('[onclick="socketRequest()"]').click()
        cy.get('#locations').should('have.value', 'Western Approach Flats')
        //check the popup is displayed
        cy.get('.modal-body > p').should("have.text","Your Bus Stop Is Next!")
        cy.get("#myModal").should("be.visible")

    })
})