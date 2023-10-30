import React, { Dispatch, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sumr } from "../../../Types/Sumrs";
import PlaylisModal from "../../Playlists/PlaylistModal";
import { getUserPlaylists } from "../../../Helpers/FireStore";
import { auth } from "../../../Helpers/Firebase";
import { Playlist } from "../../../Types/Playlist";

const FilterSidebar = ({
  categories,
  onClickCategory,
  selectedCategories,
  hideCategories = false,
}: {
  categories?: string[];
  onClickCategory?: Dispatch<string>;
  selectedCategories?: string[];
  hideCategories?: boolean;
}) => {
  const _auth = auth;

  const normalizedCategories = Array.from(new Set(categories ?? []));

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getUserPlaylists(_auth.currentUser?.uid ?? "").then((p) => {
      setPlaylists(p);
    });
  }, [_auth?.currentUser?.uid]);

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 right-0 z-40 w-96 h-screen pt-20 transition-transform translate-x-full bg-darkPrimary mdsm:translate-x-0 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full pr-36 px-3 flex flex-col gap-8 pb-4 overflow-y-auto bg-primaryDark mt-14">
        {!hideCategories && (
          <div className="flex flex-col bg-zinc-800 rounded-lg px-4 py-2">
            <span className="font-medium border-b border-b-slate-700 pb-1 text-lg text-white">
              Categories
            </span>
            <div className="flex flex-col h-64 overflow-scroll">
              <ul className="space-y-2 flex flex-col">
                {normalizedCategories?.map((tab, i) => (
                  <li className="w-full" key={i}>
                    <button
                      className="flex w-full items-center p-2 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-gray-700"
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

        <div className="flex flex-col bg-zinc-800 rounded-lg px-4 py-2">
          <div className="flex justify-between">
            <span className="font-medium border-b border-b-slate-700 pb-1 text-lg text-white">
              My Playlists
            </span>
            <PlaylisModal />
          </div>

          <div className="flex flex-col h-64 overflow-scroll">
            <ul className="space-y-2 flex flex-col">
              {playlists?.map((tab, i) => (
                <li className="w-full" key={i}>
                  <Link
                    to={"/playlist?id=" + tab.id}
                    className="flex w-full items-center p-2 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-gray-700"
                  >
                    {tab.name}
                  </Link>
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
