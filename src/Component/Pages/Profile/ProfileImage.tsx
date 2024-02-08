import { useState } from 'react';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../../Helpers/Firebase';
import { updateUserImage } from '../../../Helpers/FireStore';
import { User } from '../../../Types/User';

export default function ProfileImage({
  userId,
  user,
  refetchCurrentUser,
}: {
  userId: string;
  user: User | null;
  refetchCurrentUser: () => void;
}) {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [unsaved, setUnsaved] = useState(false);

  const uploadFile = () => {
    if (imageUpload === null) {
      alert('Please select an image');
      return;
    }
    const imageRef = storageRef(storage, `profile/${userId}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            await updateUserImage(userId, url);
            setUnsaved(false);
            refetchCurrentUser();
          })
          .catch((error) => {
            console.log('profile error', error);
          });
      })
      .catch((error) => {
        console.log('profile error 2', error);
      });
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-col">
      {image && <img className="w-44 rounded-full h-40" src={image} />}
      {!image && !user?.profileImage && (
        <span className="bg-white rounded-full w-44 h-40" />
      )}
      {user?.profileImage && !unsaved && !image && (
        <img
          className="w-44 rounded-full h-40 shadow-2xl border border-gray-500"
          src={user?.profileImage}
        />
      )}
      <div className="flex gap-2">
        <form>
          <div className="flex items-center">
            <input
              type="file"
              id="custom-input"
              onChange={(e) => {
                if (e?.target?.files && e?.target?.files?.length > 0) {
                  setUnsaved(true);
                  setImageUpload(e.target.files[0]);
                  setImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              hidden
            />
            <label
              htmlFor="custom-input"
              className="block py-1 px-3
                        rounded-md border text-sm font-semibold text-primary bg-primaryDark border-primary
                      hover:bg-gray-500 cursor-pointer mt-0 mb-4"
            >
              Choose file
            </label>
          </div>
        </form>
        {unsaved && (
          <button onClick={uploadFile} className="bg-primary rounded w-32">
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
