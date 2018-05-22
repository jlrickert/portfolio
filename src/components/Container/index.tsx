import * as React from "react";

import * as Styles from "./container.module.css";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export class Container extends React.Component<Props> {
  public render(): React.ReactElement<HTMLDivElement> {
    const { className } = this.props;

    return (
      <div className={`${className || ""} ${Styles.Container}`} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
