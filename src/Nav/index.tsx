import * as React from "react";

import "./styles.css";
import { ERoute } from "../App";

export interface INavProps {
  updateRoute: (route: ERoute) => void;
}

export class Nav extends React.Component<INavProps, {}> {
  /* public componentDidUpdate() {
   *     this.refs.toggleInput.getDOMNode().
   * }*/
  public render(): React.ReactElement<HTMLDivElement> {
    const elems = [
      { routeName: "About", route: ERoute.About },
      { routeName: "Projects", route: ERoute.Projects },
      { routeName: "Contact", route: ERoute.Contact },
    ].map(({ routeName, route }) => {
      return (
        <li key={routeName} className="nav-item">
          <a className="nav-link" onClick={this.changeRoute(route)}>
            {routeName}
          </a>
        </li>
      );
    });

    return (
      <header>
        <nav className="Nav navbar navbar-dark bg-primary navbar-expand-sm fixed-top">
          <a className="navbar-brand" onClick={this.changeRoute(ERoute.Home)}>
            JR
          </a>

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expand="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">{elems}</ul>
          </div>
        </nav>
      </header>
    );
  }

  private changeRoute = (route: ERoute) => () => {
    this.props.updateRoute(route);
  };
}
