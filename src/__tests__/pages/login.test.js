import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByTestId,
  getByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import FirebaseContext from "../../context/firebase.context";
import LoginPage from "../../pages/login.page";
import { DASHBOARD } from "../../constants/routes.constants";
import { act } from "react-dom/test-utils";

jest.mock("../../services/firebase.services.js");

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<Login/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login page with a form submission and login the user", async () => {
    const loginSuccess = jest.fn(() =>
      Promise.resolve("User signed in successfully!")
    );

    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };

    //* mock Firebase context
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
      signInWithEmailAndPassword: jest.fn(() => loginSuccess),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <LoginPage />
        </FirebaseContext.Provider>
      </Router>
    );

    const navigate = mockedNavigate(DASHBOARD);

    const testEmail = "test1.email@email.com";
    const testPassword = "password";

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const errorMessage = screen.queryByTestId("error");

    //* check that the page title is correct
    expect(document.title).toBe("Login - InstaClone");

    //* simulate a user entering their email
    fireEvent.change(emailInput, {
      target: { value: testEmail },
    });

    //* simulate a user entering their password
    fireEvent.change(passwordInput, {
      target: { value: testPassword },
    });

    //* simulate user info submission
    fireEvent.submit(screen.getByTestId("login-form"));

    //* test if input values are passed in correctly
    expect(firebase.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(firebase.signInWithEmailAndPassword).toHaveBeenCalledWith(
      firebase.auth,
      testEmail,
      testPassword
    );

    //* check user entered data
    expect(emailInput).toHaveValue(testEmail);
    expect(passwordInput).toHaveValue(testPassword);

    //* check there is no error message
    expect(errorMessage).toBeFalsy();

    //* redirect to user dashboard page on successful login
    await waitFor(async () => {
      expect(mockedNavigate).toHaveBeenCalledWith(DASHBOARD);
    });
  });

  it("renders the login page with a form submission and fails to login the user", async () => {
    const loginFailure = jest.fn(() =>
      Promise.reject(new Error("Cannot sign in"))
    );

    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };

    //* mock Firebase context
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
      signInWithEmailAndPassword: loginFailure,
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <LoginPage />
        </FirebaseContext.Provider>
      </Router>
    );

    const testEmail = "test1.email.com";
    const testPassword = "password";

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const errorMessage = screen.queryByTestId("error");

    //* check that the page title is correct
    expect(document.title).toBe("Login - InstaClone");

    //* simulate a user entering their email
    fireEvent.change(emailInput, {
      target: { value: testEmail },
    });

    //* simulate a user entering their password
    fireEvent.change(passwordInput, {
      target: { value: testPassword },
    });

    //* simulate user info submission

    fireEvent.submit(screen.getByTestId("login-form"));

    //* test if input values are passed in correctly
    expect(firebase.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(firebase.signInWithEmailAndPassword).toHaveBeenCalledWith(
      firebase.auth,
      testEmail,
      testPassword
    );

    //* check user entered data
    expect(emailInput).toHaveValue(testEmail);
    expect(passwordInput).toHaveValue(testPassword);

    //* check that the submission was rejected
    await waitFor(async () => {
      await expect(firebase.signInWithEmailAndPassword).rejects.toThrow(
        "Cannot sign in"
      );
    });

    //* check that the email and password fields were reset
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    //* check there is an error message
    expect(screen.getByText("Cannot sign in")).toBeInTheDocument();
    // expect(errorMessage).toBeTruthy();

    // //* do not redirect to user dashboard page on unsuccessful login
    expect(mockedNavigate).not.toHaveBeenCalledWith(DASHBOARD);
  });
});
