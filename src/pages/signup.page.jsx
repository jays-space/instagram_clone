import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase.context";

//FIREBASE
import { firestore, db } from "../lib/firebase.lib.js";

//SERVICES
import { doesUsernameExist } from "../services/firebase.services";

//CONSTANTS
import { DASHBOARD, LOGIN } from "../constants/routes.constants";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { createUserWithEmailAndPassword, auth, db } =
    useContext(FirebaseContext);
  const { collection, addDoc } = firestore;

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // error message if isInvalid === true
  const [error, setError] = useState("");

  //input validation: if email or password or username or full name isEmpty, then return true
  const isInvalid =
    username === "" ||
    fullName === "" ||
    password === "" ||
    emailAddress === "";

  // on render, change title
  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  // login functionality
  const handleSignUp = async (event) => {
    event.preventDefault();

    //checks against all users if the username given has already been used/taken
    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      //if username does not exist
      try {
        const createdUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );

        // TODO: createdUserResult.user.updateProfile is not a function
        // update created user in auth with username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        //firebase user collection (create a new user document)
        await addDoc(collection(db, "users"), {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        navigate(DASHBOARD, { replace: true });
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      //if username exists
      setUsername("");
      setPassword("");
      setError("That username is already taken. Please try another username.");
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      {/* phone image  */}
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>

      {/* for testing only */}
      {/* <button onClick={handleSignUp}>test</button> */}

      {/* singup form */}
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            {/* logo */}
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {/* if error, display error message */}
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          {/* sign in form */}
          <form onSubmit={handleSignUp} method="POST">
            {/* username input */}
            <input
              aria-label="Enter a user name"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            {/* full name input */}
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />

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
              aria-label="Enter a password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />

            {/* submit button */}
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* if no account, sign up */}
        <div className="flex justify-center items-center w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Already have an account?
            <Link to={LOGIN} className="ml-2 font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;