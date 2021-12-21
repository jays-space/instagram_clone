import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//FIREBASE
import { firebase, fieldValue } from "./lib/firebase";

//CONTEXT
import FirebaseContext from "./context/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, fieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
