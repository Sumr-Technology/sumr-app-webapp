import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Sumr } from "../../../Types/Sumrs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#203436",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

export default function FullSumrModal({ data }: { data: Sumr }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="text-white pt-1" onClick={openModal}>
        <span className="text-primary">View more</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex pb-6 max-w-4xl flex-col">
          <div className="flex text-white  flex-col gap-6 bg-primaryDark">
            <div className="flex self-end justify-between">
              <button className="self-end text-white" onClick={closeModal}>
                close
              </button>
            </div>
            <span className="font-bold text-xl -mt-4">{data.title}</span>

            <div className="text-white overflow-scroll max-h-[575px]">
              {data.full_text}
            </div>
            <div className="flex gap-2">
              {data?.tag?.map((t) => (
                <div className="border px-2 py-1">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
