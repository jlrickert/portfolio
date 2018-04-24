import * as React from "react";
import * as ReactDOM from "react-dom";
import Radium from "radium";

import * as Webgl from "./webgl";
import { CubeBackground } from "./cube";
import backgroundImage from "./background.jpg";

export interface IBackgoundProps {}

interface IBackgroundState {
  canvas?: HTMLCanvasElement;
  gl?: WebGLRenderingContext;
  supported: boolean;
  width: number;
  height: number;
}

export const styles = {
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  } as React.CSSProperties,
  cavas: {
    width: "100%",
    height: "100%",
  } as React.CSSProperties,
  fallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  } as React.CSSProperties,
} as { [key: string]: React.CSSProperties };

@Radium
export class Background extends React.Component<
  IBackgoundProps,
  IBackgroundState
> {
  public state: Readonly<IBackgroundState> = {
    supported: false,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  public componentDidMount(): void {
    const div = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const supported = this.checkCompatibility();
    if (supported) {
      this.initWebGLBackground(div);
    } else {
      this.setState({
        supported: false,
        width: div.clientWidth,
        height: div.clientHeight,
      });
    }
  }

  public render(): React.ReactElement<HTMLDivElement> {
    const elem = (() => {
      if (this.state.supported) {
        return <canvas style={styles.canvas} />;
      } else {
        return <div style={styles.fallback} />;
      }
    })();
    return (
      <div style={styles.base} className="Background">
        {elem}
      </div>
    );
  }

  private checkCompatibility(): boolean {
    return false;
  }

  private initWebGLBackground(div: HTMLDivElement): void {
    const canvas = div.getElementsByTagName("canvas")[0];
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
      );
      this.setState({
        supported: false,
        width: div.clientWidth,
        height: div.clientHeight,
      });
      return;
    }
    /* const background = new Webgl.Background(gl, backgroundImage);*/
    const background = new CubeBackground(gl, backgroundImage);
    background.render();

    this.setState({
      canvas,
      gl: gl || undefined,
      supported: true,
      width: canvas.width,
      height: canvas.height,
    });
  }

  private handleMouseMovement = (e: React.MouseEvent<any>): void => {
    e.preventDefault();
    console.debug(e);
    console.debug(e.clientX, e.clientY);
  };
}
