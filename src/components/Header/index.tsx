import * as React from "react";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import "./styles.css";
import { IRoute } from "../App/routes";
import { Overlay } from "./Overlay";

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
    const { navPopup } = this.state;
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);

    return (
      <header className="Header" role="banner">
        <div className="Header__wrapper l-container">
          <div className="Header__logo u-fadein-2">
            <h1>
              <Link to="/" className="Header__link">
                JR
              </Link>
            </h1>
          </div>

          <nav className="Header__navbar">
            <ul className="Header__links">{links}</ul>
          </nav>
          <button className="Header__icon l-small" onClick={this.showNavPopup}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>
        {this.state.navPopup && (
          <Overlay routes={routes} closeFn={this.hideNavPopup} />
        )}
      </header>
    );
  }

  private showNavPopup = () => {
    this.setState({ navPopup: true });
  };

  private hideNavPopup = () => {
    this.setState({ navPopup: false });
  };

  private renderRoute = (route: IHeaderLink, i: number) => {
    const active = route.active ? "active" : "";
    return (
      <li key={i}>
        <Link
          to={route.path}
          className={`Header__link u-fadein-${i + 2} ${active}`}
        >
          {route.text}
        </Link>
      </li>
    );
  };
}
