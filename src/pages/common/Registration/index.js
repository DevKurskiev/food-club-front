import React from "react";
import axios from "axios";

import { Form } from "@molecules";
import { Page } from "@organisms";

import { registrationFormData } from "./helpers";

function Registration() {
  const handleCreateUser = (userData) => {
    axios.post("/users/create", userData).then((res) => console.log(res.data));
  };

  return (
    <Page $row>
      <Form
        options={registrationFormData}
        onClick={handleCreateUser}
        buttonText="Зарегистрироваться"
      />
    </Page>
  );
}

export default Registration;
