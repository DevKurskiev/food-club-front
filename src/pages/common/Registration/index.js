import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Typography } from "@atoms";
import { Form } from "@molecules";
import { Page } from "@organisms";

import { registrationFormData } from "./helpers";

function Registration() {
  const [userData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleCreateUser = async (userData) => {
    let isError = Object.values(userData).includes("");

    if (isError) {
      toast.error("Заполните все поля!");
    } else if (userData.password !== userData.repeatPassword) {
      toast.error("Пароли не совпадают!");
    } else {
      await axios.post("users/create", userData).then((res) => {
        res.data !== "success"
          ? toast.error(res.data)
          : window.location.replace("/products");
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Page $column $center>
        <Form
          options={registrationFormData}
          onClick={handleCreateUser}
          buttonText="Зарегистрироваться"
          title="Зарегистрироваться"
          dataValue={userData}
        />
        <Typography.Paragraph>
          Уже есть аккаунт? <a href="/login">Войти!</a>
        </Typography.Paragraph>
      </Page>
    </>
  );
}

export default Registration;
