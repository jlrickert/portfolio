import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Background.css";
import backgroundImage from "./background.jpg";

const shader = `
`;

export interface IBackgoundProps {}
interface IBackgroundState {
  canvas?: HTMLCanvasElement;
  gl?: WebGLRenderingContext;
  supported: boolean;
  width: number;
  height: number;
}

class Background extends React.Component<IBackgoundProps, IBackgroundState> {
  public state: Readonly<IBackgroundState> = {
    supported: true,
    width: window.innerWidth,
    height: window.innerHeight
  };

  public componentDidMount(): void {
    console.debug("mounting");
    const div = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const canvas = div.getElementsByTagName("canvas")[0];
    console.debug(canvas);
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("webgl not supported");
      this.setState({ supported: false });
      return;
    }

    gl.clearColor(0.5, 0.5, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.setState({
      canvas,
      gl: gl || undefined,
      supported: true,
      width: canvas.width,
      height: canvas.height
    });
  }

  public componentWillUnmount(): void {
    const _ = this.state;
  }

  public componentWillMount(): void {}

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

export default Background;
