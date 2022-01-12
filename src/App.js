import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

//CONTEXT
import UserContext from "./context/user.context";

//HOOKS
import useAuthListener from "./hooks/use-auth-listener.hook";

//ROUTES
import {
  DASHBOARD,
  LOGIN,
  NOT_FOUND,
  SIGN_UP,
} from "./constants/routes.constants";

// PAGES
const LoginPage = lazy(() => import("./pages/login.page.jsx"));
const SignUpPage = lazy(() => import("./pages/signup.page.jsx"));
const NotFoundPage = lazy(() => import("./pages/not-found.page.jsx"));
const DashboardPage = lazy(() => import("./pages/dashboard.page.jsx"));

function App() {
  //** execute uaeAuthListener and return the user if there is an authenticated user
  const { user } = useAuthListener();

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={DASHBOARD} element={<DashboardPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={SIGN_UP} element={<SignUpPage />} />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
