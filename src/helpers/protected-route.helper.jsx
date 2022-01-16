import { cloneElement } from "react";
import propTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

//ROUTES
import { LOGIN } from "../constants/routes.constants";

//* auth example: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  return (
    <>
      {user ? (
        cloneElement(children, { user })
      ) : !user ? (
        <Navigate to={LOGIN} state={{ state: { from: location } }} />
      ) : null}
    </>
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  user: propTypes.object,
  children: propTypes.object.isRequired,
};
