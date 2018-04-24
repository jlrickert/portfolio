import * as React from "react";

import "./home.css";

export interface IHomeProps {
  className?: string;
}

export const styles = {
  base: {
    position: "relative",
    height: "100vh",
    width: "100%",
  } as React.CSSProperties,
  logo: {
    position: "absolute",
    width: "234px",
    height: "100px",
    top: "50%",
    left: "50%",
    marginLeft: "-117px",
    marginTop: "-50px",
  } as React.CSSProperties,
};

export class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const times: number[] = [];
    for (let i = 0; i < 200; i += 1) {
      times.push(i);
    }

    const classes = this.props.className + " Home";

    return (
      <div className={classes} style={styles.base}>
        <h1 style={styles.logo}>Jared Rickert</h1>
        <svg>How to Use this?</svg>
      </div>
    );
  }
}
