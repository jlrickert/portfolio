import * as React from "react";
import Radium from "radium";

@Radium
export class About extends React.Component<{}, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className="About">
        <h1>About Me</h1>
      </div>
    );
  }
}
