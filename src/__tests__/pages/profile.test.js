import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "../../context/user.context";
import FirebaseContext from "../../context/firebase.context";
import useUser from "../../hooks/use-user.hook";
import userFixture from "../../fixtures/logged-in-user";
import photosFixture from "../../fixtures/timeline-photos";
import suggestedProfilesFixture from "../../fixtures/suggested-profiles";
import profileFollowedByLoggedInUser from "../../fixtures/profile-followed-by-logged-in-user";
import profileNotFollowedByLoggedInUser from "../../fixtures/profile-not-followed-by-logged-in-user";
import {
  getSuggestedProfiles,
  getPhotos,
  getUserByUserId,
  getUserByUsername,
  getPhotosByUsername,
  isUserFollowingProfile,
} from "../../services/firebase.services";
import { act } from "react-dom/test-utils";
import ProfilePage from "../../pages/profile.page";
import { NOT_FOUND } from "../../constants/routes.constants";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: () => ({ username: "jay" }),
}));

jest.mock("react-router-dom");
jest.mock("../../lib/firebase.lib.js");
jest.mock("../../services/firebase.services");
jest.mock("../../hooks/use-user.hook");

describe("<ProfilePage/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the profile page with a user profile", async () => {
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
      await getUserByUsername.mockImplementation(() =>
        Promise.resolve([userFixture])
      );
      await getPhotosByUsername.mockImplementation(() =>
        Promise.resolve(photosFixture)
      );
      await getUserByUserId.mockImplementation(() =>
        Promise.resolve([userFixture])
      );
      await useUser.mockImplementation(() => ({ user: userFixture }));

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <ProfilePage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalledWith("jay");
      });

      await waitFor(() => {
        expect(screen.getByTitle("Sign Out")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("jay")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("Jay Mondlana")).toBeTruthy();
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "5 photos";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "2followers";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "1following";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      fireEvent.click(screen.getByTitle("Sign Out"));
      fireEvent.keyDown(screen.getByTitle("Sign Out"), {
        key: "Enter",
      });
    });
  });

  it("renders the profile page with a user profile with 1 follower", async () => {
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
      userFixture.followers = ["2"];
      await getUserByUsername.mockImplementation(() =>
        Promise.resolve([userFixture])
      );
      await getPhotosByUsername.mockImplementation(() =>
        Promise.resolve(photosFixture)
      );
      await getUserByUserId.mockImplementation(() =>
        Promise.resolve([userFixture])
      );
      useUser.mockImplementation(() => ({
        user: userFixture,
        followers: ["2"],
      }));

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <ProfilePage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalledWith("jay");
      });

      await waitFor(() => {
        expect(screen.getByTitle("Sign Out")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("jay")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("Jay Mondlana")).toBeTruthy();
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "5 photos";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "1follower";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      await waitFor(() => {
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "1following";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children || []).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        });
      });

      fireEvent.click(screen.getByTitle("Sign Out"));
      fireEvent.keyDown(screen.getByTitle("Sign Out"), {
        key: "Enter",
      });
    });
  });

  it("renders the profile page with a logged in user profile and follows a user", async () => {
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
      isUserFollowingProfile.mockImplementation(() => true);
      await useUser.mockImplementation(() => ({ user: userFixture }));
      profileNotFollowedByLoggedInUser.followers = [];
      await getUserByUsername.mockImplementation(() =>
        Promise.resolve([profileNotFollowedByLoggedInUser])
      );
      await getPhotosByUsername.mockImplementation(() =>
        Promise.resolve(photosFixture)
      );

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <ProfilePage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalledWith("jay");
      });

      await waitFor(() => {
        expect(screen.getByTitle("Sign Out")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("orwell")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("George Orwell")).toBeTruthy();
      });

      fireEvent.keyDown(screen.getByText("Follow"), {
        key: "Enter",
      });
    });
  });

  it("renders the profile page with a logged in user profile and unfollows a user", async () => {
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
      isUserFollowingProfile.mockImplementation(() => true);
      await useUser.mockImplementation(() => ({ user: userFixture }));
      await getUserByUsername.mockImplementation(() =>
        Promise.resolve([profileFollowedByLoggedInUser])
      );
      await getPhotosByUsername.mockImplementation(() => false);

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <ProfilePage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockedNavigate).not.toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(getUserByUsername).toHaveBeenCalledWith("jay");
      });

      await waitFor(() => {
        expect(screen.getByTitle("Sign Out")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("raphael")).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText("Raffaello Sanzio da Urbino")).toBeTruthy();
      });
    });
    fireEvent.click(screen.getByText("Unfollow"));
  });

  it("renders the profile page but there is no user so redirect happens", async () => {
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
      await useUser.mockReturnValue(null);
      await getUserByUsername.mockImplementation(() => []);
      await getPhotosByUsername.mockImplementation(() => []);

      render(
        <Router>
          <FirebaseContext.Provider value={{ ...firebase }}>
            <UserContext.Provider
              value={{
                user: { ...user },
              }}
            >
              <ProfilePage />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith(NOT_FOUND);
      });
    });
  });
});
