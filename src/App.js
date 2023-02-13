import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import * as constants from "@store/constants/index";
import RequireAuth from "@hoc/RequireAuth";
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

function App() {
  const currentUser = useSelector((store) => store.currentUser);
  // const userId = localStorage.getItem('foodClubUserId')
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("foodClubUserId") && !currentUser.userId) {
      axios
        .post("/users/take", { userId: localStorage.getItem("foodClubUserId") })
        .then((res) =>
          dispatch({ type: constants.CURRENTUSER, payload: res.data })
        );
    }
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navigate to="/products" />
            </RequireAuth>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/products"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route
          path="/product/:cafeId"
          element={
            <RequireAuth>
              <Product />
            </RequireAuth>
          }
        />
        <Route
          path="/basket"
          element={
            <RequireAuth>
              <Basket />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <NotFound />
            </RequireAuth>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
