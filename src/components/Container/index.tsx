import * as React from "react";

import * as Styles from "./container.module.css";

export interface Props {
  className: string;
}

export class Container extends React.Component<Props> {
  public render(): React.ReactElement<HTMLDivElement> {
    const { className } = this.props;

    return (
      <div className={`${Styles.Container} ${className}`}>
        {this.props.children}
      </div>
    );
  }
}
