import React from "react";

import { ModalContainer, ModalContent } from "./styles";

function Modal({ children, width, ...rest }) {
  return (
    <ModalContainer {...rest} data-name="container">
      <ModalContent width={width}>{children}</ModalContent>
    </ModalContainer>
  );
}

export default Modal;
