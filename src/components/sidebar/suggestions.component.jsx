import { useEffect, useState } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

//SERVICES
import { getSuggestedProfiles } from "../../services/firebase.services";

const Suggestions = ({ userId, following }) => {
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
      <div className="text-sm flex items-center align-items justify-betweenmb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: propTypes.string,
  following: propTypes.array,
};
