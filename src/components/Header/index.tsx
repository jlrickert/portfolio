import * as React from "react";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import * as Styles from "./header.module.css";
import { Container } from "../Container";
import { Link } from "../Link";
import { Route } from "../App";

export interface Props {
  routes: Route[];
}

interface State {
  navPopup: boolean;
}

const Logo = () => {
  return (
    <div className={`${Styles.Logo} u-fadein-2`}>
      <h1>
        <Link to="/">JR</Link>
      </h1>
    </div>
  );
};

export class Header extends React.Component<Props, State> {
  public state = { navPopup: false };

  public render(): React.ReactElement<HTMLDivElement> {
    const { navPopup } = this.state;
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);

    return (
      <header className={Styles.Header} role="banner">
        <Logo />
        <nav className={Styles.Navbar}>{links}</nav>
        <button className={Styles.Button} onClick={this.showNavPopup}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        {this.state.navPopup && <div />}
      </header>
    );
  }

  private showNavPopup = () => {
    this.setState({ navPopup: true });
  };

  private hideNavPopup = () => {
    this.setState({ navPopup: false });
  };

  private renderRoute = (route: Route, i: number) => {
    return (
      <Link
        key={i}
        to={route.path}
        isActive={route.active}
        className={`${Styles.NavbarItem} u-fadein-${i + 2}`}
      >
        {route.text}
      </Link>
    );
  };
}
