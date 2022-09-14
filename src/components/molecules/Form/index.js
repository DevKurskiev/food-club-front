import React, { useState } from "react";

import { Button } from "@atoms";

import {
  FormContainer,
  FormItem,
  FormInput,
  FormInputLabel,
  FormTitle,
} from "./styles";

function From({
  options,
  onClick,
  buttonText,
  title,
  dataValue,
  setDataValue,
  disable,
  children,
  ...rest
}) {
  const [value, setValue] = useState(dataValue || {});

  function handleChangeInputValue(e, name) {
    setValue({ ...value, [name]: e.target.value });
  }

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>

      {options.map((el) => {
        return (
          <FormItem key={el.name}>
            <FormInputLabel $error={el.error}>{el.label}</FormInputLabel>
            <FormInput
              type={el.type}
              value={value.value}
              onChange={(e) => handleChangeInputValue(e, el.name)}
              $error={el.error}
              placeholder={el.placeholder}
            />
          </FormItem>
        );
      })}

      <Button
        $fullWidth
        buttonText={buttonText}
        onClick={() => onClick(value)}
        $disable={disable}
        {...rest}
      />

      {children}
    </FormContainer>
  );
}

export default From;
