import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//HOOKS
import useUser from "../../hooks/use-user.hook";

//SERVICES
import {
  isUserFollowingProfile,
  toggleFollow,
} from "../../services/firebase.services";

const ProfilePageHeader = ({
  profile,
  photosCount,
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow = user.username && user.username !== profile.username; //* is user.username true? && is user.username !== profile.username?

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profile.userId
      );

      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profile.userId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });

    await toggleFollow(
      isFollowingProfile,
      profile.docId,
      profile.userId,
      user.docId,
      user.userId
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      {/* avatar */}
      <div className="container flex justify-center">
        {!profile?.username ? (
          <Skeleton
            width={160}
            height={160}
            className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 flex"
          />
        ) : profile.avatar ? (
          <img
            className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 flex"
            src={`/images/avatars/${profile?.username}.jpg`}
            alt={`${profile?.username}'s avatar`}
          />
        ) : (
          <img
            className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 flex"
            src={`/images/avatars/default.png`}
            alt={`${profile?.username}'s avatar`}
          />
        )}
      </div>

      {/* name */}
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile?.username}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="container flex mt-4 flex-col lg:flex-row">
          {!profile?.followers || !profile?.following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile?.following?.length}</span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile?.fullName ? (
              <Skeleton count={1} height={24} />
            ) : (
              profile?.fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
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
    followers: propTypes.array,
  }).isRequired,
};
