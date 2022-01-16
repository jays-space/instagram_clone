import { cloneElement } from "react";
import propTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

//ROUTES
import { LOGIN } from "../constants/routes.constants";

//* auth example: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx

const IsUserLoggedIn = ({ user, children, loggedInPath }) => {
  const location = useLocation();
  return (
    <>
      {user ? (
        <Navigate to={loggedInPath} state={{ state: { from: location } }} />
      ) : !user ? (
        cloneElement(children, { user })
      ) : null}
    </>
  );
};

export default IsUserLoggedIn;

IsUserLoggedIn.propTypes = {
  user: propTypes.object,
  children: propTypes.object.isRequired,
  loggedInPath: propTypes.string.isRequired,
};
