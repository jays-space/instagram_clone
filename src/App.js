import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

//CONTEXT
import UserContext from "./context/user.context";

//HOOKS
import useAuthListener from "./hooks/use-auth-listener.hook";

//ROUTES
import {
  DASHBOARD,
  LOGIN,
  NOT_FOUND,
  PROFILE,
  SIGN_UP,
} from "./constants/routes.constants";
import ProtectedRoute from "./helpers/protected-route.helper";
import IsUserLoggedIn from "./helpers/is-user-logged-in.helper";

// PAGES
const LoginPage = lazy(() => import("./pages/login.page.jsx"));
const SignUpPage = lazy(() => import("./pages/signup.page.jsx"));
const NotFoundPage = lazy(() => import("./pages/not-found.page.jsx"));
const DashboardPage = lazy(() => import("./pages/dashboard.page.jsx"));
const ProfilePage = lazy(() => import("./pages/profile.page.jsx"));

function App() {
  //** execute uaeAuthListener and return the user if there is an authenticated user
  const { user } = useAuthListener();

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <TailSpin
              arialLabel="loading-indicator"
              height={40}
              width={40}
              color="#005c98"
            />
          </div>
        }
      >
        <Routes>
          <Route
            path={DASHBOARD}
            exact
            element={
              <ProtectedRoute user={user}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PROFILE}
            exact
            element={
              <ProtectedRoute user={user}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={LOGIN}
            element={
              <IsUserLoggedIn user={user} loggedInPath={DASHBOARD}>
                <LoginPage />
              </IsUserLoggedIn>
            }
          />
          <Route
            path={SIGN_UP}
            element={
              <IsUserLoggedIn user={user} loggedInPath={DASHBOARD}>
                <SignUpPage />
              </IsUserLoggedIn>
            }
          />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
