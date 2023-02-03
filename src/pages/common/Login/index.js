import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Typography } from "@atoms";
import { Form } from "@molecules";
import { Page } from "@organisms";
import { loginFormData } from "./helpers";

function Login() {
  const [userData] = useState({
    email: "",
    password: "",
  });

  const handleLoginUser = (userData) => {
    let isError = Object.values(userData).includes("");

    if (isError) {
      toast.error("Заполните все поля!");
    } else {
      axios.post("users/login", userData);
      window.location.replace("/products");
    }
  };

  return (
    <>
      <ToastContainer />
      <Page $column $center>
        <Form
          options={loginFormData}
          onClick={handleLoginUser}
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
