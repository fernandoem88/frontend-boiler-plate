import "@styles/theme.antd.less";
/* 
// Note: if in the next.config.js file,
// you use "additionalData" in nextWithLess loader,
// then you should uncomment this import.
import "@styles/theme.custom.less";
*/
import "@styles/globals.css";
import React from "react";
import { AuthProvider } from "@src/shared/providers/AuthContext";
import { ServerDataProvider } from "@src/shared/providers/ApiDataContext";
import { GlobalStyle } from "@src/shared/components/GlobalStyle";

const ErrorWrapper: React.FC<{
  error?: { message: string; status: number };
}> = ({ error, children }) => {
  if (error) {
    return <div>{`${error.status}: ${error.message}`}</div>;
  }
  return <>{children}</>;
};
function MyApp({ Component, pageProps }) {
  const { data, error } = pageProps;

  return (
    <ServerDataProvider data={data}>
      <GlobalStyle />
      <ErrorWrapper error={error}>
        <Component {...pageProps} />
      </ErrorWrapper>
    </ServerDataProvider>
  );
}

export default MyApp;
