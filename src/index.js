import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Grommet } from "grommet";
import {theme} from "./theme.js"
import { Login } from "./components/auth/Login.js";
import { Register } from "./components/auth/Register.js";
import { Quotr } from "./Quotr.js";


ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <Router>
        <Quotr />
      </Router>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
