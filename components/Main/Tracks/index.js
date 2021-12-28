import tw, { styled } from 'twin.macro';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../../../atoms/state';
import Track from './Track';
import { tracksState } from '../../../atoms/state';

const Tracks = (_) => {
  const playlist = useRecoilValue(playlistState);

  return (
    <Container>
      {playlist?.tracks.items.map((_, key) => <Track key={key} order={key} {..._.track} />)}
    </Container>
  )
};

const Container = styled.ul`
  ${tw`p-6 pb-24 space-y-4`}
`;

export default Tracks;