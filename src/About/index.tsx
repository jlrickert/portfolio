import * as React from "react";
import "./styles.css";

export interface IAboutProps {
  className?: string;
}

export class About extends React.Component<IAboutProps, {}> {
  public readonly content: string = `
# About Me
Hi, I am Jared Rickert.
  `;

  public render(): React.ReactElement<HTMLDivElement> {
    const classes = this.props.className + " Home";

    return (
      <div className="About">
        <h1 className="About-header">About Me</h1>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
        <p>filler</p>
      </div>
    );
  }
}
