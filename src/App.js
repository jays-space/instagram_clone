import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//ROUTES
import { DASHBOARD, LOGIN, SIGN_UP } from "./constants/routes.constants";

// PAGES
const LoginPage = lazy(() => import("./pages/login.page.jsx"));
const SignUpPage = lazy(() => import("./pages/signup.page.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path={DASHBOARD} element={<p>Dashboard Page</p>} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGN_UP} element={<SignUpPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
