import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "../../pages/not-found.page";
import UserContext from "../../context/user.context";
import FirebaseContext from "../../context/firebase.context";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("react-router-dom");
jest.mock("../../lib/firebase.lib.js");

describe("<NotFound/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the not-found page with a logged in user", async () => {
    //* mock user context
    const user = {
      uid: 1,
    };

    //* mock Firebase context
    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <UserContext.Provider value={{ ...user }}>
            <NotFoundPage />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    //* check that it renders the not found page
    expect(document.title).toBe("Not Found - InstaClone");
    expect(screen.getByText("Not Found!")).toBeTruthy();
  });

  it("renders the not-found page with no active logged in user", async () => {
    //* mock user context
    const user = null;

    //* mock Firebase context
    const auth = {
      apiKey: "mock-api-key",
      authDomain: "instagram-clone.firebaseapp.com",
      appName: "[DEFAULT]",
    };
    const firebase = {
      auth: jest.fn(() => ({ ...auth })),
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ ...firebase }}>
          <UserContext.Provider value={{ ...user }}>
            <NotFoundPage />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    //* check that it renders the not found page
    expect(document.title).toBe("Not Found - InstaClone");
    expect(screen.getByText("Not Found!")).toBeTruthy();
  });
});
