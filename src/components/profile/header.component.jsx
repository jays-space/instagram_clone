import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//HOOKS
import useUser from "../../hooks/use-user.hook";

//SERVICES
import { isUserFollowingProfile } from "../../services/firebase.services";

const ProfilePageHeader = ({
  profile,
  photosCount,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profile.userId
      );

      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profile.userId]);

  return <p>{profile?.username} profile</p>;
};

export default ProfilePageHeader;

ProfilePageHeader.propTypes = {
  photosCount: propTypes.number.isRequired,
  followerCount: propTypes.number.isRequired,
  setFollowerCount: propTypes.func.isRequired,
  profile: propTypes.shape({
    docId: propTypes.string,
    userId: propTypes.string,
    fullName: propTypes.string,
    following: propTypes.array,
  }).isRequired,
};
