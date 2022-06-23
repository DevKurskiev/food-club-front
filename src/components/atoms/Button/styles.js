import styled, { css } from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonItem = styled.button`
  padding: 8px 18px;
  border-radius: 7px;
  border: none;
  background: ${theme.palette.primary};
  color: ${theme.palette.default};
  font-size: 20px;

  ${(props) =>
    props.$light &&
    css`
      border: 1px solid ${theme.palette.primary};
      background: ${theme.palette.default};
      color: ${theme.palette.primary};
    `}

  @media ${breakpoint.sm} {
    padding: 4px 18px;
  }
`;
