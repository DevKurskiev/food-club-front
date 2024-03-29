import { createStore } from "redux";

import * as constants from "@store/constants/index";

const initialState = {
  currentUser: {},
  chooseProduct: { category: "cafe", name: "" },
  chooseProductType: { category: "all" },
};

function myReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case constants.CURRENTUSER:
      return {
        ...state,
        currentUser: payload,
      };
    case constants.PRODUCT:
      return {
        ...state,
        chooseProduct: payload,
      };
    case constants.PRODUCTTYPE:
      return {
        ...state,
        chooseProductType: payload,
      };

    default:
      return state;
  }
}

export default createStore(myReducer);
