import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//FIREBASE
import { firebase, fieldValue } from "./lib/firebase";

//CONTEXT
import FirebaseContext from "./context/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, fieldValue }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
