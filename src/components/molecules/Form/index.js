import React, { useState } from "react";

import { Button } from "@atoms";

import {
  FormContainer,
  FormItem,
  FormInput,
  FormInputLabel,
  FormTitle,
} from "./styles";

function From({ options, onClick, buttonText, ...props }) {
  const [value, setValue] = useState({});

  function handleChangeInputValue(e, name) {
    setValue({ ...value, [name]: e.target.value });
  }

  return (
    <FormContainer>
      <FormTitle>Регистрация</FormTitle>

      {options.map((el) => {
        return (
          <FormItem key={el.name}>
            <FormInputLabel $error={el.$error}>{el.label}</FormInputLabel>
            <FormInput
              type={el.type}
              value={value.value}
              onChange={(e) => handleChangeInputValue(e, el.name)}
              $error={el.$error}
            />
          </FormItem>
        );
      })}

      <Button
        $fullWidth
        buttonText={buttonText}
        onClick={() => onClick(value)}
      />
    </FormContainer>
  );
}

export default From;
