import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//SERVICES
import { getUserByUsername } from "../services/firebase.services";

//COMPONENTS
import Header from "../components/header.component";

//CONSTANTS
import { NOT_FOUND } from "../constants/routes.constants";
import UserProfile from "../components/profile/index.component";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserExists() {
      const userProfile = await getUserByUsername(username);

      if (userProfile?.length > 0) {
        setUserExists(true);
        setUser(userProfile[0]);
      } else {
        navigate(NOT_FOUND);
      }
    }

    checkUserExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, navigate]);

  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        {user && <UserProfile user={user} />}
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
