import '@4tw/cypress-drag-drop';

describe('service is available', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });

    it('should open and close ingredient modal window', function() {
      cy.visit('http://localhost:3000');
      cy.contains('Соберите бургер');
      cy.get("[data-testid = link]:first").click();
      cy.get("[data-testid = close] > svg").click();
      cy.contains('Соберите бургер');
    });

    it('should handle drag and drop and order', function () {
      cy.visit('http://localhost:3000');
      cy.contains('Соберите бургер');
      cy.get("[data-testid = link]:eq(0)").drag("[data-testid = dropEmptyBox]");
      cy.get("[data-testid = link]:eq(2)").drag("[data-testid = dropConstructor]");
      cy.get("[data-testid = link]:eq(4)").drag("[data-testid = dropConstructor]");
      cy.get("[data-testid = link]:eq(6)").drag("[data-testid = dropConstructor]");
      cy.get("[data-testid = link]:eq(8)").drag("[data-testid = dropConstructor]");
      cy.get("[data-testid = link]:eq(10)").drag("[data-testid = dropConstructor]");
      cy.get('button').contains('Оформить заказ').click();
      cy.contains('Войти');
      cy.get(':nth-child(2) > .input').type('lfif@yandex.ru');
      cy.get(':nth-child(3) > .input').type('789456123');
      cy.get('button').contains('Войти').click();
      cy.get('button').contains('Оформить заказ').click();
      cy.intercept('POST','https://norma.nomoreparties.space/api/orders', {order: {number: 333987}, success: true}).as('getOrder');
      cy.wait('@getOrder');
      cy.get("[data-testid = orderNumber]");
      cy.get("[data-testid = close] > svg").click();
      cy.contains('Соберите бургер');
    })
  }); 