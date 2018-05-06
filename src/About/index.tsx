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
        <div className="About-section">
          <p>About Me</p>
        </div>
        <div className="About-header">
          <p>
            To keep it simple, I am a fullstack developer currently living in
            Minnesota looking to make my next career move. Please feel free to{" "}
            <Link to="/contact">contact me</Link>.
          </p>

          <p>
            I am a self taught programmer who has been programming as a hobby
            for over {years}+ years. I originally studied electrical engineering
            at St Cloud State University but later switch to computer science as
            I relized my passion was in coding.
          </p>

          <p>
            Most of my early projects where developing my desktop experience on
            Linux, arduino projects, and writing sample games (mostly command
            line). Nowadays I spend most of time build things on the web.
          </p>

          <p>
            When I am not coding and old man winter finally decides to leave
            Minnesota, you can often find me going for a quick run.
          </p>
        </div>

        <div className="About-section">
          <p>Mad Skillz</p>
        </div>
        <div className="About-content">
          <h3>Frontend</h3>
          <ul>
            <li className="uncommon">Threejs</li>
            <li className="epic">HTML5 & CSS3</li>
            <li className="epic">JavaScript</li>
            <li className="legendary">TypeScript</li>
          </ul>

          <h3>Backend</h3>
          <ul>
            <li className="uncommon">Node</li>
            <li className="epic">Postgresql</li>
            <li className="epic">Go</li>
            <li className="legendary">Python</li>
            <li className="legendary">Linux</li>
          </ul>
        </div>

        <div className="About-section">
          <p>Books I have read</p>
        </div>
        <div className="About-content">
          <ul>
            <li>Code Complete 2</li>
            <li>Clean Code</li>
            <li>Compilers: Principles, Techniques, and Tools. (in progress)</li>
            <li>SICP</li>
          </ul>
        </div>
      </div>
    );
  }
}
