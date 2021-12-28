import tw, { styled } from "twin.macro";

const Brand = (_) => {
  return (
    <Logo
      src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
      alt="Spotify Logo"
      {..._}
    />
  );
};

const Logo = styled.img`
  ${tw`w-52`}
`;

export default Brand;
