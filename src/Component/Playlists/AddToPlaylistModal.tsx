import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { addToPlaylist, getUserPlaylists } from "../../Helpers/FireStore";
import { auth } from "../../Helpers/Firebase";
import PlaylistSvg from "../../assets/icons/playlist.svg";
import { Sumr } from "../../Types/Sumrs";
import { Playlist } from "../../Types/Playlist";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1b1c1e",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

export default function AddToPlaylisModal({ data }: { data: Sumr }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    name: string;
    id: string;
  }>();

  const _auth = auth;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getUserPlaylists(_auth.currentUser?.uid ?? "").then((p) => {
      setPlaylists(p);
    });
  }, [_auth?.currentUser?.uid]);

  async function newPlaylist() {
    await addToPlaylist(selectedPlaylist?.id ?? "", data._id);
    setIsOpen(false);
  }

  return (
    <div>
      <button className="text-white pt-1" onClick={openModal}>
        <img className="w-6" src={PlaylistSvg} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex text-white w-96 flex-col gap-6 bg-primaryDark">
            <div className="flex justify-between">
              <span className="font-medium text-lg">Add to Playlist</span>
              <button className="self-end text-white" onClick={closeModal}>
                close
              </button>
            </div>

            <div className="flex bg-zinc-800 border p-2 justify-start h-64 overflow-scroll flex-col gap-2">
              {playlists.map((pl, i) => (
                <button
                  className={
                    selectedPlaylist?.id === pl.id
                      ? "bg-primary bg-opacity-70"
                      : ""
                  }
                  onClick={() => setSelectedPlaylist(pl)}
                  key={i}
                >
                  {pl.name}
                </button>
              ))}
            </div>

            <div className="flex gap-1">
              <span>Adding to:</span>
              <span>{selectedPlaylist?.name}</span>
            </div>

            <button
              onClick={() => {
                newPlaylist();
              }}
              className="border mt-6 border-primary rounded w-44 self-center"
            >
              Add to Playlist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
