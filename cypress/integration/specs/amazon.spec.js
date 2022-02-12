const amazonLocator = require('../../fixtures/selectors/amazonSelectors/amazonLocators.json');
const userData = require('../../fixtures/constants/amazonData.json');

context('@Amazon Login@', () => {
    beforeEach(() => {
        cy.visit('https://www.amazon.in')
    })

      it('Amazon login & logout', () => {
        cy.get(amazonLocator.signIn).click();
        cy.get(amazonLocator.emailField).first().type(userData.userName);
        cy.get(amazonLocator.continueBtn).click();
        cy.get(amazonLocator.passwordField).type(userData.password);
        cy.get(amazonLocator.continueBtn).click();
        cy.get(amazonLocator.accountInfo).first().trigger('mouseover');
        cy.get(amazonLocator.logoutBtn).click();
        cy.wait(3000)
      })

    it('Amazon Checkout', () => {
        cy.get(amazonLocator.signIn).click();
        cy.get(amazonLocator.emailField).first().type(userData.userName);
        cy.get(amazonLocator.continueBtn).click();
        cy.get(amazonLocator.passwordField).type(userData.password);
        cy.get(amazonLocator.continueBtn).first().click();
        cy.get(amazonLocator.searchTab).type("Macbook pro").type('{enter}');
        cy.xpath(amazonLocator.itemAmt).first().invoke('text').as("cartAmount");
        cy.get('@cartAmount').then(cartAmount => {cy.log(cartAmount)})
        cy.get(amazonLocator.itemLocator).first().invoke('removeAttr', 'target').click();
        cy.get(amazonLocator.buyNow).click();
        cy.xpath(amazonLocator.deliveryAddress).first().click();
        cy.get(amazonLocator.cvv).type('491',{force: true});
        cy.get(amazonLocator.paymentContinueBtn).last().click();
        cy.wait(7000)
        cy.url().should('include', 'https://www.amazon.in/gp/buy/')
        cy.get('@cartAmount').then(cartAmount => {
            cy.get(amazonLocator.cartAmt).invoke('text').then(finalAmt => {
                expect(finalAmt.replace(/\u00a0/g, '').replace(/\s/g, '')).to.include(cartAmount)
            })
        })
    })

})