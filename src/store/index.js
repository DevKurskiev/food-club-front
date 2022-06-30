import { createStore } from "redux";

import * as constants from "@store/constants/findProduct";

const initialState = {
  chooseProduct: null,
};

function myReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case constants.FIND_PRODUCT:
      return {
        ...state,
        chooseProduct: payload,
      };

    default:
      return state;
  }
}

export default createStore(myReducer);
