import * as React from "react";

import "./styles.css";

export interface IHomeProps {
  className?: string;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <section className="Home">
        <div />
        <h1 className="Home-logo">Jared Rickert</h1>
        <p className="u-fadein-3">Fullstack Developer</p>
        <svg>How to Use this?</svg>
      </section>
    );
  }
}
