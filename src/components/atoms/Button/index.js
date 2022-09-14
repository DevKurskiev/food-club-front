import React from "react";

import { Icon } from "@atoms";

import { ButtonContainer, ButtonItem, ButtonItemCounter } from "./styles";

const Button = ({
  buttonText,
  iconName,
  iconSize,
  counter,
  onClick,
  ...rest
}) => {
  return (
    <ButtonContainer onClick={onClick} {...rest}>
      {counter && <ButtonItemCounter>{counter}</ButtonItemCounter>}
      <ButtonItem {...rest}>
        {buttonText}
        {iconName && <Icon iconSize={iconSize} name={iconName} />}
      </ButtonItem>
    </ButtonContainer>
  );
};

export default Button;
