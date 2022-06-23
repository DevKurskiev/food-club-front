import styled from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const EstablishmentCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const EstablishmentCardsItem = styled.div`
  border-radius: 10px;
  margin-top: 26px;
  width: 350px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media ${breakpoint.sm} {
    margin: 26px auto 0;
  }

  @media ${breakpoint.xss} {
    width: 300px;
  }
`;

export const EstablishmentCardsImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const EstablishmentCardsName = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 7px;
`;

export const EstablishmentCardsSubtitle = styled.div`
  font-size: 13px;
  color: ${theme.palette.disable};
  padding: 0 7px 12px 7px;
`;
