import * as React from "react";
import * as ReactDOM from "react-dom";
import Radium from "radium";
import { App } from "./app";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Radium.StyleRoot>
    <App />
  </Radium.StyleRoot>,
  document.getElementById("root")!,
);
registerServiceWorker();
