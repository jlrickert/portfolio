import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Webgl from "./webgl";
import * as Shader from "./shaders";
import "./background.css";
import backgroundImage from "./background.jpg";

export interface IBackgoundProps {}

interface IBackgroundState {
  canvas?: HTMLCanvasElement;
  gl?: WebGLRenderingContext;
  supported: boolean;
  width: number;
  height: number;
}

export class Background extends React.Component<
  IBackgoundProps,
  IBackgroundState
> {
  public state: Readonly<IBackgroundState> = {
    supported: true,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  public componentDidMount(): void {
    console.debug("mounting");
    const div = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const canvas = div.getElementsByTagName("canvas")[0];
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
      );
      this.setState({ supported: false });
      return;
    }
    const background = new Webgl.Background(gl, backgroundImage);
    background.drawScene();

    this.setState({
      canvas,
      gl: gl || undefined,
      supported: true,
      width: canvas.width,
      height: canvas.height,
    });
  }

  public render(): React.ReactElement<HTMLDivElement> {
    console.debug("rendered");
    if (this.state.supported) {
      return (
        <div className="Background">
          <canvas
            className="Background-canvas"
            onMouseMove={this.handleMouseMovement}
          />
        </div>
      );
    } else {
      return (
        <div className="Background">
          <img src={backgroundImage} />
        </div>
      );
    }
  }

  private handleMouseMovement = (e: React.MouseEvent<any>): void => {
    e.preventDefault();
    console.debug(e);
    console.debug(e.clientX, e.clientY);
  };
}
