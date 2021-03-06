import { useEffect } from "react";

//COMPONENTS
import Header from "../components/header.component";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline.component";

const DashboardPage = () => {
  // on render, change title
  useEffect(() => {
    document.title = "Dashboard - InstaClone";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />

      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardPage;
