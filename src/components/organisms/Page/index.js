import React, { Fragment } from "react";

import { PageContainer } from "./styles";

const Page = ({ children, ...rest }) => {
  return (
    <Fragment>
      <PageContainer {...rest}>{children}</PageContainer>
    </Fragment>
  );
};

export default Page;
