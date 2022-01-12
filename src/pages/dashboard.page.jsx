import { useEffect } from "react";

//COMPONENTS
import Header from "../components/header.component";
import Sidebar from "../components/sidebar.component";
import Timeline from "../components/timeline.component";

const DashboardPage = () => {
  // on render, change title
  useEffect(() => {
    document.title = "Dashboard - Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />

      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardPage;
