import * as React from "react";

import "./home.css";

export interface IHomeProps {
  className?: string;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const times: number[] = [];
    for (let i = 0; i < 200; i += 1) {
      times.push(i);
    }

    const classes = this.props.className + " Home";

    return (
      <div className={classes}>
        {times.map(i => <p key={i}>Hello number {i}</p>)}
      </div>
    );
  }
}
