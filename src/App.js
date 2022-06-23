import React, { Fragment } from "react";
import { Main } from "@pages/common";
import { GlobalStyle } from "./globalStyles";

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Main />
    </Fragment>
  );
}

export default App;
