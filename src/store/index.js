import { createStore } from "redux";

import * as constants from "@store/constants/product";

const initialState = {
  chooseProduct: { category: "cafe", name: "" },
  chooseProductType: { category: "all" },
};

function myReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
