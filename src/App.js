import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { GlobalStyle } from "./globalStyles";

import { Main, Product, Registration } from "@pages/common";
import { NotFound } from "@atoms";
import store from "@store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <GlobalStyle />
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/products" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Fragment>
  );
}

export default App;
