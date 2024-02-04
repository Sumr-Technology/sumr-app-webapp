import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../Helpers/Firebase';
import {
  SquaresPlusIcon,
  UserIcon,
  NewspaperIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogOut = () => {
    auth.signOut();
    navigate('/login');
    localStorage.clear();
  };

  const SIDEBAR_TABS = [
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Sumrs', path: '/sumrs', icon: NewspaperIcon },
    { name: 'Playlists', path: '/playlists', icon: SquaresPlusIcon },
  ];
  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed rounded-2xl text-white shadow-2xl border-[1px] border-l-[0px] border-slate-500 top-0 left-0 z-40 w-64 lg1:w-72 lg2:w-72 h-2/3 transition-transform -translate-x-full mdsm:translate-x-0 translate-y-[100px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-700 to-primary-dark bg-gradient-to-r rounded-tl-none rounded-bl-none"
      aria-label="Sidebar"
    >
      <div className="h-full md:px-8 overflow-y-auto mt-6 flex flex-col justify-between">
        <ul className="space-y-3 font-medium">
          {SIDEBAR_TABS?.map((tab) => (
            <button
              onClick={() => handleTabClick(tab.path)}
              className={`${
                location.pathname.includes(tab.name.toLowerCase())
                  ? 'bg-primary text-gray-800 hover:text-white'
                  : ''
              } rounded-2xl hover:text-primary text-white flex-1 w-full md:text-xl`}
              key={tab.name}
            >
              <div className="flex p-3 rounded-lg">
                {React.createElement(tab.icon, {
                  className: 'w-6 h-6 transition duration-75 md:w-8 md:h-8',
                })}
                <span className="ml-6">{tab.name}</span>
              </div>
            </button>
          ))}
        </ul>
        <div
          className="flex items-center font-light p-3 cursor-pointer rounded-2xl hover:text-primary text-white w-full md:text-xl  md:mb-10"
          onClick={handleLogOut}
        >
          {React.createElement(ChevronRightIcon, {
            className: 'w-6 h-6 md:w-8 md:h-8',
          })}
          <span className="ml-6">Log out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
