import { useState, useEffect, useContext } from "react";

//SERVICES
import { getUserByUserId } from "../services/firebase.services";

//CONTEXTS
import UserContext from "../context/user.context";

const useUser = () => {
  const { user } = useContext(UserContext); //current user
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjectByUid() {
      // * sevice that recieves a user id (user.uid) and retirieves user data where the uid matched the userID stored in the userContext
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    // * should there be a user logged in (user.uid), then get user object
    if (user?.uid) {
      getUserObjectByUid(user.uid);
    }
  }, [user]);

  return {
    user: activeUser,
  };
};

export default useUser;
