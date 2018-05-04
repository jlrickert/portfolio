import * as React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { GotoTopButton } from "./GotoTopButton";

export interface INavLink {
  active?: boolean;
  path: string;
  text: string;
}

export interface INavProps {
  routes: INavLink[];
}

export class Nav extends React.Component<INavProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const elems = this.props.routes.map((route, i) => {
      const active = route.active ? "active" : "";
      return (
        <li className="nav-item" key={route.path}>
          <Link
            to={route.path}
            className={`nav-link u-fadein-${i + 2} ${active}`}
          >
            {route.text}
          </Link>
        </li>
      );
    });

    return (
      <header className="Nav">
        <nav className="navbar navbar-dark navbar-expand-sm">
          <Link to="/" className="navbar-brand u-fadein-2">
            JR
          </Link>

          <button
            type="button"
            className="Nav-button navbar-toggler u-fadein"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">{elems}</ul>
          </div>
        </nav>
        <GotoTopButton className={"u-fadein-3"} />
      </header>
    );
  }
}
