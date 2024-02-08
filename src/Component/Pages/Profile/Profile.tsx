import ProfileImage from './ProfileImage';
import { useUser } from '../../../Layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { chooseInterest, updateUserProfile } from '../../../Helpers/FireStore';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const { user, refetchCurrentUser } = useUser();
  const [_name, setName] = useState(user?.name);
  const [_username, setUsername] = useState(user?.username);
  const [_dob, setdob] = useState(user?.dob);
  const [displayError, setDisplayError] = useState('');
  const [interestToAdd, setInterestsToAdd] = useState<string[]>([]);
  const [interestToRemove, setInterestsToRemove] = useState<string[]>([]);

  const interests = [
    'Fintech',
    'Funding',
    'AI',
    'M&A',
    'Startups',
    'Cybersecurity',
    'Robotics',
    'Crypto',
    'Transportation',
    'Consumer',
    'Regulations',
  ];

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
  }

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
      setdob(user?.dob);
    }
  }, [user]);

  const formattedDOB =
    _dob && _dob !== ''
      ? new Date(parseInt(_dob)).toISOString().split('T')[0]
      : '';

  const chosenInterests = interests.filter(
    (i) => user?.interestList.find((il) => il === i)
  );
  const notChosenInterests = interests.filter((i) => {
    let _f = user?.interestList.find((il) => {
      return il !== i;
    });
    return _f !== undefined;
  });

  async function handleSaveInterets() {
    let _newInterests =
      user?.interestList.filter(
        (il) => !interestToRemove.find((itr) => itr === il)
      ) || [];
    _newInterests = [..._newInterests, ...interestToAdd];
    await chooseInterest(_newInterests, user?.uid ?? '');
    setInterestsToAdd([]);
    setInterestsToRemove([]);
    refetchCurrentUser();
  }

  return (
    <div className="flex text-white flex-col items-center">
      <div className="flex-col flex items-center mb-6">
        <span className="text-6xl font-semibold mb-5">{user?.name}</span>
        <ProfileImage
          refetchCurrentUser={refetchCurrentUser}
          user={user}
          userId={user?.uid || ''}
        />
        {/* New Display */}
        <div className="flex flex-col items-center text-center mb-5 mt-3">
          <ul className="flex flex-col space-y-2">
            <span className="text-2xl ">@{user?.username}</span>
            <span className="text-xl">
              {user?.dob &&
                new Date(user.dob).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </span>
            <span className="text-xl">{user?.email}</span>
          </ul>
        </div>
        <EditProfileModal />
      </div>
      {unsaved && (
        <button
          onClick={handleSave}
          className="rounded-lg my-16 w-38 py-2 px-3 bg-primary text-white text-lg"
        >
          Save Changes
        </button>
      )}

      {/* Interests Section */}
      <div className="flex-col flex items-center my-2  rounded-xl p-6 bg-gradient-to-b from-primaryDark to-gray-600 bg-gradient-to-r pb-16 shadow-xl border-t-2 border-gray-400">
        <span className="font-semibold text-3xl mb-6 ">Interests</span>
        <div className="flex gap-8 flex-col">
          <div className="flex gap-3 flex-col ">
            <span className="text-xl">Your chosen interests</span>
            <div className="flex flex-wrap gap-3 items-baseline space-y-1">
              {chosenInterests.map((int, i) => (
                <button
                  onClick={() => {
                    if (interestToRemove.find((itr) => itr === int)) {
                      setInterestsToRemove(
                        interestToRemove.filter((itr) => int !== itr)
                      );
                    } else {
                      let _new: string[] = [...interestToRemove, int];
                      setInterestsToRemove([...new Set(_new)]);
                    }
                  }}
                  className="border flex justify-between rounded-lg border-primary w-fit text-left py-1 px-4 text-xl shadow-xl"
                  key={i}
                >
                  {int}
                  <span
                    className={`rounded h-full pl-4 hover:text-orange-500 ${
                      interestToRemove.find((itr) => itr === int)
                        ? ' bg-red-600'
                        : ''
                    }`}
                  >
                    X{' '}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <span className="text-xl">All interests</span>
            <div className="flex flex-wrap gap-3 justify-start items-baseline space-y-1">
              {notChosenInterests.map((int, i) => (
                <button
                  onClick={() => {
                    if (interestToAdd.find((itr) => itr === int)) {
                      setInterestsToAdd(
                        interestToAdd.filter((itr) => int !== itr)
                      );
                    } else {
                      let _new: string[] = [...interestToAdd, int];
                      setInterestsToAdd([...new Set(_new)]);
                    }
                  }}
                  className={`border ${
                    interestToAdd.find((itr) => itr === int) ? 'bg-primary' : ''
                  } rounded-lg border-primary w-fit px-6 py-2 text-xl shadow-xl `}
                  key={i}
                >
                  {int}
                </button>
              ))}
            </div>
          </div>
          {(interestToAdd.length > 0 || interestToRemove.length > 0) && (
            <button
              onClick={handleSaveInterets}
              className="rounded-lg mt-5 w-1/2 py-2 px-3  bg-primary text-white text-xl self-center hover:text-gray-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
