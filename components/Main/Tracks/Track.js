import prettyMilliseconds from "pretty-ms";
import tw, { styled } from "twin.macro";
import $ from "../../../styles";
import useSpotify from "./../../../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "./../../../atoms/state";
import { useRecoilState } from "recoil";

const Track = (_) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playTrack = () => {
    setCurrentTrackId(_.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [_.uri],
    });
  };

  return (
    <Container onClick={playTrack}>
      <Section>
        <Number>{_.order + 1}</Number>
        <Cover size="10" src={_.album?.images?.[0]?.url} alt={_.name} />
        <InfoGroup>
          <Name>{_.name}</Name>
          <Artists>{_.artists.map((artist) => artist.name).join(", ")}</Artists>
        </InfoGroup>
      </Section>
      <Section>
        <Album>{_.album.name}</Album>
        <Duration>
          {prettyMilliseconds(_.duration_ms, {
            colonNotation: true,
            secondsDecimalDigits: 0,
          })}
        </Duration>
      </Section>
    </Container>
  );
};

const Container = styled.li`
  ${tw`flex md:grid md:grid-cols-2 gap-4 items-center py-3 px-4 font-semibold rounded-md text-gray-500 hover:bg-gray-900 cursor-pointer`}
`;

const Section = styled.div`
  ${tw`flex items-center gap-x-4`}
  :nth-of-type(1) {
    ${tw`flex-grow`}
  }
  :nth-of-type(2) {
    ${tw`justify-between`}
  }
`;

const Number = styled.p`
  ${tw`min-w-[1.1rem] hidden md:inline-flex`}
`;

const Cover = styled($.Cover)`
  ${tw``}
`;

const InfoGroup = styled.div`
  ${tw``}
`;

const Name = styled.h3`
  ${tw`text-white`}
`;

const Artists = styled.p`
  ${tw``}
`;

const Album = styled.p`
  ${tw`hidden md:inline-flex`}
`;

const Duration = styled.p`
  ${tw``}
`;

export default Track;
