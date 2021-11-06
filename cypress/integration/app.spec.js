// test file
describe("Verify Automation practice", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php");
  });

  it("Verify FIle Upload", () => {
    cy.get("#contact-link>a").click();

    const fileName = "image.jpg";
    cy.get("#fileUpload").attachFile(fileName);

    cy.get(".filename").should("contain.text", "image.jpg");
  });

  it("Verify Cart Item", () => {
    cy.addCartItem();
    cy.travelToCart();
  });

  it("check the checkbox", () => {
    cy.checkLargeCheckBox();
  });

  it('verify search func', () => {
    cy.verifySearchItems();
  });
});
