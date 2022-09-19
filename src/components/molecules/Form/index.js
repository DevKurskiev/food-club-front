import React, { useState } from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";

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
  handleAddedImage,
  ...rest
}) {
  const [value, setValue] = useState(dataValue || {});

  function handleChangeInputValue(e, name) {
    setValue({ ...value, [name]: e.target.value });
  }

  const uploader = new Uploader({
    apiKey: "free",
  });

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>

      {options.map((el) => {
        return (
          <FormItem key={el.name}>
            <FormInputLabel $error={el.error}>{el.label}</FormInputLabel>
            {el.type !== "file" ? (
              <FormInput
                type={el.type}
                value={value.value}
                onChange={(e) => handleChangeInputValue(e, el.name)}
                $error={el.error}
                placeholder={el.placeholder}
              />
            ) : (
              <UploadButton
                uploader={uploader} // Required.
                SameSite={false}
                onComplete={(files) => {
                  if (files.length !== 0) {
                    files.map((f) => handleAddedImage(f));
                  }
                }}
              >
                {({ onClick }) => (
                  <FormInput type={el.type} onClick={onClick} />
                )}
              </UploadButton>
            )}
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
