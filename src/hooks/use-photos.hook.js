import { useContext, useEffect, useState } from "react";

// CONTEXTS
import UserContext from "../context/user.context";
import { getPhotos, getUserByUserId } from "../services/firebase.services";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId); //* destructures 'following' from obj, from array
      let followedUserPhotos = [];

      //* test if currentUser actually follows some profile(s)
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); //* sort array to have the latest created photo first by dateCreated
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
};

export default usePhotos;
