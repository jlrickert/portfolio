import * as React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

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

interface IHeaderState {
  navPopup: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  public state = { navPopup: false };

  public render(): React.ReactElement<HTMLDivElement> {
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);

    return (
      <header className="Header" role="banner">
        <div className="Header-wrapper">
          <div className="Header-logo u-fadein-2">
            <h1>
              <Link to="/" className="Header-link">
                JR
              </Link>
            </h1>
          </div>

          <nav className="Header-navbar l-large">
            <ul className="Header-links">{links}</ul>
          </nav>
          <button className="Header-icon l-small" onClick={this.showNavPopup}>
            <h1>
              <FontAwesomeIcon icon="bar" />
            </h1>
          </button>
        </div>
      </header>
    );
  }

  private showNavPopup = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.setState({ navPopup: true });
  };

  private hideNavPopup = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.setState({ navPopup: false });
  };

  private renderRoute = (route: IHeaderLink, i: number) => {
    const active = route.active ? "active" : "";
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
