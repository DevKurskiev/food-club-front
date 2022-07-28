import React from "react";

import { LoaderItem, LoaderContainer } from "./styles";

const Loader = ({ ...props }) => {
  return (
    <LoaderContainer {...props}>
      <LoaderItem />
    </LoaderContainer>
  );
};

export default Loader;
