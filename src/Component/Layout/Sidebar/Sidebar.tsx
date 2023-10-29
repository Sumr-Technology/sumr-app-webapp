import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const SIDEBAR_TABS = [
    { name: "Sumrs", path: "/surms" },
    { name: "Profile", path: "/profile" },
    { name: "Playlists", path: "/playlists" },
  ];

  const location = useLocation();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed text-white bg-primaryDark top-0 left-0 z-40 w-96 h-screen pt-20 transition-transform -translate-x-full mdsm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full pl-44 px-3 pb-4 overflow-y-auto mt-14">
        <ul className="space-y-2 font-medium">
          {SIDEBAR_TABS?.map((tab) => (
            <button
              onClick={() => handleTabClick(tab.path)}
              className={`${
                location.pathname.includes(tab.name.toLowerCase())
                  ? "bg-primary"
                  : ""
              } rounded hover:text-gray-700 text-white flex-1 w-full hover:bg-gray-100`}
              key={tab.name}
            >
              <div className="flex items-center p-2 rounded-lg">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6  transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">{tab.name}</span>
              </div>
            </button>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
