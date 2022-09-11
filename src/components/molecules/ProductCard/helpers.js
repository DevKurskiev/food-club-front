import axios from "axios";
import * as constants from "@store/constants/index";

export const handleUpdateToBasket = (e, id, action, currentUser, dispatch) => {
  // action === "added" &&
  //   axios
  //     .post("/users/added-to-basket", { userId: currentUser?.userId, id })
  //     .then((res) => {
  // dispatch({
  //   type: constants.CURRENTUSER,
  //   payload: res?.data,
  // });
  //     });

  console.log("currentUser", currentUser);
};
