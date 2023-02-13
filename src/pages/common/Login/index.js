import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Typography } from "@atoms";
import { Form } from "@molecules";
import { Page } from "@organisms";
import { loginFormData } from "./helpers";

function Login() {
  const [userData] = useState({
    email: "",
    password: "",
  });

  const handleLoginUser = async (userData) => {
    let isError = Object.values(userData).includes("");

    if (isError) {
      toast.error("Заполните все поля!");
    } else {
      await axios.post("users/login", userData).then((res) => {
        if (res.data.error === null) {
          localStorage.setItem("foodClubUserId", res.data.userId);
          window.location.replace("/products");
        } else {
          toast.error(res.data.error);
        }
      });
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
