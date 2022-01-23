const flipkartLocator = require('../../fixtures/selectors/flipkartSelectors/flipakartLogin.json');
const userData = require('../../fixtures/constants/flipkartData.json');
context('@FlipkartLogin@', () => {
  beforeEach(() => {
    cy.visit('https://www.flipkart.com')
  })

  it('Flipkart login & logout', () => {
    cy.get(flipkartLocator.loginBtn).click();
    cy.get(flipkartLocator.emailTextField).first().type(userData.userName);
    cy.get(flipkartLocator.passwordTextField).type(userData.password);
    cy.get(flipkartLocator.popUpLoginBtn).click();
    cy.wait(3000)
    cy.get(flipkartLocator.username).first().trigger('mouseover');
    cy.wait(3000)
    cy.xpath(flipkartLocator.logoutBtn).click();
    cy.wait(3000)
  })

  it('Flipkart Checkout', () => {
    cy.get(flipkartLocator.loginBtn).click();
    cy.get(flipkartLocator.emailTextField).first().type(userData.userName);
    cy.get(flipkartLocator.passwordTextField).type(userData.password);
    cy.get(flipkartLocator.popUpLoginBtn).click();
    cy.wait(3000)
    cy.get(flipkartLocator.searchTab).type("Macbook pro").type('{enter}');
    cy.get(flipkartLocator['item amount']).first().invoke('text').as("cartAmount")
    cy.get(flipkartLocator.itemLoactor).first().invoke('removeAttr', 'target').click();
    //cart amount click is not working in cypress
    cy.get(flipkartLocator.addCart).click();
    cy.wait(10000)
    cy.url().should('include', 'https://www.flipkart.com/viewcart?otracker=PP_GoToCart')
    cy.get('@cartAmount').then(cartAmount => {
      cy.get(flipkartLocator.finalAmount).invoke('text').then(finalAmt => {
        expect(finalAmt.replace(/\u00a0/g, '').replace(/\s/g, '')).eqls(cartAmount)
      })
    })
    cy.get(flipkartLocator.placeOrder).click()
  })

})