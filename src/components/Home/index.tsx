import * as React from "react";
import picUrl from "./pic.jpg";

import "./styles.css";

export interface IHomeProps {}

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <section className="Home">
        <div className="Home-contents">
          <div className="Home-portrait">
            <img src={picUrl} />
          </div>
          <h1 className="Home-logo">Jared Rickert</h1>
          <p className="u-fadein-3">Fullstack Developer</p>
        </div>
      </section>
    );
  }
}
