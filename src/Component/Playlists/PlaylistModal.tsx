import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import Modal from "react-modal";
import { createPlaylist } from "../../Helpers/FireStore";
import { auth } from "../../Helpers/Firebase";

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

export default function PlaylisModal({
  onNewPlaylist,
}: {
  onNewPlaylist: () => void;
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  async function newPlaylist() {
    await createPlaylist(name, description, auth?.currentUser?.uid ?? "");
    onNewPlaylist();
    setIsOpen(false);
  }

  return (
    <div>
      <button className="text-white" onClick={openModal}>
        +
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
              <span className="font-medium text-lg">New Playlist</span>
              <button className="self-end text-white" onClick={closeModal}>
                close
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="">Name</span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="rounded pl-1.5 bg-gray-600"
                placeholder="Playlist Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="">Description</span>
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="rounded pl-1.5 bg-gray-600"
                placeholder="Playlist Description"
              />
            </div>

            <button
              onClick={() => {
                newPlaylist();
              }}
              className="border mt-6 border-primary rounded w-44 self-center"
            >
              Create PLaylist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
