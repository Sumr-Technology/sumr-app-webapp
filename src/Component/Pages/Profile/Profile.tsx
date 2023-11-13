import ProfileImage from "./ProfileImage";
import { useUser } from "../../../Layout/DefaultLayout";
import { useEffect, useState } from "react";
import { chooseInterest, updateUserProfile } from "../../../Helpers/FireStore";

const Profile = () => {
  const { user, refetchCurrentUser } = useUser();
  const [_name, setName] = useState(user?.name);
  const [_username, setUsername] = useState(user?.username);
  const [_dob, setdob] = useState(user?.dob);
  const [displayError, setDisplayError] = useState("");
  const [interestToAdd, setInterestsToAdd] = useState<string[]>([]);
  const [interestToRemove, setInterestsToRemove] = useState<string[]>([]);

  const interests = [
    "Fintech",
    "Funding",
    "AI",
    "M&A",
    "Startups",
    "Cybersecurity",
    "Robotics",
    "Crypto",
    "Transportation",
    "Consumer",
    "Regulations",
  ];

  const unsaved =
    _name !== user?.name || _username !== user?.username || _dob !== user?.dob;

  async function handleSave() {
    setDisplayError("");
    if (!_name || _name === "") {
      setDisplayError("Name can not be empty");
      return;
    }
    if (!_username || _username === "") {
      setDisplayError("Username can not be empty");
      return;
    }
    if (!_dob || _dob === "") {
      setDisplayError("Date of Birth can not be empty");
      return;
    }

    await updateUserProfile(user?.uid ?? "", {
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
    _dob && _dob !== ""
      ? new Date(parseInt(_dob)).toISOString().split("T")[0]
      : "";

  const chosenInterests = interests.filter(
    (i) => user?.interestList.find((il) => il === i),
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
        (il) => !interestToRemove.find((itr) => itr === il),
      ) || [];
    _newInterests = [..._newInterests, ...interestToAdd];
    await chooseInterest(_newInterests, user?.uid ?? "");
    setInterestsToAdd([]);
    setInterestsToRemove([]);
    refetchCurrentUser();
  }

  return (
    <div className="flex gap-6 text-white relative flex-col">
      <span className="font-semibold text-3xl">Your Profile</span>
      <div className="flex-col flex gap-10">
        <ProfileImage
          refetchCurrentUser={refetchCurrentUser}
          user={user}
          userId={user?.uid || ""}
        />
        <div className="flex gap-14 flex-col">
          {displayError && (
            <span className="text-red-400 -mb-5">Error: {displayError}</span>
          )}
          <div className="flex gap-24">
            <div className="flex w-44 gap-1 flex-col">
              <span className="font-semibold">Email</span>
              <span className="font-light">{user?.email}</span>
            </div>
            <div className="flex gap-1 flex-col">
              <span className="font-semibold">Name</span>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="font-light text-white border rounded px-1 border-primary bg-gray-600"
                value={_name}
              />
            </div>
          </div>
          <div className="flex gap-24">
            <div className="flex w-44 gap-1 flex-col">
              <span className="font-semibold">Date of Birth</span>
              <input
                value={formattedDOB}
                onChange={(e) => {
                  setdob(new Date(e.target.value).getTime().toString());
                }}
                type="date"
                className="font-light text-white border rounded px-1 border-primary bg-gray-600"
              />
            </div>
            <div className="flex gap-1 flex-col">
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
      </div>
      {unsaved && (
        <button
          onClick={handleSave}
          className="rounded mt-5 w-32 py-1 bg-primary text-white"
        >
          Save Changes
        </button>
      )}
      <div>
        <span className="font-semibold text-3xl">Interests</span>
        <div className="flex gap-8 flex-col">
          <span>Add or remove your interests </span>
          <div className="flex gap-3 flex-col">
            <span>Your chosen interests</span>
            <div className="flex flex-wrap gap-2">
              {chosenInterests.map((int, i) => (
                <button
                  onClick={() => {
                    if (interestToRemove.find((itr) => itr === int)) {
                      setInterestsToRemove(
                        interestToRemove.filter((itr) => int !== itr),
                      );
                    } else {
                      let _new: string[] = [...interestToRemove, int];
                      setInterestsToRemove([...new Set(_new)]);
                    }
                  }}
                  className="border flex justify-between rounded border-primary w-36 text-left pl-2"
                  key={i}
                >
                  {int}
                  <span
                    className={`rounded h-full px-2 ${
                      interestToRemove.find((itr) => itr === int)
                        ? " bg-red-600"
                        : ""
                    }`}
                  >
                    X{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <span>All interests</span>
            <div className="flex flex-wrap gap-2">
              {notChosenInterests.map((int, i) => (
                <button
                  onClick={() => {
                    if (interestToAdd.find((itr) => itr === int)) {
                      setInterestsToAdd(
                        interestToAdd.filter((itr) => int !== itr),
                      );
                    } else {
                      let _new: string[] = [...interestToAdd, int];
                      setInterestsToAdd([...new Set(_new)]);
                    }
                  }}
                  className={`border ${
                    interestToAdd.find((itr) => itr === int) ? "bg-primary" : ""
                  } rounded border-primary w-36 text-left px-2`}
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
              className="rounded mt-5 w-32 py-1 bg-primary text-white"
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
