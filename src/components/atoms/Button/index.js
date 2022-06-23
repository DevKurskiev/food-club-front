import React from "react";

import { Icon } from "@atoms";

import { ButtonContainer, ButtonItem } from "./styles";

const Button = ({ buttonText, iconName, iconSize, ...rest }) => {
  return (
    <ButtonContainer>
      <ButtonItem {...rest}>
        {buttonText}
        {iconName && <Icon iconSize={iconSize} name={iconName} />}
      </ButtonItem>
    </ButtonContainer>
  );
};

export default Button;
