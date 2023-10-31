import { Sumr } from "../../../Types/Sumrs";
import Favorite from "../../../assets/icons/favorite.svg";
import Send from "../../../assets/icons/send.svg";
import AddToPlaylisModal from "../../Playlists/AddToPlaylistModal";

export default function SumrFeedCard({ data }: { data: Sumr }) {
  return (
    <div>
      <div className="flex text-white  border pb-5 pt-7 px-7 gap-5 bg-primaryDark flex-col rounded-lg">
        <div className="gap-3 flex flex-col">
          <img
            className="h-44 object-none rounded-lg"
            src={
              "https://venturebeat.com/wp-content/uploads/2023/10/Firefly-A-field-full-of-fireflies-atop-a-city-building-67568.jpg?fit=750%2C429&strip=all"
            }
          />
        </div>

        <span className="font-semibold text-center text-xl">{data?.title}</span>
        <span className="font-normal px-3 text-gray-300">
          {data?.sumr.substring(0, 350)}
          {data?.sumr?.length > 350 ? "..." : ""}
        </span>
        <div className="flex pl-3 gap-4">
          <AddToPlaylisModal data={data} />
          <img className="w-5" src={Favorite} />
          <img className="w-5" src={Send} />
        </div>
      </div>
    </div>
  );
}

// Increment global counter
// Add to favorites
