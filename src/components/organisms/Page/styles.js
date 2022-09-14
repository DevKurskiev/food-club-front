import styled, { css } from "styled-components";

import breakpoints from "@utils/media";

export const PageContainer = styled.div`
  padding: 70px 13px 0 13px;

  @media ${breakpoints.md} {
    padding: 70px 30px 0 30px;
  }

  @media ${breakpoints.sm} {
    padding: 50px 10px;
  }

  ${(props) =>
    props.$center &&
    css`
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    `}

  ${(props) =>
    props.$row &&
    css`
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    `}
  
  ${(props) =>
    props.$column &&
    css`
      display: flex;
      flex-direction: column;
    `}
  
  ${(props) =>
    props.$withoutPadding &&
    css`
      padding: 0;
    `}
`;
