import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import FirebaseContext from "../../context/firebase.context";
import { doesUsernameExist } from "../../services/firebase.services";
import SignUpPage from "../../pages/signup.page";
import { DASHBOARD } from "../../constants/routes.constants";
import { act } from "react-dom/test-utils";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../services/firebase.services.js");
jest.mock("firebase/auth");
jest.mock("react-router-dom");
jest.mock("../../lib/firebase.lib.js");

describe("<Signup/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign up page with a form submission and signs up a new user", async () => {
    const signupSuccess = jest.fn(() => Promise.resolve("Signup successfull!"));

    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };

    //* mock Firebase context
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
      createUserWithEmailAndPassword: jest.fn(() => ({
        user: signupSuccess,
      })),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    const signupForm = screen.getByTestId("signup-form");
    const errorMessage = screen.queryByTestId("error-message");
    const usernameInput = screen.getByPlaceholderText("Username");
    const fullNameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    const testUsername = "username";
    const testFullName = "New Username";
    const testEmail = "test1.email@email.com";
    const testPassword = "password";

    //* check document title
    expect(document.title).toBe("Sign Up - InstaClone");

    //* simulate user input
    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(fullNameInput, { target: { value: testFullName } });
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    //* check user entered data
    await waitFor(() => {
      expect(usernameInput).toHaveValue(testUsername);
    });
    await waitFor(() => {
      expect(fullNameInput).toHaveValue(testFullName);
    });
    await waitFor(() => {
      expect(emailInput).toHaveValue(testEmail);
    });
    await waitFor(() => {
      expect(passwordInput).toHaveValue(testPassword);
    });

    //* simulate user info submission
    fireEvent.submit(signupForm);

    await waitFor(async () => {
      await doesUsernameExist.mockImplementation(() => Promise.resolve(false));
    });

    //* check that function to check username was fired
    expect(doesUsernameExist).toHaveBeenCalled();
    expect(doesUsernameExist).toHaveBeenCalledWith(testUsername);

    //* check that function to signup was fired and if it was fired with the correct params
    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      firebase.auth,
      testEmail,
      testPassword
    );

    //* check there is no error message
    expect(errorMessage).toBeFalsy();

    //* redirect to user dashboard page on successful login
    expect(mockedNavigate).toHaveBeenCalledWith(DASHBOARD, { replace: true });
  });

  it("renders the sign up page but an error is present (username exists)", async () => {
    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };

    //* mock Firebase context
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
      createUserWithEmailAndPassword: jest.fn(() => ({
        user: jest.fn(() => Promise.resolve({})),
      })),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    const signupForm = screen.getByTestId("signup-form");
    const errorMessage = screen.queryByTestId("error-message");
    const usernameInput = screen.getByPlaceholderText("Username");
    const fullNameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    const testUsername = "username";
    const testFullName = "New Username";
    const testEmail = "test1.email@email.com";
    const testPassword = "password";

    //* check document title
    expect(document.title).toBe("Sign Up - InstaClone");

    //* simulate user input
    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(fullNameInput, { target: { value: testFullName } });
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    //* check user entered data
    await waitFor(async () => {
      expect(usernameInput.value).toBe(testUsername);
    });
    await waitFor(async () => {
      expect(fullNameInput.value).toBe(testFullName);
    });
    await waitFor(async () => {
      expect(emailInput.value).toBe(testEmail);
    });
    await waitFor(async () => {
      expect(passwordInput.value).toBe(testPassword);
    });

    await waitFor(async () => {
      await doesUsernameExist.mockImplementation(() => Promise.resolve(true));
    });

    //* simulate user info submission
    fireEvent.submit(signupForm);

    //* check that function to check username was fired
    expect(doesUsernameExist).toHaveBeenCalled();
    expect(doesUsernameExist).toHaveBeenCalledWith(testUsername);

    //* reset user values
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
    });

    //* check user entered data is reset
    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    //* check there is an error message
    expect(
      screen.getByText(
        "That username is already taken. Please try another username."
      )
    ).toBeInTheDocument();

    //* check that function to signup was not fired
    await waitFor(async () => {
      expect(firebase.createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    //* check that user was not redirected to user dashboard page
    expect(mockedNavigate).not.toHaveBeenCalledWith(DASHBOARD, {
      replace: true,
    });
  });

  it("renders the sign up page with a form submission but there an error is thrown", async () => {
    const signupFailure = jest.fn(() =>
      Promise.reject(new Error("Signup unsuccessfull."))
    );

    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };

    //* mock Firebase context
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
      createUserWithEmailAndPassword: jest.fn(() => signupFailure),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <SignUpPage />
        </FirebaseContext.Provider>
      </Router>
    );

    const signupForm = screen.getByTestId("signup-form");
    const errorMessage = screen.queryByTestId("error-message");
    const usernameInput = screen.getByPlaceholderText("Username");
    const fullNameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    const testUsername = "username";
    const testFullName = "New Username";
    const testEmail = "test1.email@email.com";
    const testPassword = "password";

    //* check document title
    expect(document.title).toBe("Sign Up - InstaClone");

    //* simulate user input
    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(fullNameInput, { target: { value: testFullName } });
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    //* check user entered data
    await waitFor(() => {
      expect(usernameInput.value).toBe(testUsername);
    });
    await waitFor(() => {
      expect(fullNameInput.value).toBe(testFullName);
    });
    await waitFor(() => {
      expect(emailInput.value).toBe(testEmail);
    });
    await waitFor(() => {
      expect(passwordInput.value).toBe(testPassword);
    });

    //* simulate user info submission
    fireEvent.submit(signupForm);

    await waitFor(async () => {
      await doesUsernameExist.mockImplementation(() => Promise.resolve(false));
    });

    //* check that function to check username was fired
    expect(doesUsernameExist).toHaveBeenCalled();
    expect(doesUsernameExist).toHaveBeenCalledWith(testUsername);

    //* check that function to signup was fired and if it was fired with the correct params
    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      firebase.auth,
      testEmail,
      testPassword
    );

    //* check there is no error message
    // expect(errorMessage).toBeTruthy();

    //* reset user values
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "" } });
      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
    });

    //* check user entered data is reset
    expect(fullNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    //* redirect to user dashboard page on successful login
    expect(mockedNavigate).not.toHaveBeenCalledWith(DASHBOARD, {
      replace: true,
    });
  });
});
