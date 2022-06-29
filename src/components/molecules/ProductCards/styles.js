import styled from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const ProductCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ProductCardsItem = styled.div`
  border-radius: 10px;
  margin: 26px auto 0 0;
  width: 350px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media ${breakpoint.sm} {
    margin: 26px auto 0;
  }

  @media ${breakpoint.xss} {
    width: 300px;
  }
`;

export const ProductCardsImage = styled.img`
  width: 100%;
  height: 172px;
  border-radius: 10px;
`;

export const ProductCardsName = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 7px;
`;

export const ProductCardsSubtitle = styled.div`
  font-size: 13px;
  color: ${theme.palette.disable};
  padding: 0 7px 12px 7px;
`;
