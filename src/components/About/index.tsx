import * as React from "react";
import { Link } from "react-router-dom";
import * as Styles from "./about.module.css";
import picUrl from "./pic.jpg";

const yearsProgramming = new Date().getFullYear() - 2012;

const main = (
  <div className={Styles.Main}>
    <h1>About</h1>
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

const skillz = (
  <div className={Styles.Skillz}>
    <h1>Mad Skillz</h1>
    <div className={Styles.FlexSkillz}>
      <div className={Styles.SkillCategory}>
        <h3>Frontend</h3>
        <ul>
          <li className={Styles.Uncommon}>Threejs</li>
          <li className={Styles.Epic}>HTML5 & CSS3</li>
          <li className={Styles.Epic}>JavaScript</li>
          <li className={Styles.Legendary}>TypeScript</li>
        </ul>
      </div>

      <div className={Styles.SkillCategory}>
        <h3>Backend</h3>
        <ul>
          <li className={Styles.Uncommon}>Node</li>
          <li className={Styles.Epic}>Postgresql</li>
          <li className={Styles.Epic}>Go</li>
          <li className={Styles.Legendary}>Python</li>
          <li className={Styles.Legendary}>Linux</li>
        </ul>
      </div>
    </div>
  </div>
);

const books = (
  <div className={Styles.Books}>
    <h1>Good Reads</h1>
    <ul>
      <li>Code Complete 2</li>
      <li>Clean Code</li>
      <li>Compilers: Principles, Techniques, and Tools. (in progress)</li>
      <li>SICP</li>
      <li>Running Lean</li>
    </ul>
  </div>
);

export interface Props {}

export class About extends React.Component<Props, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className={Styles.About}>
        {main}
        {skillz}
        {books}
      </div>
    );
  }
}
