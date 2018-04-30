import * as React from "react";
import * as ReactDOM from "react-dom";
import "jquery/dist/jquery.slim";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import "./index.css";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root")!);
registerServiceWorker();
