import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Grommet } from "grommet";
import { theme } from "./theme.js";
import { Quotr } from "./Quotr.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Grommet theme={theme} full>
        <Quotr />
      </Grommet>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
