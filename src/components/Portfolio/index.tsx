import * as React from "react";

import * as Styles from "./portfolio.module.css";

import { Project, Props as ProjectData } from "../Project";

const projects: ProjectData[] = [
  {
    name: "portfolio",
    url: "https://github.com/jlrickert/portfolio",
    tech: ["typescript", "react"],
    category: ["frontend", "SEO"],
    shortDescription: "My personal front page to the internet",
    description: `
I wanted a way to showcase the kinds of projects that I like to work on and also
advertise my skillset. The very nature of this project means that It will always
be a work in progress as my skills improve and interests change.

One challenge that I ran into was problems with bots not able to view the
contents of the page. This is a problem when it come to SEO and linking to
my page in places such as LinkedIn as it renders my front page as a plain
white page. One possible solution is to write a webpack plugin that will
pre render the page.  It could also be possible to render each of the routes.
    `,
  },
  {
    name: "Rusty",
    url: "https://github.com/jlrickert/rusty",
    tech: ["rust"],
    category: ["ai", "halite2"],
    shortDescription: "Bot written for the game halite 2",
    description: `
An experiment with rust by writing a bot to play the game halite 2. One major
advantage that rust gave me is that my bot would never crash. As a result I
won a few extra games because the other bots would occasionally crash.
    `,
  },
  {
    name: "DTS",
    tech: ["python", "MS-SQL"],
    category: ["Automation"],
    shortDescription: "Database that represents the state of the world",
    description: `
The goal of this project is to use a central table that describes the state of
the world and to sync that state to the world.

DTS is a python library where the user would describe a module that
depends on a set a fields in the table and define functions that react to the
set of fields when they change.  Modules are also able to depend on other
modules. When a row is added, modified, or deleted, the correct function would
be called.  The function was often times a selenium script or a dump of the
relevant information related to the task that needed to be complete.

How the program accomplishes this task is to compute a merkle tree of the
database and store it locally.  The new merkle tree would then be compared to an
old merkle tree to determine what fields have changed.  A diff could then be made
between the two trees to quickly find out the differences.  Using the calculated
difference the appropriate set of functions and the order need to be called are
calculated. The user then would either call the functions or manually apply the
functions manually depending on if it could be automated or not. The old merkle
tree would be updated until both trees are equivalent.
    `,
  },
  {
    name: "Form Monster",
    tech: ["python", "wxpython"],
    url: "https://github.com/jlrickert/form-monster",
    category: ["Desktop"],
    shortDescription: "A declarative way to quickly generate forms",
    description: `
The goal of this project was to help new programmers create simple forms
with wxpython without knowing any details about GUI development.

Form monster takes a simple python dictionary that would describe all fields
and their properties. Some examples of properties that a field may have is type
of field such as number, text, choice, or checkbox, extra validation logic,
optional or not, initial value, and more. 

When this description is passed to Form monster a generic GUI would be created.
The client would then enter information and would be able to submit when all
information is validated.`,
  },
  {
    name: "Arduino Sound Recorder",
    tech: ["C", "ASM", "Arduino"],
    category: ["Hardware", "IOT"],
    shortDescription: "Arduino sound recorder",
    description: `
This project involved creating a sound recorder using an Arduino Uno, SD card
reader, and a custom microphone circuit. The reason for building it was to
gather data points about sound in a high altitude balloon to determine if
their were any effects on amplitude and frequency. Later this project turned
into exploring the arduino further.

Originally it was built using the arduino libraries, but later switch to
using only avr-toolchain and building everything from scratch that the arduino
libraries provided.
    `,
  },
  {
    name: "Connect Four",
    tech: ["C"],
    url: "https://github.com/jlrickert/ConnectFour",
    category: ["CLI"],
    shortDescription: "A command line game of Connect Four.",
    description: `
A remake of the classic Connect Four Game.  Similar to my Tic Tac Toe project it
involved drawing the board on the commandline where it would take turns between
two players. A player may be a dumb AI. A player would select were to place a
chip by typing in a column. I would detect invalid moves and if a winner is
present.`,
  },
  {
    name: "Tic Tac Toe",
    tech: ["C", "TCP"],
    category: ["CLI", "Networking"],
    shortDescription:
      "A command line program of the classic Tic Tac Toe, including networked multiplayer",
    description: `
This is probably the first complete programs I have ever written.  It is a
simple remake of the classic tic tac toe game that draws the board on the
command line. Selecting the cell was a simple as typing in the Cell row and
column, ex A3. It would not allow invalid placements of chips.  Multiplayer
was originally not planned but was later added to learn about networking.`,
  },
];

export interface Props {}

export class Portfolio extends React.Component<Props, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    return (
      <div className={Styles.Portfolio}>
        <h1>Portfolio</h1>
        <div className={Styles.Projects}>
          {projects.map((proj, i) => <Project key={i} {...proj} />)}
        </div>
      </div>
    );
  }
}

export default Portfolio;
