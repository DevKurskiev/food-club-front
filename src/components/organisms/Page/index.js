import React, { Fragment } from "react";

import { PageContainer } from "./styles";

const Page = ({ children }) => {
  return (
    <Fragment>
      <PageContainer>{children}</PageContainer>
    </Fragment>
  );
};

export default Page;
