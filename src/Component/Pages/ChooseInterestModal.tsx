import React, { useState } from "react";
import Modal from "react-modal";
import { chooseInterest } from "../../Helpers/FireStore";

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

const interests = ["Crypto", "Regulations", "Finance"];

export default function ChooseInterestModal({ userId }: { userId: string }) {
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <div>
      <Modal
        isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => {}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex text-white w-96 flex-col gap-6 bg-primaryDark">
            <div className="flex justify-between">
              <span className="font-medium text-lg">Choose yout interests</span>
            </div>

            <div className="flex bg-zinc-800 border p-2 justify-start h-64 overflow-scroll flex-col gap-2">
              {interests.map((pl, i) => (
                <button
                  className={
                    selectedInterest?.find((si) => pl === si)
                      ? "bg-primary bg-opacity-70"
                      : ""
                  }
                  onClick={() => {
                    const selected = selectedInterest?.find((si) => pl === si);
                    if (selected) {
                      const _filtered = selectedInterest?.filter(
                        (_sl) => _sl !== pl,
                      );
                      setSelectedInterest(_filtered);
                    } else {
                      setSelectedInterest([...selectedInterest, pl]);
                    }
                  }}
                  key={i}
                >
                  {pl}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                chooseInterest(selectedInterest, userId);
              }}
              className="border mt-6 border-primary rounded w-44 self-center"
            >
              Choose Interests
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
