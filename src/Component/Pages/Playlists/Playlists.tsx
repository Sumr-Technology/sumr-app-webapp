import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sumr } from '../../../Types/Sumrs';
import { getPlaylist } from '../../../Helpers/FireStore';
import { Playlist } from '../../../Types/Playlist';
import { apiGETCall } from '../../../Helpers/Service';
import SumrFeedCard from '../Dashboard/SumrFeedCard';
import FilterSidebar from '../../Layout/Sidebar/FilterSidebar';
import { useUser } from '../../../Layout/DefaultLayout';

function Playlists() {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('id');
  const [playlist, setPlaylist] = useState<Playlist | null>();
  const [sumrs, setSumrs] = useState<Sumr[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (playlistId) {
      getPlaylist(playlistId).then((p) => {
        setPlaylist(p);
      });
    }
  }, [playlistId]);

  useEffect(() => {
    if (playlist) {
      apiGETCall(
        '/api/sumrs/playlist?ids=' + `${JSON.stringify(playlist?.sumrs)}`
      ).then((r: Sumr[]) => {
        setSumrs(r);
      });
    }
  }, [playlist]);

  function refetchPlaylist() {
    getPlaylist(playlistId ?? '').then((p) => {
      setPlaylist(p);
    });
  }

  return (
    <div className="flex gap-20 flex-col items-center">
      <FilterSidebar currentPlaylistId={playlistId} hideCategories={true} />
      <span className="font-semibold text-white text-4xl pl-10 ">
        {playlist?.name}
      </span>
      <div className="flex px-10 flex-col gap-6">
        {sumrs?.map((sm, i) => {
          return (
            <SumrFeedCard
              user={user}
              playlistId={playlistId}
              onRemoveFromPlaylist={() => {
                refetchPlaylist();
              }}
              key={i}
              data={sm}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
