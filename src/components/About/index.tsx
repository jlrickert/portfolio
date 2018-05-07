import * as React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import picUrl from "./pic.jpg";

import { Background } from "./Background";

const yearsProgramming = new Date().getFullYear() - 2012;

const aboutHead = (
  <div className="About-head">
    <Background className="About-background" />
    <h1>Passion for coding</h1>
  </div>
);

const aboutContent = (
  <div className="About-content">
    <p>
      Hi there, I am a software developer who has been following my passion ever
      since first learning to code. I enjoy solving problems and creating
      content that others enjoy.
    </p>

    <p>
      I taught myself who has been programming as a hobby for over{" "}
      {yearsProgramming}+ years. I originally studied electrical engineering at
      St Cloud State University but later switch to computer science as I
      relized my passion was in coding.
    </p>

    <p>
      When I am not coding and old man winter finally decides to leave
      Minnesota, you can often find me going for a quick run.
    </p>
  </div>
);

const skillzHead = (
  <div className="About-head">
    <Background className="About-background" />
    <h1>Mad Skillz</h1>
  </div>
);

const skillzContent = (
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
);

const booksHead = (
  <div className="About-head">
    <Background className="About-background" />
    <h1>Books I have read</h1>
  </div>
);

const booksContent = (
  <div className="About-content">
    <ul>
      <li>Code Complete 2</li>
      <li>Clean Code</li>
      <li>Compilers: Principles, Techniques, and Tools. (in progress)</li>
      <li>SICP</li>
    </ul>
  </div>
);

const Header = () => {
  return (
    <div className="About-header">
      <div className="About-portrait">
        <img src={picUrl} />
      </div>
      <p>Full-Stack Developer</p>
    </div>
  );
};

export interface IAboutProps {}

export class About extends React.Component<IAboutProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className="About l-dt">
        <div className="l-dtc">
          {aboutHead}
          {aboutContent}

          {skillzHead}
          {skillzContent}

          {booksHead}
          {booksContent}
        </div>
      </div>
    );
  }
}
