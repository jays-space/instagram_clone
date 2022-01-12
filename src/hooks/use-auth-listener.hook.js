import { useState, useEffect, useContext } from "react";

//LIB
import { authentication } from "../lib/firebase.lib";

//CONTEXTS
import FirebaseContext from "../context/firebase.context";

const useAuthListener = () => {
  const { auth } = useContext(FirebaseContext);
  const { onAuthStateChanged } = authentication;

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      // ** We have a user, thus we can store the user in local storage

      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // ** We don't have an authenticated user, thus clear out local storage

        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener(); //clean up
  }, [onAuthStateChanged, auth]);

  return { user };
};

export default useAuthListener;
