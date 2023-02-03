import styled from "styled-components";

import breakpoints from "@utils/media";
import { theme } from "@theme";

export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100%;

  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 0;
  }
`;

export const NotFoundIcon = styled.img`
  max-width: 400px;

  @media ${breakpoints.md} {
    max-width: 300px;
  }

  @media ${breakpoints.sm} {
    max-width: 200px;
  }
`;

export const NotFoundItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const NotFoundTitle = styled.p`
  font-size: 48px;
  text-align: center;
  color: ${theme.palette.primary};

  @media ${breakpoints.md} {
    font-size: 38px;
  }

  @media ${breakpoints.sm} {
    font-size: 28px;
  }
`;
