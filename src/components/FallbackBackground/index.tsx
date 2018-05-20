import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Styles from "./fb.module.css";
import { Props } from "../Background";

interface State {
  width: number;
  height: number;
}

export class Background extends React.Component<Props, State> {
  canvas: HTMLCanvasElement;

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  public render() {
    return <canvas className={Styles.Background} />;
  }

  private onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.height = height;
    this.canvas.width = width;
    /* this.camera.aspect = width / height;
     * this.camera.updateProjectionMatrix();
     * this.renderer.setSize(width, height);*/
    this.setState({ width, height });
  };
}
export default Background;
