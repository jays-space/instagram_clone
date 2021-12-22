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

  return <p>Login Page</p>;
};

export default LoginPage;
