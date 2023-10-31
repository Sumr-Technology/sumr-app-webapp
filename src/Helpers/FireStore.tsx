import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  arrayUnion,
  documentId,
  getDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase";
import { User } from "../Types/User";
import { Playlist } from "../Types/Playlist";

export async function createUser(
  email: string,
  uid: string,
  name: string | null,
  username: string | null,
) {
  await setDoc(doc(db, "Users", uid), {
    email,
    uid,
    likes: [],
    interestList: [],
    name: name ?? "",
    username: username ?? "",
  });
  return await createPlaylist("Favourites", "Your favourites sumrs", uid);
}

export async function updateUserImage(userId: string, profileImage: string) {
  const ref = doc(db, "Users", userId);
  return await updateDoc(ref, {
    profileImage: profileImage,
  });
}

export async function updateUserProfile(
  userid: string,
  data: { name: string; username: string; dob: string },
) {
  const ref = doc(db, "Users", userid);
  return await updateDoc(ref, {
    name: data.name,
    username: data.username,
    dob: data.dob,
  });
}

export async function getCurrentUser(userid: string) {
  const ref = doc(db, "Users", userid);
  const user = (await getDoc(ref)).data();
  return user as User;
}

export async function likeSumr(userId: string, sumrId: string) {}

export async function chooseInterest(interest: string[], userId: string) {
  const ref = doc(db, "Users", userId);
  return await updateDoc(ref, {
    interestList: [...interest],
  });
}

export async function getUserPlaylists(userid: string) {
  const ref = collection(db, "playlists");
  const _query = query(ref, where("userid", "==", userid));
  const playlists = await getDocs(_query).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return newData;
  });
  return playlists as Playlist[];
}

export async function getPlaylist(playlistId: string) {
  const ref = doc(db, "playlists", playlistId);
  const playlist = (await getDoc(ref)).data();
  return playlist as Playlist;
}

export async function createPlaylist(
  name: string,
  description: string,
  userid: string,
) {
  const ref = collection(db, "playlists");
  return await setDoc(doc(ref), {
    name: name,
    description,
    userid,
    sumrs: [],
  });
}

export async function removeFromPlaylist(playlistId: string, sumrId: string) {
  const ref = doc(db, "playlists", playlistId);
  return await updateDoc(ref, {
    sumrs: arrayRemove(sumrId),
  });
}

export async function deletePlaylist(playlistId: string) {
  await deleteDoc(doc(db, "playlists", playlistId));
}

export async function addToPlaylist(playlistId: string, sumrId: string) {
  const ref = doc(db, "playlists", playlistId);
  return await updateDoc(ref, {
    sumrs: arrayUnion(sumrId),
  });
}
