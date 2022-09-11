import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Typography } from "@atoms";
import { Form } from "@molecules";
import { Page } from "@organisms";

import { registrationFormData } from "./helpers";

function Registration() {
  const navigate = useNavigate();

  const currentUser = useSelector((store) => store.currentUser);

  const [isError, setIsError] = useState([]);
  const [formData, setFormData] = useState(registrationFormData);
  const [userData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

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

      el === "repeatPassword" &&
        userData["password"] !== userData["repeatPassword"] &&
        inputError.push("repeatPassword") &&
        toast.error("Пароли не совпадают!");

      setIsError(inputError);
    });

    formDataWithError.forEach((el, i) => {
      el.error = isError.includes(el.name) ? true : false;
      setFormData([...formDataWithError]);
    });

    isError.length === 0
      ? axios.post("/users/update", {
          ...userData,
          userId: currentUser?.userId,
        }) &&
        toast.success("Вы успешно зарегистрировались!") &&
        navigate("/login")
      : toast.error("Заполните все поля!");
  };

  return (
    <>
      <ToastContainer />
      <Page $column $center>
        <Form
          options={formData}
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
