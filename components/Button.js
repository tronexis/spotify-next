import tw, { styled } from "twin.macro";

const Button = (_) => {
  return <Container {..._}>{_.children}</Container>;
};

const Container = styled.button`
  ${tw`rounded-full px-5 py-3 font-semibold text-white`}
  ${(_) => _.color === "primary" && tw`bg-[#1C6]`}
`;

export default Button;
