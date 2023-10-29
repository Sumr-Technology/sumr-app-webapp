import { useState } from "react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../Helpers/Firebase";
import { updateUserImage } from "../../../Helpers/FireStore";

export default function ProfileImage({ userId }: { userId: string }) {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [unsaved, setUnsaved] = useState(false);

  const uploadFile = () => {
    if (imageUpload === null) {
      alert("Please select an image");
      return;
    }
    const imageRef = storageRef(storage, `profile/${userId}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            await updateUserImage(userId, url);
            setUnsaved(false);
          })
          .catch((error) => {
            console.log("profile error", error);
          });
      })
      .catch((error) => {
        console.log("profile error 2", error);
      });
  };

  return (
    <div className="flex self-start items-center justify-center gap-3 flex-col">
      {image && <img className="w-24 rounded-full h-24" src={image} />}
      {!image && <span className="bg-white rounded-full w-24 h-24" />}

      <div className="flex gap-2">
        <form>
          <div className="flex flex-row items-center">
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
              className="block text-slate-500 mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-pink-50
         hover:bg-pink-100 cursor-pointer"
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

        {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept="image/*" /> */}
      </div>
    </div>
  );
}
