import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Typography } from "@atoms";
import { Form } from "@molecules";
import { Page } from "@organisms";
import { loginFormData } from "./helpers";

function Login() {
  const [formData, setFormData] = useState(loginFormData);
  const [isError, setIsError] = useState([]);
  const [userData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleCreateUser = (userData) => {
    let inputError = isError;
    let formDataWithError = formData;

    toast.dismiss();

    // eslint-disable-next-line array-callback-return
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
          !!res.data > 0 &&
          bcrypt.compareSync(userData.password, res.data.password)
            ? navigate("/products") &&
              toast.success("Вы успешно вошли в аккаунт!")
            : toast.error("Неправильный email или пароль!");
        })
      : toast.error("Заполните все поля!");
  };

  return (
    <>
      <ToastContainer />
      <Page $column $center>
        <Form
          options={formData}
          onClick={handleCreateUser}
          buttonText="Вход"
          title="Вход"
          dataValue={userData}
        />
        <Typography.Paragraph>
          Нет аккаунта? <a href="/registration">Зарегистрируйтесь!</a>
        </Typography.Paragraph>
      </Page>
    </>
  );
}

export default Login;
