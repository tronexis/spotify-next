import tw, { styled } from "twin.macro";

export const setSize = (size) => `
  width: ${size / 4}rem;
  height: ${size / 4}rem;
`;

export const Cover = styled.img`
  ${tw``}
  ${(_) => setSize(_.size)}
`;

export default { setSize, Cover };
