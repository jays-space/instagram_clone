import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase.context";

//CONSTANTS
import { DASHBOARD, SIGN_UP } from "../constants/routes.constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInWithEmailAndPassword, auth } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // error message if isInvalid === true
  const [error, setError] = useState("");

  //input validation: if email or password isEmpty, then return true
  const isInvalid = password === "" || emailAddress === "";

  // on render, change title
  useEffect(() => {
    document.title = "Login - InstaClone";
  }, []);

  // login functionality
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // send email and password to firebase then route to main page
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(DASHBOARD, { replace: true });
    } catch (error) {
      // clear state and set error message as error
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="container flex flex-col lg:flex-row mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      {/* phone image  */}
      <div className="hidden lg:visible lg:flex w-5/5 lg:w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>

      {/* singin form */}
      <div className="flex flex-col justify-center h-full max-w-md m-auto w-full lg:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            {/* logo */}
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="object-scale-down"
            />
          </h1>

          {/* if error, display error message */}
          {error && (
            <p data-testid="error" className="mb-4 text-xs text-red-primary">
              {error}
            </p>
          )}

          {/* sign in form */}
          <form onSubmit={handleLogin} method="POST" data-testid="login-form">
            {/* email input */}
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />

            {/* password input */}
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />

            {/* submit button */}
            <button
              data-testid="login-btn"
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Login
            </button>
          </form>
        </div>

        {/* if no account, sign up */}
        <div className="flex justify-center items-center w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don't have an account?
            <Link to={SIGN_UP} className="ml-2 font-bold text-blue-medium" data-testid='to-sign-up'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
