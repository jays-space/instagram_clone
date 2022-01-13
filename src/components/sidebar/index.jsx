import React from "react";

// HOOKS
import useUser from "../../hooks/use-user.hook";

//COMPONENTS
import User from "./user.component";
import Suggestions from "./suggestions.component";

const Sidebar = () => {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        currentUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
