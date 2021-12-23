import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//FIREBASE
import { firebase, fieldValue } from "./lib/firebase";

//CONTEXT
import FirebaseContext from "./context/firebase";

//STYLES
import "./styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, fieldValue }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
