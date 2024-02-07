import { Dispatch, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlaylistModal from '../../Playlists/PlaylistModal';
import { deletePlaylist, getUserPlaylists } from '../../../Helpers/FireStore';
import { auth } from '../../../Helpers/Firebase';
import { Playlist } from '../../../Types/Playlist';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  GlobeAltIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const FilterSidebar = ({
  categories,
  onClickCategory,
  selectedCategories,
  hideCategories = false,
  currentPlaylistId,
}: {
  categories?: string[];
  onClickCategory?: Dispatch<string>;
  selectedCategories?: string[];
  hideCategories?: boolean;
  currentPlaylistId?: string | null;
}) => {
  const [expanded, setExpanded] = useState(true);

  const _auth = auth;

  const normalizedCategories = Array.from(new Set(categories ?? []));
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getUserPlaylists(_auth.currentUser?.uid ?? '').then((p) => {
      setPlaylists(p);
    });
  }, [_auth?.currentUser?.uid]);

  async function handleDeletePlaylist(id: string) {
    await deletePlaylist(id);
    if (currentPlaylistId === id) {
      navigate('/sumrs');
      return;
    } else {
      getUserPlaylists(_auth.currentUser?.uid ?? '').then((p) => {
        setPlaylists(p);
      });
    }
  }

  return (
    <aside
      id="logo-sidebar"
      className="fixed rounded-2xl text-white shadow-2xl border-[1px] border-r-[0px] border-slate-500 w-64 lg1:w-72 lg2:w-72 top-0 right-0 z-40 h-2/3 pt-0 transition-all translate-x-full mdsm:translate-x-0 translate-y-[100px] rounded-tr-none rounded-br-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700 to-primaryDark bg-gradient-to-r"
      aria-label="Sidebar"
      style={{ width: expanded ? '' : '135px' }}
    >
      <div
        className={`flex flex-col items-center transition-all mt-28 gap-44 ${
          expanded ? 'hidden' : ''
        }`}
      >
        {React.createElement(GlobeAltIcon, {
          className: 'w-6 h-6 md:w-8 md:h-8 hover:text-primary transition-all',
        })}
        {React.createElement(SquaresPlusIcon, {
          className: 'w-6 h-6 md:w-8 md:h-8 hover:text-primary transition-all',
        })}
      </div>
      {/* Main Container for Content */}
      <div
        className={`h-full px-3 flex flex-col gap-2 overflow-y-auto  bg-transparent transition-all ${
          expanded ? '' : 'w-0'
        }`}
      >
        {!hideCategories && (
          <div className="flex flex-col rounded-lg px-4 w-48 py-2">
            <span className="font-medium  pb-2 text-lg text-gray-300 md:text-2xl">
              Categories
            </span>
            <hr className="border-t-2 border-gray-600" />
            <div className="flex flex-col h-72 overflow-scroll">
              <ul className="space-y-1 flex flex-col md:text-lg">
                {normalizedCategories?.map((tab, i) => (
                  <li className="w-full" key={i}>
                    <button
                      className="flex w-full items-center p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-slate-700 dark:hover:bg-gray-700"
                      onClick={() => {
                        if (onClickCategory) {
                          onClickCategory(tab);
                        }
                      }}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Open Sidebar Button */}
        <button
          className="p-2 bg-gray-800 rounded-lg absolute md:-left-6 shadow-xl"
          style={{ top: '200px' }}
          onClick={() => setExpanded((curr) => !curr)}
        >
          {React.createElement(expanded ? ChevronRightIcon : ChevronLeftIcon, {
            className:
              'w-6 h-6 md:w-8 md:h-8 hover:text-primary transition-all',
          })}
        </button>

        <div className="flex flex-col rounded-lg px-4 w-max h-full">
          <div className="flex justify-between">
            <span className="font-medium py-2 text-lg md:text-2xl text-gray-300">
              My Playlists
            </span>
            <PlaylistModal
              onNewPlaylist={() => {
                getUserPlaylists(_auth.currentUser?.uid ?? '').then((p) => {
                  setPlaylists(p);
                });
              }}
            />
          </div>
          <hr className="border-t-2 border-gray-600" />
          <div className="flex flex-col h-full overflow-scroll">
            <ul className="space-y-1 flex flex-col">
              {playlists?.map((tab, i) => (
                <li className="w-full flex justify-between" key={i}>
                  <Link
                    to={'/playlists?id=' + tab.id}
                    className="flex w-full items-center p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-slate-700 dark:hover:bg-gray-700 md:text-lg"
                  >
                    {tab.name}
                  </Link>
                  {tab?.id?.toLowerCase() !==
                    (_auth?.currentUser?.uid + 'fav').toLowerCase() && (
                    <button
                      className="text-gray-400 hover:text-primary ml-5 text-xl"
                      onClick={async () => {
                        handleDeletePlaylist(tab.id);
                      }}
                    >
                      x
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
