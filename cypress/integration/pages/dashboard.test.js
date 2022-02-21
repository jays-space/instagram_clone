/* eslint-disable no-undef */
// const { cy } = require("date-fns/locale");

describe("dashboard", () => {
  beforeEach(async () => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "Don't have an account?Sign up");
    });

    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "iPhone with Instagram app");

    cy.get("form").within(() => {
      cy.get("input:first")
        .should("have.attr", "placeholder", "Email address")
        .type("contact.jays.space@gmail.com");

      cy.get("input:last")
        .should("have.attr", "placeholder", "Password")
        .type("test123");
      cy.get("button").should("contain.text", "Login").click();
    });

    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "Instagram");

    await cy.wait(3000);
  });

  it("logs the user in, shows the dashboard, and does basic check around the UI", async () => {
    cy.get("body").within(async () => {
      cy.get("div").should("contain.text", "jay"); //* username in header
      cy.get("div").should("contain.text", "Jay Mondlana"); //* full name in header
      cy.get("div").should("contain.text", "Suggestions for you"); //* if the user has suggestions
      await cy.wait(3000);
    });
  });

  it("logs the user in and adds a comment to a photo", async () => {
    cy.get('[data-testid="add-comment-input-2G41JjBM6BeF0s6M3jmv"]')
      .should("have.attr", "placeholder", "Add a comment...")
      .type("That's a GREAT photo!");
    cy.get('[data-testid="submit-comment-2G41JjBM6BeF0s6M3jmv"]').submit();
    await cy.wait(3000);
  });

  it("logs the user in and likes a photo", async () => {
    cy.get('[data-testid="toggle-like-2G41JjBM6BeF0s6M3jmv"]').click();
    await cy.wait(3000);
  });

  it("logs the user in and then signs the user out", async () => {
    await cy.wait(3000);
    cy.get('[data-testid="sign-out-btn"]').click();
    cy.get("div").should("contain.text", "Don't have an account?Sign up"); //* login page
  });
});
