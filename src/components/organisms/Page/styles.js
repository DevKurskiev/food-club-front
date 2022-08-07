import styled from "styled-components";

import breakpoints from "@utils/media";

export const PageContainer = styled.div`
  padding: 70px 13px 0 13px;

  @media ${breakpoints.md} {
    padding: 70px 30px 0 30px;
  }

  @media ${breakpoints.sm} {
    padding: 50px 10px;
  }
`;
