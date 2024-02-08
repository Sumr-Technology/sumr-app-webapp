import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { addToPlaylist, getUserPlaylists } from '../../Helpers/FireStore';
import { auth } from '../../Helpers/Firebase';
import PlaylistSvg from '../../assets/icons/playlist.svg';
import { Sumr } from '../../Types/Sumrs';
import { Playlist } from '../../Types/Playlist';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#203436',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
};

export default function AddToPlaylistModal({ data }: { data: Sumr }) {
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
    getUserPlaylists(_auth.currentUser?.uid ?? '').then((p) => {
      setPlaylists(p);
    });
  }, [_auth?.currentUser?.uid]);

  async function newPlaylist() {
    await addToPlaylist(selectedPlaylist?.id ?? '', data._id);
    setIsOpen(false);
  }

  return (
    <div>
      <button className="text-white pt-1" onClick={openModal}>
        <img className="w-7 md:w-8" src={PlaylistSvg} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex text-gray-200 w-96 flex-col gap-6">
            <div className="flex justify-between">
              <span className="font-medium text-2xl">Add to Playlist</span>
              <button
                className="self-end text-white hover:text-primary"
                onClick={closeModal}
              >
                close
              </button>
            </div>

            <div className="flex border p-2 justify-start h-64 overflow-scroll rounded-lg flex-col gap-2 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-700 to-primary-dark bg-gradient-to-r">
              {playlists.map((pl, i) => (
                <button
                  className={
                    selectedPlaylist?.id === pl.id
                      ? 'bg-primary bg-opacity-70 rounded-lg py-1'
                      : 'hover:text-primary'
                  }
                  onClick={() => setSelectedPlaylist(pl)}
                  key={i}
                >
                  {pl.name}
                </button>
              ))}
            </div>

            <div className="flex gap-1">
              <span className="font-medium text-lg">Adding to: </span>
              <span className="pl-2 text-lg">{selectedPlaylist?.name}</span>
            </div>

            <button
              onClick={() => {
                newPlaylist();
              }}
              className="border border-primary rounded-lg w-44 self-center py-1 text-lg hover:bg-primary hover:font-medium"
            >
              Add to Playlist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
