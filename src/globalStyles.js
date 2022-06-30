import { createGlobalStyle } from "styled-components";

import { theme } from "@theme";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    transition-duration: .3s;
  }

  *::selection{
    color: ${theme.palette.default};
    background-color:  ${theme.palette.primary};
  }

  body{
    padding-top: 70px;
  }
`;
