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
  border: 1px solid ${theme.palette.primary};
  background: ${theme.palette.primary};
  color: ${theme.palette.default};
  font-size: 20px;
  cursor: pointer;

  ${(props) =>
    props.$light &&
    css`
      border: 1px solid ${theme.palette.primary};
      background: ${theme.palette.default};
      color: ${theme.palette.primary};

      &&:hover {
        border: 1px solid ${theme.palette.primary};
        background: ${theme.palette.primary};
        color: ${theme.palette.default};
      }
    `}

  ${(props) =>
    props.$none &&
    css`
      display: none;
    `}
  
  ${(props) =>
    props.$disable &&
    css`
      background: ${theme.palette.disable};
      border: 1px solid ${theme.palette.disable};
      cursor: default;
      pointer-events: none;
    `}

  @media ${breakpoint.sm} {
    padding: 4px 18px;
  }

  &:hover {
    border: ${(props) =>
      !props.hoverNone && "1px solid" + theme.palette.primary};
    background: ${(props) => !props.hoverNone && theme.palette.default};
    color: ${(props) => !props.hoverNone && theme.palette.primary};
  }
`;
