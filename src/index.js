import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//FIREBASE
import { fieldValue, signinWithEmailAndPassword, auth } from "./lib/firebase";

//CONTEXT
import FirebaseContext from "./context/firebase";

//STYLES
import "./styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider
      value={{ auth, signinWithEmailAndPassword, fieldValue }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
