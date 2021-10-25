import "cypress-file-upload";
import { functions } from "lodash";

Cypress.Commands.add("verifySearchBoxAction", () => {
  cy.get("#search_query_top")
    .type("ab")
    .get(".ac_results>ul>li")
    .should("not.exist");

  cy.get("#search_query_top")
    .type("ab")
    .get(".ac_results>ul>li")
    .should("have.length.at.least", 1);
});

Cypress.Commands.add("addCartItem", () => {
  for (let i = 0; i < 5; i++) {
    cy.xpath('//span[text()="Add to cart"]').eq(i).click();
    cy.get(".cross").eq(0).click();
    cy.wait(1000);
  }
});

Cypress.Commands.add("travelToCart", () => {
  cy.xpath('//a[@title="View my shopping cart"]').click();
  // .xpath('//*[contains(text(), "Check out")]')
  // .click();

  for (let i = 0; i < 5; i++) {
    let a;
    cy.xpath('//p[@class="product-name"]/a')
      .eq(i)
      .then(function ($elem) {
        a = $elem.text();
      });
    cy.xpath('//*[@data-title="Unit price"]/span[@class="price"]')
      .eq(i)
      .then(function ($elem) {
        cy.log(a + "=>" + $elem.text());
      });
  }
  let specialPrice;
  let discount;
  let mrp;
  let product;

  cy.xpath('//*[@class="price special-price"]').then(($ele) => {
    if ($ele) {
      cy.xpath(
        '//*[@class="old-price"]/../../..//p[@class="product-name"]/a'
      ).then((value) => {
        product = value.text();
      });
    }
  });
  cy.xpath('//*[@class="price special-price"]')
    .should("have.length", 1)
    .then(function ($el) {
      specialPrice = $el.text();
    });
  cy.xpath('//*[@class="price-percent-reduction small"]')
    .should("have.length", 1)
    .then(function ($el1) {
      discount = $el1.text();
    });

  cy.xpath('//*[@class="old-price"]')
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

  cy.get("#total_price").then((total) => {
    cy.log("total price => " + total.text());
  });
});

Cypress.Commands.add("checkLargeCheckBox", () => {
  cy.xpath('//a[text()="T-shirts"]').last().click();
  cy.xpath('//p[text()="Catalog"]/..//input').eq(2).check();
});

Cypress.Commands.add("verifySearchItems", () => {
  cy.get("#search_query_top")
    .type("dress")
    .get('[name="submit_search"]')
    .click();

  cy.xpath(
    '//ul[@class="product_list grid row"]//a[@class="product-name"]'
  ).each(($li)=>{
    expect($li.text()).to.have.string("Dress");
  })
});
