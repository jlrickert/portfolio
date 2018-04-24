import * as React from "react";

import "./styles.css";

export interface IHomeProps {
  className?: string;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const classes = this.props.className + " Home";

    return (
      <div className={classes}>
        <h1 className="Home-logo">Jared Rickert</h1>
        <svg>How to Use this?</svg>
      </div>
    );
  }
}
