import * as React from "react";

import "./styles.css";

export interface IResumeProps {}

export class Resume extends React.Component<IResumeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div>
        <h1>Resume</h1>
      </div>
    );
  }
}
