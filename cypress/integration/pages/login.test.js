/* eslint-disable no-undef */
// const { cy } = require("date-fns/locale");

describe("login", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "Don't have an account?Sign up");
    });

    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "iPhone with Instagram app");
  });

  it("inputs the email address and password and submits the form", () => {
    cy.get("form").within(() => {
      cy.get("input:first")
        .should("have.attr", "placeholder", "Email address")
        .type("contact.jays.space@gmail.com");

      cy.get("input:last")
        .should("have.attr", "placeholder", "Password")
        .type("test123");
      cy.get("button").should("contain.text", "Login").click();

      cy.wait(5000);
    });
  });

  it("inputs the email address and password and submits the form with the wrong info", () => {
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");

      cy.get("input:first")
        .should("have.attr", "placeholder", "Email address")
        .type("contact.jays.space@gmail.com");

      cy.get("input:last")
        .should("have.attr", "placeholder", "Password")
        .type("badpassword");

      cy.get("button").should("not.be.disabled");
      cy.get("button").should("contain.text", "Login").click();

      cy.wait(3000);
    });
  });

  it("navigates to the signup page and back to the login page", () => {
    cy.get('[data-testid="to-sign-up"]').click();
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "Already have an account?Login"); //* on the sign up page
    });

    cy.wait(3000);

    cy.get('[data-testid="to-login"]').click();
    cy.get("body").within(() => {
      cy.get("div").should("contain.text", "Don't have an account?Sign up"); //* on the login up page
    });
  });
});
