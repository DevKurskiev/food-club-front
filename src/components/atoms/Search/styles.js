import styled, { css } from "styled-components";
import DebounceInput from "react-debounce-input";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.palette.primary};
  border-radius: 5px;
  padding: 3px 5px;
  background: ${theme.palette.default};

  @media ${breakpoint.sm} {
    width: 80%;
    margin-left: auto;
    margin-top: 24px;
  }
`;

export const SearchItem = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.palette.default};

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SearchInput = styled(DebounceInput)`
  height: 30px;
  width: 100%;
  outline: none;
  font-size: 23px;
  color: ${theme.palette.primary};
  border: none;
  background: ${theme.palette.default};

  @media ${breakpoint.sm} {
    font-size: 15px;
  }
`;

export const SearchButton = styled.button`
  background: ${theme.palette.default};
  border: none;
  height: 100%;
  width: 40px;
  margin-right: -5px;
  cursor: pointer;
`;
