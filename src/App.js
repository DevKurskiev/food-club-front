import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { GlobalStyle } from "./globalStyles";

import { Main } from "@pages/common";
import store from "@store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <GlobalStyle />
        <Main />
      </Provider>
    </Fragment>
  );
}

export default App;
