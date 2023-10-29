import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGETCall } from "../../../Helpers/Service";
import { Sumr } from "../../../Types/Sumrs";
import Favorite from "../../../assets/icons/favorite.svg";
import Playlist from "../../../assets/icons/playlist.svg";
import Send from "../../../assets/icons/send.svg";
import Back from "../../../assets/icons/arrow_left.svg";

const SumrDetail = () => {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState<Sumr>();

  useEffect(() => {
    apiGETCall("/api/sumrs/sumr?id=" + searchParams.get("id")).then(
      (r: Sumr) => {
        setData(r);
      },
    );
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="flex bg-primaryDark text-white flex-col gap-5">
        <div className="flex justify-between">
          <Link to={"/dashboard"}>
            <img src={Back} />
          </Link>
          <div className="flex gap-4">
            <img className="w-6" src={Playlist} />
            <img className="w-5" src={Favorite} />
            <img className="w-5" src={Send} />
          </div>
        </div>

        <img
          className="w-full h-80 object-fill rounded-lg"
          src={
            "https://venturebeat.com/wp-content/uploads/2023/10/Firefly-A-field-full-of-fireflies-atop-a-city-building-67568.jpg?fit=750%2C429&strip=all"
          }
        />
        <span className="font-semibold text-center text-xl">{data?.title}</span>
        <span>{data?.sumr}</span>
      </div>
    </>
  );
};

export default SumrDetail;
