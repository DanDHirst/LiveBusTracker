describe('Manage routes', () => {
    before(() => {
        //set up bus with know values
        cy.visit('https://live-bus-tracker.herokuapp.com/busmanagement')
        cy.get('#nextStop').clear().type("Pilgrims Mews")
        cy.get('#Lat').clear().type("50.378278")
        cy.get('#Lng').clear().type("-4.148529")
        cy.get('#busID').clear().type("1000")
        cy.get('body > :nth-child(6) > button').click()
        cy.reload()

    })
    after(() => {
        //delete all the data added
        cy.visit('https://live-bus-tracker.herokuapp.com/busmanagement')
        cy.get('table').find('#delete').last().click()
    })


    beforeEach(() => {
        //navigate to the correct bus
        cy.visit('https://live-bus-tracker.herokuapp.com/busmanagement')
        cy.get('tr').last().find('#manageRoute').last().click()

    })
    it('addRoute to bus', () => {
        //form input and sumbition
        cy.get('#nextStop').clear().type("Pilgrims Mews")
        cy.get('#Lat').clear().type("50.378278")
        cy.get('#Lng').clear().type("-4.148529")
        cy.get('#submitRoute').click()
        //refresh page
        cy.reload()
        //check data matches input
        cy.get("tr").last().find('#locName').should("have.text", "Pilgrims Mews")
        cy.get("tr").last().find('#lat').should("have.text", "50.378278")
        cy.get("tr").last().find('#lng').should("have.text", "-4.148529")
    })
    it('editroute to bus', () => {
        //click edit route button
        cy.get("tr").last().find("#editRoute").click()
        //form input and submition
        cy.get('#locName').clear().type("Pilgrims")
        cy.get('#lat').clear().type("50.378277")
        cy.get('#lng').clear().type("-4.148528")
        cy.get('#submitRoute').click()
        //refresh page
        cy.reload()
        //check data matches editted input
        cy.get("tr").last().find('#locName').should("have.text", "Pilgrims")
        cy.get("tr").last().find('#lat').should("have.text", "50.378277")
        cy.get("tr").last().find('#lng').should("have.text", "-4.148528")
    })
    it('Delete route from bus', () => {
        //delete and count number of routes
        cy.get("tr").last().find("#delete").click()
        cy.get('table').find('tr').should('have.length', 1)
    })
})
