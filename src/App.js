import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//ROUTES
import { DASHBOARD, LOGIN } from './constants/routes.constants';

// PAGES
const LoginPage = lazy(() => import("./pages/login/login.page.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path={DASHBOARD} element={<p>Dashboard Page</p>} />
        <Route path={LOGIN} element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
