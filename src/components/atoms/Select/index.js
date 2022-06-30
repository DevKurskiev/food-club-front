import React from "react";

import {
  RadioContainer,
  RadioItem,
  RadioItemTitle,
  RadioItemInput,
} from "./styles";

const Select = ({ options, onClick, ...rest }) => {
  return (
    <RadioContainer {...rest}>
      {options.map((el, i) => {
        return (
          <RadioItem key={el.value}>
            <RadioItemInput
              id={"radio-" + i}
              type="radio"
              name="radio"
              value={el.value}
              onClick={onClick}
              checked
              readOnly
            />
            <RadioItemTitle htmlFor={"radio-" + i}>{el.value}</RadioItemTitle>
          </RadioItem>
        );
      })}
    </RadioContainer>
  );
};

export default Select;
