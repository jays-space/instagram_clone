import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "../../context/user.context";
import FirebaseContext from "../../context/firebase.context";
import DashboardPage from "../../pages/dashboard.page";
import useUser from "../../hooks/use-user.hook";
import userFixture from "../../fixtures/logged-in-user";
import noAvatarUserFixture from "../../fixtures/logged-in-user-no-avatar";
import iterableUserFixture from "../../fixtures/logged-in-user-iterable";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfilesFixture from "../../fixtures/suggested-profiles";
import {
  getSuggestedProfiles,
  getPhotos,
  getUserByUserId,
} from "../../services/firebase.services";
import { act } from "react-dom/test-utils";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("react-router-dom");
jest.mock("../../lib/firebase.lib.js");
jest.mock("../../services/firebase.services");
jest.mock("../../hooks/use-user.hook");

describe("<NotFound/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard page with a logged in user", async () => {
    //* mock user context
    const user = {
      uid: "igPUAuFMzmO7979l3nFdctDR3Ph2",
      displayName: "jay",
      avatar: "/images/avatars/jay.jpg",
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

    await act(async () => {
      await getPhotos.mockImplementation(() => Promise.resolve(photosFixture));
      await getUserByUserId.mockImplementation(() =>
        Promise.resolve(iterableUserFixture)
      );
      await useUser.mockImplementation(() => ({ user: userFixture }));
      await getSuggestedProfiles.mockImplementation(() =>
        Promise.resolve(suggestedProfilesFixture)
      );

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <DashboardPage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      const docId = "494LKmaF03bUcYZ4xhNu";
      const notFollowedUserProfileID = "3";
      const testComment = "Nice photo!";

      //* check that it renders the dashboard page
      await waitFor(async () => {
        expect(document.title).toBe("Dashboard - InstaClone");
      });

      /* HEADER */
      //* check that the logged in user has logged in successfully
      await waitFor(async () => {
        expect(screen.getByText("Jay Mondlana")).toBeInTheDocument();
      });

      //* check that the logged in user has the option to sign out
      await waitFor(async () => {
        expect(screen.getByTitle("Sign Out")).toBeTruthy();
      });

      //* check that the logo is present
      await waitFor(async () => {
        await expect(screen.getByAltText("Insta-Clone Logo")).toBeTruthy();
      });

      //* check that if there is an avatar, the user avatar is rendered
      await waitFor(async () => {
        expect(screen.getByTestId("current-user-avatar")).toBeTruthy();
      });
      //* check that if there is an avatar, the generic avatar is not rendered
      await waitFor(async () => {
        expect(screen.queryByTestId("generic-avatar")).toBeFalsy();
      });

      /* SIDEBAR */
      //* check that the logged in user can see their profile
      await waitFor(async () => {
        expect(screen.getAllByAltText("jay profile")).toBeTruthy();
      });

      //* check that the suggestions exist
      await waitFor(async () => {
        expect(screen.getByText("Suggestions for you")).toBeTruthy();
      });

      //* check that the logged in user can see some suggested profiles
      //* check that if there is an avatar, the avatar is rendered
      await waitFor(async () => {
        expect(screen.getAllByText("dali")).toBeTruthy();
      });

      //* check that if there is no avatar, the generic avatar is rendered
      await waitFor(async () => {
        expect(screen.getAllByText("dalii")).toBeTruthy();
      });

      /* TIMELINE */
      //* check that the logged in user can see their timeline as well as some photos
      await waitFor(async () => {
        expect(
          screen.getByTestId(
            `avatar-of-not-followed-user-${notFollowedUserProfileID}`
          )
        ).toBeTruthy();
      });

      /* ACTION - SIGN OUT */
      //* test user sign out on click and on key press
      fireEvent.click(screen.getByTestId("sign-out-btn"));
      fireEvent.keyDown(screen.getByTestId("sign-out-btn"), {
        key: "Enter",
      });

      /* ACTION - FOLLOW */
      fireEvent.click(screen.getByTestId(`follow-${notFollowedUserProfileID}`));

      /* ACTION - TOGGLE LIKE */
      fireEvent.click(screen.getByTestId(`toggle-like-${docId}`));
      fireEvent.keyDown(screen.getByTestId(`toggle-like-${docId}`), {
        key: "Enter",
      });

      /* ACTION - SUBMIT COMMENT */
      //* test if click/key press on icon focuses on comment input
      fireEvent.click(screen.getByTestId(`add-comment-focus-input-${docId}`));
      fireEvent.keyDown(
        screen.getByTestId(`add-comment-focus-input-${docId}`),
        {
          key: "Enter",
        }
      );

      //* test entering message in comment
      fireEvent.change(screen.getByTestId(`add-comment-input-${docId}`), {
        target: { value: testComment },
      });

      //* test if comment has been added
      await waitFor(async () => {
        expect(screen.getByTestId(`add-comment-input-${docId}`)).toHaveValue(
          testComment
        );
      });

      //* test if comment is submitted
      fireEvent.submit(screen.getByTestId(`submit-comment-${docId}`));

      //* test if empty comment is submitted
      fireEvent.change(screen.getByTestId(`add-comment-input-${docId}`), {
        target: { value: "" },
      });

      //* test if comment has been added
      await waitFor(async () => {
        expect(screen.getByTestId(`add-comment-input-${docId}`)).toHaveValue(
          ""
        );
      });

      //* test that the button to show additiuonal comments appears
      expect(screen.getByText("View more comments")).toBeInTheDocument();

      //* test if empty comment is submitted
      fireEvent.submit(screen.getByTestId(`submit-comment-${docId}`));

      //* test button to show next set of comments
      fireEvent.click(screen.getByTestId(`show-next-comment-btn-${docId}`));
      fireEvent.keyDown(screen.getByTestId(`show-next-comment-btn-${docId}`), {
        key: "Enter",
      });
    });
  });

  it("renders the dashboard page with a logged in user with no avatar uploaded", async () => {
    //* mock user context
    const user = {
      uid: "igPUAuFMzmO7979l3nFdctDR3Ph2",
      displayName: "jay",
      avatar: "/images/avatars/jay.jpg",
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

    await act(async () => {
      await getPhotos.mockImplementation(() => Promise.resolve(photosFixture));
      await getUserByUserId.mockImplementation(() =>
        Promise.resolve(iterableUserFixture)
      );
      await useUser.mockImplementation(() => ({ user: noAvatarUserFixture }));
      await getSuggestedProfiles.mockImplementation(() =>
        Promise.resolve(suggestedProfilesFixture)
      );

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <DashboardPage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      const docId = "494LKmaF03bUcYZ4xhNu";
      const notFollowedUserProfileID = "3";
      const testComment = "Nice photo!";

      //* check that it renders the dashboard page
      await waitFor(async () => {
        expect(document.title).toBe("Dashboard - InstaClone");
      });

      /* HEADER */
      //* check that if there is no avatar, the user avatar is not rendered
      await waitFor(async () => {
        expect(screen.queryByTestId("current-user-avatar")).toBeFalsy();
      });
      //* check that if there is no avatar, the generic avatar is rendered
      await waitFor(async () => {
        expect(screen.getByTestId("generic-avatar")).toBeTruthy();
      });
    });
  });

  it("renders the dashboard with a user profile and has no suggested profile", async () => {
    //* mock user context
    const user = {
      uid: "igPUAuFMzmO7979l3nFdctDR3Ph2",
      displayName: "jay",
      avatar: "/images/avatars/jay.jpg",
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

    await act(async () => {
      await getPhotos.mockImplementation(() => Promise.resolve(photosFixture));
      await getUserByUserId.mockImplementation(() =>
        Promise.resolve(iterableUserFixture)
      );
      await useUser.mockImplementation(() => ({ user: userFixture }));
      await getSuggestedProfiles.mockImplementation(() => Promise.resolve([]));

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <DashboardPage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      //* check that it renders the dashboard page
      await waitFor(async () => {
        expect(document.title).toBe("Dashboard - InstaClone");
      });

      //* check that there are no suggestions
      await waitFor(() => {
        expect(screen.queryByText("Suggestions for you")).toBeFalsy();
      });
    });
  });
});
