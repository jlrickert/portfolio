import * as React from "react";
import "./App.css";

import { Background } from "../background";

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="App">
        <Background />
        <div className="App-wrapper">
          <p>Hello World</p>
        </div>
      </div>
    );
  }
}

export default App;
