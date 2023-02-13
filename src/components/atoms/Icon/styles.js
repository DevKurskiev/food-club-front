import styled, { css } from "styled-components";

export const IconSvg = styled.svg`
  width: ${(props) => (props.iconSize ? props.iconSize + "px" : "inherit")};
  height: ${(props) => (props.iconSize ? props.iconSize + "px" : "inherit")};
  cursor: pointer;

  ${(props) =>
    props.$rightTop &&
    css`
      position: absolute;
      right: 0;
      top: -30px;
    `}
`;
