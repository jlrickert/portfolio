import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import * as Styles from "./link.module.css";
import { LocationDescriptor } from "history";

export interface Props {
  to: LocationDescriptor;
  className?: string;
  isActive?: boolean;
}

export class Link extends React.Component<Props> {
  public render() {
    const { to, className, isActive } = this.props;
    const active = (isActive && Styles.Active) || "";
    return (
      <RouterLink
        to={to}
        className={`${className || ""} ${Styles.Link} ${active}`}
      >
        {this.props.children}
      </RouterLink>
    );
  }
}

export default Link;
