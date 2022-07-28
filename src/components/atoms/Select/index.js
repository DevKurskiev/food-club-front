import React from "react";

import {
  RadioContainer,
  RadioItem,
  RadioItemTitle,
  RadioItemInput,
} from "./styles";

const Select = ({ options, onClick, checked, ...rest }) => {
  return (
    <RadioContainer {...rest}>
      {options.map((el, i) => {
        return (
          <RadioItem key={el.value} {...rest}>
            <RadioItemInput
              id={"radio-" + i}
              type="radio"
              name="radio"
              value={el.value}
              onClick={onClick}
              checked={el.type === checked}
              readOnly
              data-type={el.type}
            />
            <RadioItemTitle htmlFor={"radio-" + i} {...rest}>
              {el.value}
            </RadioItemTitle>
          </RadioItem>
        );
      })}
    </RadioContainer>
  );
};

export default Select;
