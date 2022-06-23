import styled, { css } from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile ? "1fr 1fr" : "1fr 3fr 1fr"};
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${theme.palette.primary};
  position: absolute;
  top: 0;
  left: 0;
  rigth: 0;
  height: 70px;
  width: 100%;
  padding: 0 13px;
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
  width: 64px;
  height: 64px;

  @media ${breakpoint.sm} {
    width: 50px;
    height: 50px;
  }
`;
