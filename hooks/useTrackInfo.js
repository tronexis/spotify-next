import { useEffect, useState } from "react";
import { currentTrackIdState } from "./../atoms/state";
import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";

const useTrackInfo = (_) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [trackInfo, setTrackInfo] = useState(null);

  const fetchTrackInfo = async () => {
    if (currentTrackId) {
      const data = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((response) => response.json());
      setTrackInfo(data);
    }
  };

  useEffect(() => {
    fetchTrackInfo();
  }, [currentTrackId, spotifyApi]);
  console.log("track info", trackInfo);
  return trackInfo;
};

export default useTrackInfo;
