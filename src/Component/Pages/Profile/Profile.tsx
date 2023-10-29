import ProfileImage from "./ProfileImage";
import { useUser } from "../../../Layout/DefaultLayout";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="flex gap-6 text-white flex-col">
      <span className="font-semibold text-3xl">Profile</span>
      <div className="flex-col flex gap-10">
        <ProfileImage userId={user?.uid || ""} />
        <div className="flex gap-14 flex-col">
          <div className="flex gap-24">
            <div className="flex gap-1 flex-col">
              <span className="font-semibold">Email</span>
              <span className="font-light">{user?.email}</span>
            </div>
            <div className="flex gap-1 flex-col">
              <span className="font-semibold">Name</span>
              <span className="font-light">Sebastian Burke</span>
            </div>
          </div>
          <div className="flex gap-24">
            <div className="flex gap-1 flex-col">
              <span className="font-semibold">Date of Birth</span>
              <span className="font-light">{user?.email}</span>
            </div>
            <div className="flex gap-1 flex-col">
              <span className="font-semibold">Name</span>
              <span className="font-light">Sebastian Burke</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="font-semibold text-3xl">Settings</span>
      </div>
    </div>
  );
};

export default Profile;
