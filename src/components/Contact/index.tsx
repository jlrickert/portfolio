import * as React from "react";

import "./styles.css";

export interface IContactProps {}

export class Contact extends React.Component<IContactProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div>
        <h1>Contact</h1>
      </div>
    );
  }
}
