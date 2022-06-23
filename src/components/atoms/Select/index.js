import React from "react";

import {
  RadioContainer,
  RadioItem,
  RadioItemTitle,
  RadioItemInput,
} from "./styles";

const Select = ({ options, ...rest }) => {
  return (
    <RadioContainer {...rest}>
      {options.map((el, i) => {
        return (
          <RadioItem key={el}>
            <RadioItemInput
              id={"radio-" + i}
              type="radio"
              name="radio"
              value={el}
              checked
              readOnly
            />
            <RadioItemTitle htmlFor={"radio-" + i}>{el}</RadioItemTitle>
          </RadioItem>
        );
      })}
    </RadioContainer>
  );
};

export default Select;
