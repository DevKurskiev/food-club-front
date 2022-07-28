import styled from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const RadioContainer = styled.div`
  display: flex;
  gap: ${(props) => (props.small ? "10px" : "20px")};
  margin-top: ${(props) => props.mt && "50px"};

  @media ${breakpoint.sm} {
    margin-top: ${(props) => props.mt && "24px"};
  }
`;

export const RadioItem = styled.div`
  font-size: ${(props) => (props.small ? "16px" : "36px")};
  width: fit-content;

  @media ${breakpoint.sm} {
    font-size: ${(props) => (props.small ? "10px" : "20px")};
  }

  label {
    border: 2px solid ${theme.palette.default};
  }
`;

export const RadioItemInput = styled.input`
  &[type="radio"] {
    display: none;
  }

  &[type="radio"]:checked + label {
    border: 2px solid ${theme.palette.primary};
    background: ${theme.palette.default};
    color: ${theme.palette.primary};
  }
`;

export const RadioItemTitle = styled.label`
  display: inline-block;
  cursor: pointer;
  padding: 5px 13px;
  line-height: 34px;
  border-radius: 6px;
  user-select: none;

  &:hover {
    color: ${theme.palette.disable};
  }

  @media ${breakpoint.sm} {
    padding: ${(props) => (props.small ? "5px 7px" : "6px 14px")};
  }
`;
