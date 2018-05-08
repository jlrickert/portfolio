import * as React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { GotoTopButton } from "./GotoTopButton";
import { IRoute } from "../App/routes";

export interface IHeaderLink {
  active?: boolean;
  path: string;
  text: string;
}

export interface IHeaderProps {
  routes: IHeaderLink[];
}

export class Header extends React.Component<IHeaderProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);

    return (
      <header className="Header">
        <nav>
          <Link to="/" className="Header-logo Header-link u-fadein-2">
            JR
          </Link>

          <div className="Header-navbar">
            <ul className="Header-links">{links}</ul>
          </div>

          <button className="Header-button">
            <i className="fa fa-bars" />
          </button>
        </nav>
        <GotoTopButton className="Header-button u-fadein-3" />
      </header>
    );
  }

  private renderRoute = (route: IHeaderLink, i: number) => {
    const active = route.active ? "Header-active" : "";
    return (
      <li key={i}>
        <Link
          to={route.path}
          className={`Header-link u-fadein-${i + 2} ${active}`}
        >
          {route.text}
        </Link>
      </li>
    );
  };
}
