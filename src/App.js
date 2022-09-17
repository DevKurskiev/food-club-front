import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import * as constants from "@store/constants/index";
import UseUserRoles from "@hooks/useUserRoles";

import { GlobalStyle } from "./globalStyles";

import {
  Main,
  Product,
  Registration,
  Login,
  Basket,
  Logout,
} from "@pages/common";
import { MainAdmin } from "@pages/admin";
import { NotFound } from "@atoms";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { decodedToken } = useJwt(cookies.foodClubUserToken);
  const currentUser = useSelector((store) => store.currentUser);
  const { isUser, isAdmin } = UseUserRoles();

  useEffect(() => {
    !cookies.foodClubUserToken &&
      axios.post("/users/create").then(() => window.location.reload());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Route path="/logout" element={<Logout />} />
        {isUser && <Route path="/products" element={<Main />} />}
        {isUser && <Route path="/product/:id" element={<Product />} />}
        {isUser && <Route path="/basket" element={<Basket />} />}
        {isAdmin && <Route path="/product" element={<MainAdmin />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
