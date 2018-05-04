import * as React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export interface IAboutProps {
  className?: string;
}

export class About extends React.Component<IAboutProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const classes = this.props.className + " Home";

    const years = new Date().getFullYear() - 2012;

    return (
      <div className="About">
        <h1 className="About-header">About Me</h1>
        <p>
          To keep it simple, I am a fullstack developer currently living in
          Minnesota looking to make my next career move. Please feel free to{" "}
          <Link to="/contact">contact me</Link>.
        </p>

        <p>
          I am a self taught programmer who has been programming as a hobby for{" "}
          {years}+ years developing anything from writing my own desktop
          experience on Linux, arduino projects, or writing simple games (mostly
          command line). Nowadays, my extra free time is spent building things
          on the web.
        </p>

        <p>
          When I am not coding and old man winter finally decides to leave
          Minnesota, you can often find me going for a quick run.
        </p>

        <hr />

        <h2>Relevant Skills</h2>
        <h3>Frontend</h3>
        <ul>
          <li className="uncommon">HTML5</li>
          <li className="epic">CSS3</li>
          <li className="uncommon">Threejs</li>
          <li className="epic">JavaScript</li>
          <li className="epic">TypeScript</li>
        </ul>

        <hr />

        <h3>Backend</h3>
        <ul>
          <li className="legendary">Python</li>
          <li className="uncommon">Node</li>
          <li className="legendary">Linux</li>
          <li className="epic">Postgresql</li>
        </ul>

        <hr />

        <h2>Books I have read</h2>
        <ul>
          <li>Code Complete 2</li>
          <li>Clean Code</li>
          <li>Dragon compiler book</li>
          <li>SICP</li>
        </ul>
      </div>
    );
  }
}
