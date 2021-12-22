import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../../context/firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // error message if isInvalid === true
  const [error, setError] = useState("");

  //input validation: if email or password isEmpty, then return true
  const isInvalid = password === "" || emailAddress === "";

  // on render, change title
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  // login functionality
  const handleLogin = () => {};

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen bg-black">
      <p>Login Page</p>
    </div>
  );
};

export default LoginPage;
