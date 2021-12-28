import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import tw, { styled, css } from "twin.macro";
import { playlistIdState, playlistState } from "../../atoms/state";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../../hooks/useSpotify";
import Tracks from "./Tracks";
import { Cover, setSize } from "../../styles";

const Main = (_) => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const colors = [
    tw`from-green-500`,
    tw`from-blue-500`,
    tw`from-red-500`,
    tw`from-yellow-500`,
    tw`from-pink-500`,
    tw`from-indigo-500`,
  ];

  useEffect(() => setColor(shuffle(colors).pop()), [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(({ body: playlist }) => setPlaylist(playlist))
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyApi, playlistId]);

  return (
    <Container>
      <Header>
        <UserTag onClick={signOut}>
          <UserImage size="10" src={session?.user.image} alt="User Image" />
          <UserName>{session?.user.name}</UserName>
          <DropdownIcon size="6" />
        </UserTag>
      </Header>
      <Hero color={color}>
        <ContentHeader>
          <Cover
            size="40"
            src={playlist?.images?.[0]?.url}
            alt={playlist?.name}
          />
          <ContentInfo>
            <Type>Playlist</Type>
            <Title>{playlist?.name || "Playlist Name"}</Title>
          </ContentInfo>
        </ContentHeader>
      </Hero>
      <Tracks />
    </Container>
  );
};

const Container = styled.main`
  ${tw`w-full overflow-y-scroll scrollbar-hide h-full`}
`;

const Header = styled.header`
  ${tw`flex p-4 justify-end fixed right-0`}
`;

const UserTag = styled.div`
  ${tw`flex gap-2 items-center cursor-pointer bg-black/80 rounded-full p-1.5 transition hover:opacity-80`}
`;

const UserImage = styled.img`
  ${tw`transition rounded-full hover:opacity-80`}
  ${(_) => setSize(_.size)}
`;

const UserName = styled.h4`
  ${tw`mb-0.5 font-bold hidden sm:inline-flex`}
`;

const DropdownIcon = styled(HiChevronDown)`
  ${tw`hidden sm:inline-flex`}
  ${(_) => setSize(_.size)}
`;

const Hero = styled.section`
  ${tw`flex items-end h-72 bg-gradient-to-b px-6`}
  ${(_) => _.color}
`;

const ContentHeader = styled.div`
  ${tw`flex gap-6 items-end`}
`;

const ContentInfo = styled.div`
  ${tw``}
`;

const Type = styled.small`
  ${tw`font-semibold uppercase text-base`}
`;

const Title = styled.h1`
  ${tw`text-4xl font-bold`}
`;

export default Main;
