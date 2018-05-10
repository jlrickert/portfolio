import * as React from "react";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import { IHeaderLink } from ".";

export interface IOverylayProps {
  readonly routes: IHeaderLink[];
  readonly closeFn: () => void;
}

export class Overlay extends React.Component<IOverylayProps, {}> {
  public render() {
    const { routes } = this.props;
    const links = routes.map(this.renderRoute);

    return (
      <div className="Overlay">
        <ul className="Overlay__items">{links}</ul>
        <button className="Overlay__close" onClick={this.props.closeFn}>
          <FontAwesomeIcon size="10x" icon={faTimes} />
        </button>
      </div>
    );
  }

  private renderRoute = (route: IHeaderLink, i: number) => {
    const active = route.active ? "active" : "";
    return (
      <li key={i} className="Overlay__item ">
        <Link
          to={route.path}
          className={`u-fadein-${i + 2} ${active}`}
          onClick={this.props.closeFn}
        >
          {route.text}
        </Link>
      </li>
    );
  };
}

export default Overlay;
