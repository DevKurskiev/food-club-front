import styled, { css } from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile || props.isNotSearch ? "1fr 1fr" : "1fr 3fr 1fr"};
  align-items: center;
  background: ${theme.palette.default};
  gap: 10px;
  border-bottom: 1px solid ${theme.palette.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  padding: 0 13px;
  z-index: 99;

  ${(props) =>
    props.$flex &&
    css`
      display: flex;
      justify-content: space-between;
      gap: 6px;
    `}
`;

export const HeaderItem = styled.div`
  ${(props) =>
    props.$flex &&
    css`
      display: flex;
      justify-content: flex-end;
      gap: 6px;
    `}
`;

export const HeaderIconParent = styled.div`
  cursor: pointer;
  width: 64px;
  height: 64px;

  @media ${breakpoint.sm} {
    width: 50px;
    height: 50px;
  }
`;
