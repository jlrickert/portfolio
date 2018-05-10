import * as React from "react";
import { Link } from "react-router-dom";

export interface IOverylayProps {
  /* routes: IHeaderLink[];*/
}

export class Overlay extends React.Component<IOverylayProps, {}> {
  public render() {
    return <div style={{ display: "none" }} />;
  }
}

export default Overlay;
