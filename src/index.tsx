import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import ApplicationContextProvider from "./contexts/index";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
