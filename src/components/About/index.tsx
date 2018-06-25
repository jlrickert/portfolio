import * as React from "react";
import { Link } from "react-router-dom";
import * as Styles from "./about.module.css";

const yearsProgramming = new Date().getFullYear() - 2013;

const main = (
  <div className={Styles.Main}>
    <h1>About</h1>
    <p>
      Hi there, I am a software engineer with a passion for all things
      opensource currently living in Minneapolis, MN.
    </p>
    <p>
      I am a recent college student currently pursing an entry into the world of
      software development. I have done many projects both in and outside of
      class from everything from embeded systems to full stack web applications.
      My long term goals is to do development on blockchain. When I am not
      coding I enjoy going for a long run, or canoing at the cabin.
    </p>
  </div>
);

const services = (
  <div className={Styles.Services}>
    <h1>Services</h1>
    <p>
      Currently I am willing to accept small short term freelance projects so
      feel free to{" "}
      <Link to="contact">
        <b>contact</b>
      </Link>{" "}
      me.
    </p>
    <div className={Styles.Service}>
      <h3>Front End Development</h3>
      <p>
        Front End Development is building out the visual components of a
        website. Using HTML, CSS, and Javascript, I build fast, interactive
        websites.
      </p>
    </div>
    <div className={Styles.Service}>
      <h3>Back End Development</h3>
      <p>
        Back End Development is building out the business modal of a website.
        Using Python or Nodejs and a storage solution, I build quick solutions
        to get your business idea out quickly.
      </p>
    </div>
    <div className={Styles.Service}>
      <h3>Fullstack Web Development</h3>
      <p>
        Full Stack Web devepment does the job of both the Back End and Front End
        development for a website. Using things such as Django or MERN stack, I
        can quickly get a mvp to kickstart your idea.
      </p>
    </div>
  </div>
);

const skillz = (
  <div className={Styles.Skillz}>
    <h1>Mad Skillz</h1>
    <div className={Styles.FlexSkillz}>
      <div className={Styles.SkillCategory}>
        <h3>Frontend</h3>
        <ul>
          <li className={Styles.Uncommon}>Threejs (3/10)</li>
          <li className={Styles.Epic}>HTML5 & CSS3 (7/10)</li>
          <li className={Styles.Legendary}>JavaScript (8/10)</li>
          <li className={Styles.Legendary}>
            React & Redux with Typescript (9/10)
          </li>
          <li className={Styles.Legendary}>Typescript (10/10)</li>
        </ul>
      </div>

      <div className={Styles.SkillCategory}>
        <h3>Backend</h3>
        <ul>
          <li className={Styles.Uncommon}>PostgreSQL (6/10)</li>
          <li className={Styles.Uncommon}>Go (6/10)</li>
          <li className={Styles.Epic}>Node (7/10)</li>
          <li className={Styles.Epic}>Flask (7/10)</li>
          <li className={Styles.Epic}>Django & DRF (7/10)</li>
          <li className={Styles.Legendary}>Linux (8/10)</li>
          <li className={Styles.Legendary}>Python (10/10)</li>
        </ul>
      </div>
      <div className={Styles.SkillCategory}>
        <h3>Other skills and languages</h3>
        <ul>
          <li className={Styles.Common}>Java (3/10)</li>
          <li className={Styles.Common}>Scala (4/10)</li>
          <li className={Styles.Uncommon}>Clojure (5/10)</li>
          <li className={Styles.Uncommon}>Scheme (5/10)</li>
          <li className={Styles.Uncommon}>Elm (5/10)</li>
          <li className={Styles.Epic}>Haskell (6/10)</li>
          <li className={Styles.Epic}>Rust (favorite) (7/10)</li>
          <li className={Styles.Epic}>C/C++ (7/10)</li>
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
      <li>Mastering Bitcoin</li>
    </ul>
  </div>
);

export interface Props {}

export class About extends React.Component<Props, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className={Styles.About}>
        {main}
        {services}
        {skillz}
        {books}
      </div>
    );
  }
}
