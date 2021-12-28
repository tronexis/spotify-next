import { useSession } from "next-auth/react";
import tw, { styled } from "twin.macro";
import { Cover } from "../styles";
import useSpotify from "./../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "./../atoms/state";
import { useRecoilState } from "recoil";
import useTrackInfo from "./../hooks/useTrackInfo";
import { useCallback, useEffect, useState } from "react";
import { HiFastForward, HiPause, HiPlay, HiRewind } from "react-icons/hi";
import {
  IoRepeat,
  IoShuffle,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { setSize } from "./../styles/index";
import { debounce } from "lodash";

const Player = (_) => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const trackInfo = useTrackInfo();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(100);

  const fetchCurrentTrack = () => {
    if (!trackInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("current track", data);
        setCurrentTrackId(data?.body?.item?.id);
      });
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        console.log("current playback state", data);
        setIsPlaying(data?.body?.is_playing);
      });
    }
  };

  const handlePlayback = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log("Something wrong happened!");
      });
    }, 100),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
    }
  }, [session, spotifyApi, currentTrackId, trackInfo, isPlaying]);

  useEffect(() => {
    debouncedAdjustVolume(volume);
  }, [volume]);

  return (
    <Container>
      <Section>
        <Cover
          size={14}
          src={trackInfo?.album?.images?.[0]?.url}
          alt={trackInfo?.name}
        />
        <TrackInfo>
          <TrackName>{trackInfo?.name}</TrackName>
          <TrackArtists>
            {trackInfo?.artists.map((artist) => artist.name).join(", ")}
          </TrackArtists>
        </TrackInfo>
      </Section>
      <Section>
        <Button icon={IoShuffle} />
        <Button icon={HiRewind} />
        <Button
          onClick={handlePlayback}
          icon={isPlaying ? HiPause : HiPlay}
          size={10}
        />
        <Button icon={HiFastForward} />
        <Button icon={IoRepeat} />
      </Section>
      <Section>
        <VolumeIcon
          icon={
            volume === 0
              ? IoVolumeMute
              : volume <= 30
              ? IoVolumeLow
              : volume > 70
              ? IoVolumeHigh
              : IoVolumeMedium
          }
        />
        <VolumeSlider
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  ${tw`sticky bottom-0 flex md:grid md:grid-cols-3 p-4 pt-20 md:pt-12 font-semibold text-gray-500 pointer-events-none`}
  ${tw`bg-gradient-to-t from-black via-black/90`}
`;

const Section = styled.section`
  ${tw`flex gap-x-4 items-center pointer-events-auto`}
  ${(_) => _.hidden && tw`hidden`}
  :nth-of-type(1) {
    ${tw`flex-grow`}
  }
  :nth-of-type(2) {
    ${tw`justify-end md:justify-center gap-6`}
  }
  :nth-of-type(3) {
    ${tw`hidden md:flex md:justify-end`}
  }
`;

const Button = styled(({ icon: Icon, ..._ }) => (
  <button {..._}>{!!Icon && <Icon />}</button>
))`
  ${tw`text-white hover:scale-125 transition`}
  svg {
    ${(_) => setSize(_.size || 6)}
  }
  :not(:nth-of-type(3)) {
    ${tw`hidden md:inline-flex`}
  }
`;

const TrackInfo = styled.div`
  ${tw``}
`;

const TrackName = styled.h3`
  ${tw`text-white`}
`;

const TrackArtists = styled.p`
  ${tw``}
`;

const VolumeIcon = styled(({ icon: Icon, ..._ }) => <Icon {..._} />)`
  ${tw`text-white`}
  ${(_) => setSize(_.size || 6)}
`;

const VolumeSlider = styled((_) => (
  <input type="range" min={0} max={100} {..._} />
))`
  ${tw`w-24`}
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${tw`w-10 h-20`}
  }
`;

export default Player;
