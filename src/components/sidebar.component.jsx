import React from "react";
import useUser from "../hooks/user-user.hook";

const Sidebar = () => {
  const { user } = useUser();
  console.log("user: ", user);

  return <p>I am the Sidebar</p>;
};

export default Sidebar;
