import { useReducer, useEffect } from "react";
import propTypes from "prop-types";

//SERVICES
import { getPhotosByUsername } from "../../services/firebase.services";

//COMPONENTS
import ProfilePageHeader from "./header.component";
import ProfilePagePhotos from "./photos.component";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUsername(user?.username);

      if (photos.length > 0) {
        dispatch({
          profile: user,
          photosCollection: photos,
          followerCount: user?.followers?.length,
        });
      } else {
        dispatch({
          profile: user,
          followerCount: user?.followers?.length,
        });
      }
    }

    getProfileInfoAndPhotos();
  }, [user.username, user]);

  return (
    <>
      <ProfilePageHeader
        profile={profile}
        photosCount={photosCollection ? photosCollection?.length : 0}
        followerCount={followerCount ? followerCount : 0}
        setFollowerCount={dispatch}
      />
      <ProfilePagePhotos
        photos={photosCollection}
        username={profile?.username}
      />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: propTypes.shape({
    dateCreated: propTypes.number.isRequired,
    emailAddress: propTypes.string.isRequired,
    followers: propTypes.array.isRequired,
    following: propTypes.array.isRequired,
    fullName: propTypes.string.isRequired,
    userId: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
  }).isRequired,
};
