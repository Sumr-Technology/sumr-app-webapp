import { useEffect, useState } from 'react';
import { likeSumr, removeFromPlaylist } from '../../../Helpers/FireStore';
import { Sumr } from '../../../Types/Sumrs';
import { User } from '../../../Types/User';
import Favorite from '../../../assets/icons/favorite.svg';
import FavoriteBorder from '../../../assets/icons/favorite_border.svg';
import Send from '../../../assets/icons/send.svg';
import AddToPlaylistModal from '../../Playlists/AddToPlaylistModal';
import FullSumrModal from './FullSumrModal';
import { getSumrBanner } from '../../../Helpers/Banners';

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
  const [banner, setBanner] = useState('');

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
    await likeSumr(user?.uid ?? '', data._id, !isLiked);
    setIsLiked(!isLiked);
  }

  async function _getBanner() {
    let _banner = await getSumrBanner(data);
    setBanner(_banner);
  }

  let _date = new Date(data?.date).toISOString().split('T')[0];

  return (
    <div className="-mt-12 lg1:-mx-20 lg2:-mx-32 -mx-12 h-full">
      <div className="flex text-white mb-5 pb-10 pt-4 px-5 gap-4 flex-col-reverse md:flex-row rounded-lg justify-between">
        {/* Container for Title + Text */}
        <div className="flex flex-col w-full md:w-3/5 gap-2">
          {/* Post title */}
          <span className="font-semibold text-center text-xl">
            {data?.title}
          </span>
          {/* Post Text */}
          <span className="font-normal px-1 text-gray-300 text-start text-lg">
            {data?.sumr.substring(0, 420)}
            {data?.sumr?.length > 420 ? '...' : ''}
            <div className="flex w-full justify-center">
              <FullSumrModal data={data} />
            </div>
          </span>
        </div>

        {/* Right Side Container */}
        <div className="flex flex-col w-full md:w-2/5 ">
          {/* Banner */}
          <div className="flex flex-col w-full">
            <img
              className="w-full h-24 md:h-28 object-cover rounded-lg"
              src={banner}
            />
            {/* Date */}
            <span className="flex my-2 justify-end">{_date}</span>
            {/* Categories */}
            <div className="flex flex-wrap items-baseline space-y-1 gap-2 w-fit">
              {data?.tag?.map((t) => (
                <div
                  key={t}
                  className="border-[0.5px] border-slate-400 px-3 py-1 rounded-lg"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Buttons Section */}
            <section className="flex flex-col justify-between mt-4 md:mt-28">
              <div className="flex items-center -m-1.5 pl-3 gap-4">
                <AddToPlaylistModal data={data} />
                <img
                  onClick={handleLike}
                  className="md:w-7 w-6 cursor-pointer"
                  src={isLiked ? Favorite : FavoriteBorder}
                />
                <img className="w-6 md:w-7" src={Send} />
                <a
                  target="_blank"
                  className="flex-1 text-primary text-end pr-5 md:pr-3"
                  href={data.url}
                >
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
            </section>
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-gray-600 z-100 mb-10 -mt-10 pb-3" />
    </div>
  );
}
