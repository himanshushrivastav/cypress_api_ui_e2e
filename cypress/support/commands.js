// Author : Himanshu Shrivastav
import "cypress-file-upload";
import locator from "./locators";

Cypress.Commands.add("addCartItem", () => {
  for (let i = 0; i < 5; i++) {
    cy.xpath(locator.addToCartButton).eq(i).click();
    cy.get(locator.crossButton).eq(0).click();
    cy.wait(500);
  }
});

Cypress.Commands.add("travelToCart", () => {
  cy.xpath(locator.viewCartButton).click();

  for (let i = 0; i < 5; i++) {
    let a;
    cy.xpath(locator.productName)
      .eq(i)
      .then(function ($elem) {
        a = $elem.text();
      });
    cy.xpath(locator.unitPrice)
      .eq(i)
      .then(function ($elem) {
        cy.log(a + "=>" + $elem.text());
      });
  }
  let specialPrice;
  let discount;
  let mrp;
  let product;

  cy.xpath(locator.specialPrice).then(($ele) => {
    if ($ele) {
      cy.xpath(locator.discountProductName).then((value) => {
        product = value.text();
      });
    }
  });
  cy.xpath(locator.specialPriceDiscount)
    .should("have.length", 1)
    .then(function ($el) {
      specialPrice = $el.text();
    });
  cy.xpath(locator.discount)
    .should("have.length", 1)
    .then(function ($el1) {
      discount = $el1.text();
    });

  cy.xpath(locator.oldPrice)
    .should("have.length", 1)
    .then(function ($el2) {
      mrp = $el2.text();
      cy.log(
        "Product=> " +
          product +
          " MRP=> " +
          mrp +
          " Discount=> " +
          discount +
          " special price=> " +
          specialPrice
      );
    });

  cy.get(locator.totalPrice).then((total) => {
    cy.log("total price => " + total.text());
  });
});

Cypress.Commands.add("checkLargeCheckBox", () => {
  cy.xpath(locator.tShirtSectionTab).last().click();
  cy.xpath(locator.catalogInputBoxLarge).eq(2).check();
});

Cypress.Commands.add("verifySearchItems", () => {
  cy.get(locator.globalSearch).type("dress").get(locator.searchButton).click();

  cy.xpath(locator.searchedProductName).each(($li) => {
    expect($li.text()).to.have.string("Dress");
  });
});
