import React, { createContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../Helpers/Firebase';
import {
  SquaresPlusIcon,
  UserIcon,
  NewspaperIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
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
      className={`fixed rounded-2xl text-white shadow-2xl border-[1px] border-l-[0px] border-slate-500 top-0 left-0 z-40 w-64 lg1:w-72 lg2:w-72 h-2/3 transition-all -translate-x-full mdsm:translate-x-0 translate-y-[100px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-700 to-primary-dark bg-gradient-to-r rounded-tl-none rounded-bl-none `}
      style={{ width: expanded ? '' : '135px' }}
      aria-label="Sidebar"
    >
      <div className="h-full  overflow-y-auto mt-6 flex flex-col justify-between">
        <ul className="space-y-3 font-medium md:px-6">
          {SIDEBAR_TABS?.map((tab) => (
            <button
              onClick={() => handleTabClick(tab.path)}
              className={`${
                location.pathname.includes(tab.name.toLowerCase())
                  ? 'bg-primary text-gray-800 hover:text-white'
                  : ''
              } rounded-2xl hover:text-primary text-white flex-1 w-full md:text-xl overflow-hidden  ${
                expanded ? '' : 'w'
              }`}
              key={tab.name}
            >
              {/* Icon Classes */}
              <div
                className={`flex p-3 rounded-lg transition-all ${
                  expanded ? '' : 'w-24 justify-center pl-6'
                }`}
              >
                {React.createElement(tab.icon, {
                  className: 'w-6 h-6 transition duration-75 md:w-8 md:h-8',
                })}
                {/* Tab Name */}
                <span
                  className={`pl-6 overflow-hidden transition-all ${
                    expanded ? '' : 'w-0'
                  }`}
                >
                  {tab.name}
                </span>
              </div>
            </button>
          ))}
        </ul>
        {/* Open Sidebar Button */}
        <button
          className="p-2 bg-gray-800 rounded-lg absolute md:-right-6 "
          style={{ top: '200px' }}
          onClick={() => setExpanded((curr) => !curr)}
        >
          {React.createElement(expanded ? ChevronLeftIcon : ChevronRightIcon, {
            className:
              'w-6 h-6 md:w-8 md:h-8 hover:text-primary transition-all',
          })}
        </button>
        {/* Logout Button */}
        <div
          className="flex items-center font-light p-3 cursor-pointer rounded-2xl hover:text-primary text-white w-full md:text-xl  md:mb-10 md:px-9"
          onClick={handleLogOut}
        >
          {React.createElement(ArrowRightCircleIcon, {
            className: 'w-6 h-6 md:w-8 md:h-8',
          })}
          <span
            className={`pl-6 overflow-hidden transition-all ${
              expanded ? '' : 'w-0'
            }`}
          >
            Log out
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
