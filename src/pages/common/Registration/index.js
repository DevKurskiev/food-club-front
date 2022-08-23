import React, { useEffect, useState } from "react";
import axios from "axios";

import { Form } from "@molecules";
import { Page } from "@organisms";

import { registrationFormData } from "./helpers";

function Registration() {
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

    Object.keys(userData).some((el) => {
      let index = isError.indexOf(el);

      userData[el].length === 0 && !inputError.includes(el)
        ? inputError.push(el)
        : userData[el].length !== 0 &&
          inputError.includes(el) &&
          inputError.splice(index, 1);

      el === "repeatPassword" &&
        userData["password"] !== userData["repeatPassword"] &&
        inputError.push("repeatPassword");

      setIsError(inputError);
    });

    formDataWithError.forEach((el, i) => {
      el.error = isError.includes(el.name) ? true : false;
      setFormData([...formDataWithError]);
    });

    isError.length === 0 &&
      axios
        .post("/users/create", userData)
        .then((res) => console.log(res.data));
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Page $row>
      <Form
        options={formData}
        onClick={handleCreateUser}
        buttonText="Зарегистрироваться"
        dataValue={userData}
        // disable={isError.length > 0}
      />
    </Page>
  );
}

export default Registration;
