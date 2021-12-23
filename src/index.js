import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//FIREBASE
// import {
//   fieldValue,
//   signinWithEmailAndPassword,
//   auth,
//   createNewUserWithEmailAndPassword,
// } from "./lib/firebase.lib";

import { firestore, authentication, auth } from "./lib/firebase.lib";

//CONTEXT
import FirebaseContext from "./context/firebase.context";

//STYLES
import "./styles/app.css";

const { FieldValue } = firestore;
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } =
  authentication;

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider
      value={{
        auth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        FieldValue,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
