import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SquaresPlusIcon,
  UserIcon,
  NewspaperIcon
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navigate = useNavigate();

  const SIDEBAR_TABS = [
    { name: "Sumrs", path: "/sumrs" , icon: NewspaperIcon},
    { name: "Profile", path: "/profile" , icon: UserIcon},
    { name: "Playlists", path: "/playlists" , icon: SquaresPlusIcon},
  ];

  const location = useLocation();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed text-white bg-primaryDark top-0 left-0 z-40 w-64 lg1:w-72 lg2:w-96 h-screen pt-20 transition-transform -translate-x-full mdsm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full pl-12 lg1:pl-20 lg2:pl-44 px-3 pb-4 overflow-y-auto mt-14">
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
                {React.createElement(tab.icon, {
                  className: "w-6 h-6 transition duration-75",
                })}
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
