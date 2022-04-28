import "@styles/theme.antd.less";
/* 
// Note: if in the next.config.js file,
// you use "additionalData" in nextWithLess loader,
// then you should uncomment this import.
import "@styles/theme.custom.less";
*/
import "@styles/globals.css";
import React from "react";
import { AuthProvider } from "@src/providers/AuthContext";
import { AuthProvider } from "@src/providers/";
import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle(
  {},
  css`
    body {
    }
  `
);

function MyApp({ Component, pageProps }) {
  const [ctx, setCtx] = React.useState({ login: null, error: null });
  const { serverSide, ...props } = pageProps;
  const { error, data } = pageProps.serverSide || {};
  console.log("....serverSide", error, data);

  return (
    <>
      <GlobalStyle />
      <Component {...props} />
    </>
  );
}

export default MyApp;
