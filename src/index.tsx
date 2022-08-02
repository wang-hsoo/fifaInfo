import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { Darktheme, isDarkAtom, theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";



const client = new QueryClient();





ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
          <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
