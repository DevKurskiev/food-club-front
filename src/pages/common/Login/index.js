import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as constants from "@store/constants/product";
import { Form } from "@molecules";
import { Page } from "@organisms";
import { loginFormData } from "./helpers";

function Login() {
  const [formData, setFormData] = useState(loginFormData);
  const [isError, setIsError] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const currentUser = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateUser = (userData) => {
    let inputError = isError;
    let formDataWithError = formData;

    toast.dismiss();

    Object.keys(userData).some((el) => {
      let index = isError.indexOf(el);

      userData[el].length === 0 && !inputError.includes(el)
        ? inputError.push(el)
        : userData[el].length !== 0 &&
          inputError.includes(el) &&
          inputError.splice(index, 1);
    });

    setIsError(inputError);

    formDataWithError.forEach((el, i) => {
      el.error = isError.includes(el.name) ? true : false;
      setFormData([...formDataWithError]);
    });

    isError.length === 0
      ? axios.post("/users/login", userData).then((res) => {
          res.data.length > 0 &&
          bcrypt.compareSync(userData.password, res.data[0].password)
            ? dispatch({
                type: constants.CURRENTUSER,
                payload: res.data[0],
              }) &&
              navigate("/products") &&
              toast.success("Вы успешно вошли в аккаунт!")
            : toast.error("Неправильный email или пароль!");
        })
      : toast.error("Заполните все поля!");
  };

  useEffect(() => {
    console.log("CurrentUser", currentUser);
  }, [currentUser]);

  return (
    <>
      <ToastContainer />
      <Page $row>
        <Form
          options={formData}
          onClick={handleCreateUser}
          buttonText="Вход"
          title="Вход"
          dataValue={userData}
        />
      </Page>
    </>
  );
}

export default Login;
