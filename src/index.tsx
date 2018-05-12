import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./stylesheets/main.css";
import { App } from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
registerServiceWorker();
