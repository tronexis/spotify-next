import tw, { styled } from "twin.macro";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineLibrary,
  HiOutlinePlusCircle,
  HiOutlineRss,
  HiOutlineSearch,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "./../hooks/useSpotify";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/state";

const Sidebar = (_) => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(({ body: { items: playlists } }) => {
        setPlaylists(playlists);
      });
    }
  }, [session, spotifyApi]);

  return (
    <Container>
      <Section>
        <Link icon={HiOutlineHome}>Home</Link>
        <Link icon={HiOutlineSearch}>Search</Link>
        <Link icon={HiOutlineLibrary}>Your Library</Link>
      </Section>
      <Section>
        <Link icon={HiOutlinePlusCircle}>Create Playlist</Link>
        <Link icon={HiOutlineHeart}>Liked Songs</Link>
        <Link icon={HiOutlineRss}>Your Episodes</Link>
      </Section>
      <Section>
        {playlists.map((_, key) => (
          <Link key={key} onClick={() => setPlaylistId(_.id)}>
            {_.name}
          </Link>
        ))}
      </Section>
    </Container>
  );
};

const Container = styled.aside`
  ${tw`p-5 pb-24 bg-black overflow-y-scroll scrollbar-hide h-full max-w-xs hidden sm:inline-block`}
  ${tw`text-gray-500 text-sm`}
  ${tw`border-r border-gray-900`}
  p {
    ${tw`mb-[.09rem]`}
  }
`;

const Section = styled.section`
  ${tw`space-y-4`}
  :not(:last-child) {
    ${tw`pb-5 mb-5`}
    ${tw`border-b border-gray-900`}
  }
`;

const Link = styled(({ icon: Icon, ..._ }) => (
  <a href="#" {..._}>
    {!!Icon && <Icon />}
    <p>{_.children}</p>
  </a>
))`
  ${tw`flex items-center gap-2`}
  ${tw`hover:text-white transition`}
  svg {
    ${tw`h-5 w-5`}
  }
`;

export default Sidebar;
