import { memo } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const User = ({ username, fullName, avatar }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    //   *link to user current profile
    <Link to={`/p/${username}`} className="grid grid-cols-4 mb-6 items-center">
      {/* user avatar */}
      <div className="flex items-center justify-between col-span-1">
        {avatar ? (
          <img
            className="rounded-full w-16 flex mr-3"
            src={`/images/avatars/${username}.png`}
            alt=""
          />
        ) : (
          <img
            className="rounded-full w-16 flex mr-3"
            src={`/images/avatars/default.png`}
            alt={`${username} profile`}
          />
        )}
      </div>

      {/* user details */}
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

export default memo(User);

User.propTypes = {
  username: propTypes.string,
  fullName: propTypes.string,
};
