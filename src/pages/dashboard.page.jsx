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
    <div>
      <Header />
      <Timeline />
      <Sidebar />
    </div>
  );
};

export default DashboardPage;
