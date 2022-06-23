import React, { memo } from "react";

import sprite from "@assets/icons/sprite.svg";
import { IconSvg } from "./styles";

const Icon = memo(({ name, ...rest }) => (
  <IconSvg {...rest}>
    <use href={`${sprite}#${name}`} />
  </IconSvg>
));

export default Icon;
