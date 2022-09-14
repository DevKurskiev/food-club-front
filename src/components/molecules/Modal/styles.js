import styled from "styled-components";

import { theme } from "@theme";

export const ModalContainer = styled.div`
  display: ${(props) => (props.none ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${theme.palette.opacity};
  cursor: pointer;
`;

export const ModalContent = styled.div`
  background: ${theme.palette.primary};
  border-radius: 10px;
  width: ${(props) => props.width};
  margin: 0 10px;
  position: relative;
  cursor: auto;
`;
