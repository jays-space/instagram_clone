import { useEffect, useState } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//SERVICES
import { getSuggestedProfiles } from "../../services/firebase.services";

//COMPONENTS
import SuggestedProfile from "./suggested-profile.component";

const Suggestions = ({ userId, following, currentUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      {/* header */}
      <div className="text-sm flex items-center align-items justify-betweenmb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>

      {/* suggestions */}
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            currentUserId={userId}
            currentUserDocId={currentUserDocId}
            avatar={profile?.avatar}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: propTypes.string,
  currentUserDocId: propTypes.string,
  following: propTypes.array,
};
