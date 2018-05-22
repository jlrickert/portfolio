import * as React from "react";
import { Link } from "react-router-dom";
import * as Styles from "./about.module.css";

const yearsProgramming = new Date().getFullYear() - 2012;

const main = (
  <div className={Styles.Main}>
    <h1>A Passion for Coding</h1>
    <p>
      Hi there, I am a software engineer who has been programming ever since I
      stumbled upon the wonderful world of programming about {yearsProgramming}{" "}
      years ago. I am always continuously learning and pushing towards mastery
      of my craft.
    </p>
    <p>
      When I am not coding you can often find me outside on a quick run or being
      lazy out at the cabin.
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
