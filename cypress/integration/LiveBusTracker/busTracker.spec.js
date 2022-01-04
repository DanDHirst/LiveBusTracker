describe('Bus Management', () => {
    before(() => {
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(1).click()


    })
    beforeEach(() => {
        cy.visit('https://live-bus-tracker.herokuapp.com/')
    })
    after(() => {
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(1).click()
        cy.get('form > button').click()
        cy.visit('https://live-bus-tracker.herokuapp.com/')
    })
    it('check refresh map works', () => {
        cy.get('[onclick="socketRequest()"]').click()
    })
    it('check socket alerts when bus is due on stop selected', () => {
        cy.get('#locations').select('Railway Station')
        cy.get('[onclick="socketRequest()"]').click()
        cy.get('#locations').should('have.value', 'Railway Station')
        cy.get('.modal-body > p').should("have.text","Your Bus Stop Is Next!")
        cy.get("#myModal").should("be.visible")

    })
    it('check bus can switch locations', () => {
        cy.visit('https://live-bus-tracker.herokuapp.com/bussim')
        cy.get('button').eq(2).click()
        cy.get('form > button').click()
        cy.visit('https://live-bus-tracker.herokuapp.com/')
        cy.get('#locations').select("Western Approach Flats")
        cy.get('[onclick="socketRequest()"]').click()
        cy.get('#locations').should('have.value', 'Western Approach Flats')
        cy.get('.modal-body > p').should("have.text","Your Bus Stop Is Next!")
        cy.get("#myModal").should("be.visible")

    })
})