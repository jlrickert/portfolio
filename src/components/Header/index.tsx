import * as React from "react";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import * as Styles from "./header.module.css";
import { Container } from "../Container";
import { Link } from "../Link";
import { RouteData } from "../App";

export interface Props {
  routes: RouteData[];
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

const MenuToggle = (props: { isActive?: boolean; onClick: () => void }) => {
  const { isActive } = props;
  const active = isActive ? Styles.Active : "";
  return (
    <button
      className={`${Styles.MenuToggle} ${active}`}
      onClick={props.onClick}
    >
      <div className={Styles.One} />
      <div className={Styles.Two} />
      <div className={Styles.Three} />
    </button>
  );
};

const Overlay = (props: { routes: RouteData[]; onClose: () => void }) => {
  const links = props.routes.map((route, i) => {
    return (
      <li key={i}>
        <Link to={route.path} onClick={props.onClose} isActive={route.active}>
          {route.text}
        </Link>
      </li>
    );
  });

  return (
    <div className={`${Styles.Overlay} fixed`}>
      <ul>{links}</ul>
    </div>
  );
};

export class Header extends React.Component<Props, State> {
  public state = { navPopup: false };

  public render(): React.ReactElement<HTMLDivElement> {
    const { navPopup } = this.state;
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);
    const navOpen = navPopup ? Styles.Open : "";

    return (
      <header className={`${Styles.Header} sticky`}>
        <div className={Styles.Wrapper} role="banner">
          <Logo />
          <nav className={`${Styles.Navbar}`}>
            <ul>{links}</ul>
          </nav>
          <MenuToggle
            isActive={navPopup}
            onClick={navPopup ? this.hideNavPopup : this.showNavPopup}
          />
          {this.state.navPopup && (
            <Overlay routes={routes} onClose={this.hideNavPopup} />
          )}
        </div>
      </header>
    );
  }

  private showNavPopup = () => {
    this.setState({ navPopup: true });
  };

  private hideNavPopup = () => {
    this.setState({ navPopup: false });
  };

  private renderRoute = (route: RouteData, i: number) => {
    return (
      <li key={i}>
        <Link
          to={route.path}
          isActive={route.active}
          className={`${Styles.NavbarItem} u-fadein-${i + 2}`}
        >
          {route.text}
        </Link>
      </li>
    );
  };
}
