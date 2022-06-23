import styled from "styled-components";

import breakpoints from "@utils/media";

export const PageContainer = styled.div`
  padding: 0 100px;

  @media ${breakpoints.md} {
    padding: 0 30px;
  }

  @media ${breakpoints.sm} {
    padding: 0 10px 50px;
  }
`;
