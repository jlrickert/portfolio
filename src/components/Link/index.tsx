import * as React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

import * as Styles from "./link.module.css";
import { LocationDescriptor } from "history";

export interface Props extends LinkProps {
  isActive?: boolean;
}

export class Link extends React.Component<Props> {
  public render() {
    const { to, className, isActive, onClick } = this.props;
    const active = (isActive && Styles.Active) || "";
    const props = { ...this.props };
    delete props["isActive"];
    return (
      <RouterLink
        {...props}
        className={`${className || ""} ${Styles.Link} ${active}`}
      >
        {this.props.children}
      </RouterLink>
    );
  }
}

export default Link;
