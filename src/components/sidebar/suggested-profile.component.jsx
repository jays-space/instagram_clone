import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//SERVICES
import {
  updateCurrentUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase.services";

export const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  currentUserId,
  currentUserDocId,
  avatar,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    if (currentUserId) {
      await updateCurrentUserFollowing(profileId, currentUserDocId, false);
      await updateFollowedUserFollowers(profileDocId, currentUserId, false);
    }
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        {/* avatar */}
        {avatar ? (
          <img
            className="rounded-full w-8 flex mr-3"
            src={`images/avatars/${username}.jpg`}
            alt={`${username}'s profile`}
          />
        ) : (
          <img
            className="rounded-full w-8 flex mr-3"
            src={`images/avatars/default.png`}
            alt={`${username}'s profile`}
          />
        )}

        {/* username */}
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      {/* button */}
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  currentUserDocId: PropTypes.string.isRequired,
};
