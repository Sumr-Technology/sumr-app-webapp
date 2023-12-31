import { useEffect, useState } from "react";
import { likeSumr, removeFromPlaylist } from "../../../Helpers/FireStore";
import { Sumr } from "../../../Types/Sumrs";
import { User } from "../../../Types/User";
import Favorite from "../../../assets/icons/favorite.svg";
import FavoriteBorder from "../../../assets/icons/favorite_border.svg";
import Send from "../../../assets/icons/send.svg";
import AddToPlaylisModal from "../../Playlists/AddToPlaylistModal";
import FullSumrModal from "./FullSumrModal";
import { getSumrBanner } from "../../../Helpers/Banners";

export default function SumrFeedCard({
  data,
  onRemoveFromPlaylist,
  playlistId,
  user,
}: {
  data: Sumr;
  onRemoveFromPlaylist?: () => void;
  playlistId?: string | null;
  user: User | null;
}) {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [banner, setBanner] = useState("");

  async function handleRemoveFromPlaylist() {
    if (playlistId && onRemoveFromPlaylist) {
      await removeFromPlaylist(playlistId, data?._id);
      onRemoveFromPlaylist();
    }
  }

  useEffect(() => {
    if (user) {
      const isFound = user?.likes?.find((l) => l === data._id);
      setIsLiked(isFound !== undefined);
    }
    _getBanner();
  }, [user]);

  async function handleLike() {
    await likeSumr(user?.uid ?? "", data._id, !isLiked);
    setIsLiked(!isLiked);
  }

  async function _getBanner() {
    let _banner = await getSumrBanner(data);
    setBanner(_banner);
  }

  let _date = new Date(data?.date).toISOString().split("T")[0];

  return (
    <div>
      <div className="flex text-white mb-5 border pb-5 pt-7 px-7 gap-5 bg-primaryDark flex-col rounded-lg">
        <span className="self-end -my-3">{_date}</span>
        <div className="gap-3 flex flex-col">
          <img className="h-44 object-cover rounded-lg" src={banner} />
        </div>

        <span className="font-semibold text-center text-xl">{data?.title}</span>
        <span className="font-normal px-3 text-gray-300">
          {data?.sumr.substring(0, 350)}
          {data?.sumr?.length > 350 ? "..." : ""}
          <div className="flex w-full justify-center">
            <FullSumrModal data={data} />
          </div>
        </span>
        <div className="flex justify-between">
          <div className="flex items-center -m-1.5 pl-3 gap-4">
            <AddToPlaylisModal data={data} />
            <img
              onClick={handleLike}
              className="w-5 cursor-pointer"
              src={isLiked ? Favorite : FavoriteBorder}
            />
            <img className="w-5" src={Send} />
            <a target="_blank" className="text-primary" href={data.url}>
              View original
            </a>
          </div>
          {playlistId && (
            <button
              onClick={handleRemoveFromPlaylist}
              className="text-primary justify-self-end"
            >
              Remove from playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
