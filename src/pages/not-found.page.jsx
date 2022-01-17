import { useEffect } from "react";

//  COMPOENENTS
import Header from "../components/header.component";

function NotFoundPage() {
  // on render, change title
  useEffect(() => {
    document.title = "Not Found - InstaClone";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
