import * as React from "react";

import "./styles.css";

export interface IProjectProps {}

export class Project extends React.Component<IProjectProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className="Project">
        <h1>project N</h1>
      </div>
    );
  }
}
