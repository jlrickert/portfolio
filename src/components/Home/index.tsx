import * as React from "react";
import picUrl from "./pic.jpg";

import * as Styles from "./home.module.css";

export interface IHomeProps {}

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className={Styles.Home}>
        <div className={Styles.Contents}>
          <div className={Styles.Portrait}>
            <img src={picUrl} />
          </div>
          <h1 className={Styles.Logo}>Jared Rickert</h1>
          <p className="u-fadein-3">Software Engineer</p>
        </div>
      </div>
    );
  }
}
