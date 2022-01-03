describe('example to-do app', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('https://live-bus-tracker.herokuapp.com/busmanagement')
    })
    it('addBus to bus page', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('#nextStop').clear().type("Pilgrims Mews")
        cy.get('#Lat').clear().type("50.378278")
        cy.get('#Lng').clear().type("-4.148529")
        cy.get('#busID').clear().type("1000")
        cy.get('body > :nth-child(6) > button').click()
    })
    it('remove bus on the page', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('table').find('#delete').last().click()
    })



})