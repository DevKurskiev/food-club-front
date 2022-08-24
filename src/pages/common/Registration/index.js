import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Form } from "@molecules";
import { Page } from "@organisms";

import { registrationFormData } from "./helpers";

function Registration() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState([]);
  const [formData, setFormData] = useState(registrationFormData);
  const [userData, setUserData] = useState({
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
      ? axios
          .post("/users/create", userData)
          .then((res) => console.log(res.data)) &&
        toast.success("Вы успешно зарегистрировались!") &&
        navigate("/products")
      : toast.error("Заполните все поля!");
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <ToastContainer />
      <Page $row>
        <Form
          options={formData}
          onClick={handleCreateUser}
          buttonText="Зарегистрироваться"
          dataValue={userData}
          // disable={isError.length > 0}
        />
      </Page>
    </>
  );
}

export default Registration;
