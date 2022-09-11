import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import * as constants from "@store/constants/index";

import { GlobalStyle } from "./globalStyles";

import { Main, Product, Registration, Login } from "@pages/common";
import { NotFound } from "@atoms";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { decodedToken } = useJwt(cookies.foodClubUserToken);
  const currentUser = useSelector((store) => store.currentUser);

  useEffect(() => {
    cookies.foodClubUserToken === undefined && axios.post("/users/create");
  }, []);

  if (
    currentUser === undefined ||
    currentUser === null ||
    !Object.keys(currentUser).length
  ) {
    dispatch({
      type: constants.CURRENTUSER,
      payload: decodedToken?.doc || decodedToken?.user,
    });
  }

  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
