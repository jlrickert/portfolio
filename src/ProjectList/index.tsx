import * as React from "react";

import "./styles.css";

export interface IProjectListProps {}

export class ProjectList extends React.Component<IProjectListProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className="ProjectList">
        <h1>project N</h1>
      </div>
    );
  }
}
