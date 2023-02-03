import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Routes, Route, Navigate } from "react-router-dom";

import * as constants from "@store/constants/index";
// import UseUserRoles from "@hooks/useUserRoles";

import { GlobalStyle } from "./globalStyles";

import {
  Products,
  Product,
  Registration,
  Login,
  Basket,
  Logout,
  NotFound,
} from "@pages/common";
// import { MainAdmin } from "@pages/admin";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { decodedToken } = useJwt(cookies.foodClubUserToken);
  const currentUser = useSelector((store) => store.currentUser);
  // const { isUser, isAdmin } = UseUserRoles();

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
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/basket" element={<Basket />} />
        {/* {isAdmin && <Route path="/product" element={<MainAdmin />} />} */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
