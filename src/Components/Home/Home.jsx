import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Link } from "react-router-dom";

import TopNav from "../Navigations/TopNav";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopNav />
      <div className="h-full w-full min-h-full flex flex-1 flex-col items-center justify-center">
        <p>You are Subscribed to Morning Mail</p>
        <Link
          to="/dashboard"
          className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200
                        hover:bg-green-700 mt-5"
        >
          Dashboard <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
