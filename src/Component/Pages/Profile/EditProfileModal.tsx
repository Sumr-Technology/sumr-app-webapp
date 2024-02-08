import { useEffect, useState } from 'react';
import { useUser } from '../../../Layout/DefaultLayout';
import { updateUserProfile } from '../../../Helpers/FireStore';
import Modal from 'react-modal';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#203536',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
};

export default function EditProfileModal() {
  const { user, refetchCurrentUser } = useUser();
  const [_name, setName] = useState(user?.name);
  const [_username, setUsername] = useState(user?.username);
  const [_dob, setDob] = useState(user?.dob);
  const [displayError, setDisplayError] = useState('');
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
  const unsaved =
    _name !== user?.name || _username !== user?.username || _dob !== user?.dob;

  async function handleSave() {
    setDisplayError('');
    if (!_name || _name === '') {
      setDisplayError('Name can not be empty');
      return;
    }
    if (!_username || _username === '') {
      setDisplayError('Username can not be empty');
      return;
    }
    if (!_dob || _dob === '') {
      setDisplayError('Date of Birth can not be empty');
      return;
    }

    await updateUserProfile(user?.uid ?? '', {
      name: _name,
      username: _username,
      dob: _dob,
    });

    refetchCurrentUser();
    closeModal();
  }

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
      setDob(user?.dob);
    }
  }, [user]);
  const formattedDOB =
    _dob && _dob !== ''
      ? new Date(parseInt(_dob)).toISOString().split('T')[0]
      : '';

  return (
    <div>
      <button
        className="text-white h-10 text-3xl hover:text-primary"
        onClick={openModal}
      >
        {React.createElement(PencilSquareIcon, {
          className: 'w-6 h-6 md:w-8 md:h-8 hover:text-primary transition-all',
        })}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex text-white flex-col gap-6">
            <div className="flex justify-between">
              <span className="font-medium text-3xl self-center">
                Edit Profile
              </span>
              <button className="text-white" onClick={closeModal}>
                close
              </button>
            </div>
            <div className="flex gap-8 flex-col">
              {displayError && (
                <span className="text-red-400 -mb-5">
                  Error: {displayError}
                </span>
              )}
              {/* Email Container */}
              <div className="flex gap-24 text-xl">
                <div className="flex w-44 gap-1 flex-col">
                  <span className="font-semibold text-lg">Email</span>
                  <span className="font-light">{user?.email}</span>
                </div>
                {/* Name Container */}
                <div className="flex gap-1 flex-col text-xl">
                  <span className="font-semibold ">Name</span>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="font-light text-white border rounded px-1 border-primary bg-gray-600"
                    value={_name}
                  />
                </div>
              </div>
              {/* DOB Container */}
              <div className="flex gap-24 text-xl">
                <div className="flex w-44 gap-1 flex-col">
                  <span className="font-semibold ">Date of Birth</span>
                  <input
                    value={formattedDOB}
                    onChange={(e) => {
                      setDob(new Date(e.target.value).getTime().toString());
                    }}
                    type="date"
                    className="font-light text-white border rounded px-1 border-primary bg-gray-600"
                  />
                </div>
                {/* UserName Container */}
                <div className="flex gap-1 flex-col text-xl">
                  <span className="font-semibold">User Name</span>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Enter username"
                    className="font-light text-white border rounded px-1 border-primary bg-gray-600"
                    value={_username}
                  />
                </div>
              </div>
            </div>
            {unsaved && (
              <button
                onClick={handleSave}
                className="rounded-lg my-4 w-full py-2 px-3 bg-primary text-white text-xl"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
