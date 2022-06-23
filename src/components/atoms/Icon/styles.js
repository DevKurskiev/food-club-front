import styled from "styled-components";

export const IconSvg = styled.svg`
  width: ${(props) => (props.iconSize ? props.iconSize + "px" : "inherit")};
  height: ${(props) => (props.iconSize ? props.iconSize + "px" : "inherit")};
`;
