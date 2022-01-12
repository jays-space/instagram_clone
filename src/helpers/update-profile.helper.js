import { useContext } from "react";
import { authentication } from "../lib/firebase.lib";
import UserContext from "../context/user.context";

export const UpdateDisplayName = (displayName) => {
  const { user } = useContext(UserContext);
  const { updateProfile } = authentication;

  if (displayName) {
    console.log(displayName);
    updateProfile(user, {
      displayName,
    })
      .then(() => {
        // Profile updated!
        alert("Display Name Updated");
      })
      .catch((error) => {
        // An error occurred
        alert("Display Name Update Error: ", error.message);
        console.log(error);
      });
  }
};
