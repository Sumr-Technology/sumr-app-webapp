import ProfileImage from "./ProfileImage";
import { useUser } from "../../../Layout/DefaultLayout";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../../Helpers/FireStore";

const Profile = () => {
  const { user, refetchCurrentUser } = useUser();
  const [_name, setName] = useState(user?.name);
  const [_username, setUsername] = useState(user?.username);
  const [_dob, setdob] = useState(user?.dob);
  const [displayError, setDisplayError] = useState("");

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
        <span className="font-semibold text-3xl">Settings</span>
      </div>
    </div>
  );
};

export default Profile;
