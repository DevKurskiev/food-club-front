import styled, { css } from "styled-components";

import { theme } from "@theme";

export const FormContainer = styled.div`
  padding: 35px 20px;
  border: 1px solid ${theme.palette.primary};
  max-width: 450px;
  border-radius: 15px;
  width: 100%;
`;
export const FormTitle = styled.h1`
  text-align: center;
`;

export const FormItem = styled.div`
  margin: auto;
`;

export const FormInputLabel = styled.p`
  font-size: 14px;
  margin-top: 7px;

  ${(props) =>
    props.$error &&
    css`
      color: ${theme.palette.error};
    `}
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid ${theme.palette.primary};
  font-size: 18px;
  padding: 0 5px;
  margin-bottom: 18px;
  color: ${theme.palette.primary};

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid ${theme.palette.error};
      color: ${theme.palette.error};
    `}
`;
