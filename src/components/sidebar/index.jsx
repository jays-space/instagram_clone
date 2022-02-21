import React from "react";

// HOOKS
import useUser from "../../hooks/use-user.hook";

//COMPONENTS
import User from "./user.component";
import Suggestions from "./suggestions.component";

const Sidebar = () => {
  const {
    user: { fullName, username, userId, following, docId, avatar },
  } = useUser();

  return (
    <div className="hidden md:block p-4">
      <User username={username} fullName={fullName} avatar={avatar} />
      <Suggestions
        userId={userId}
        following={following}
        currentUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
