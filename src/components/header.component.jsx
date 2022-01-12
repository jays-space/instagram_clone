import { useContext } from "react";
import { Link } from "react-router-dom";

//LIB
import { authentication } from "../lib/firebase.lib";

//CONTEXT
import UserContext from "../context/user.context";
import FirebaseContext from "../context/firebase.context";

//ROUTES
import { DASHBOARD, LOGIN, SIGN_UP } from "../constants/routes.constants";

const Header = () => {
  const { signOut } = authentication;
  const { user } = useContext(UserContext);
  const { auth } = useContext(FirebaseContext);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          {/*logo */}
          <div className="text-gray-700 text-center flex items-center align-middle cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>

          {/* sign in */}
          <div className="text-gray-700 text-center flex items-center align-items">
            {/* User Auth validsation: if there is a user, render link to logged in dashboard + signout button */}
            {user ? (
              <>
                {/* Dashboard link */}
                <Link to={DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                {/* signout button */}
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => signOut(auth)}
                  // * enables user to signout using the enter key
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      signOut(auth);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                {/* user avatar */}
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    {/* check if there is a user image saved. If not, render default avatar, else render user avatar */}
                    {user.displayName ? (
                      <>
                        <img
                          className="rounded-full h-8 w-8 flex"
                          src={`/images/avatars/${user.displayName}.png`}
                          alt={`${user.displayName} profile`}
                        />
                      </>
                    ) : (
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={`/images/avatars/default.png`}
                        alt={`${user.displayName} profile`}
                      />
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* login button */}
                <Link to={LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>

                {/* signup button */}
                <Link to={SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
