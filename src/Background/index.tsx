import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Three from "three";

import "./styles.css";
import { Light } from "./Light";
import { LightController } from "./LightController";
import { randomPoint, Point } from "../utils";

export interface IBackgoundProps {
  lightCount: number;
}

interface IBackgroundState {
  supported: boolean;
  running: boolean;
  width: number;
  height: number;
}

export class Background extends React.Component<
  IBackgoundProps,
  IBackgroundState
> {
  private div: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private renderer: Three.WebGLRenderer;
  private camera: Three.PerspectiveCamera;
  private scene: Three.Scene;
  private lights: LightController[];

  constructor(props: IBackgoundProps) {
    super(props);
    this.state = {
      supported: this.checkCompatibility(),
      running: false,
      width: 0,
      height: 0,
    };
  }

  public componentDidMount(): void {
    const div = ReactDOM.findDOMNode(this) as HTMLDivElement;
    this.div = div;
    if (!this.state.supported) {
      this.setState({
        width: div.clientWidth,
        height: div.clientHeight,
      });
      return;
    }

    const canvas = div.getElementsByTagName("canvas")[0];
    const width = div.clientWidth;
    const height = div.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const aspect = width / height;

    this.canvas = canvas;
    this.renderer = this.initRenderer(canvas);
    this.camera = this.initCamera(aspect);
    this.scene = this.initScene();
    this.lights = this.initLights(this.props.lightCount, this.scene);
    window.addEventListener("resize", this.onSupportedResize, false);
    window.addEventListener("mousemove", this.handleMouseMovement, false);
    requestAnimationFrame(this.animate);
    this.setState({ supported: true, running: true, width, height });
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onSupportedResize);
    window.removeEventListener("mousemove", this.handleMouseMovement);
    this.setState({ running: false });
  }

  public render(): React.ReactElement<HTMLDivElement> {
    const elem = (() => {
      if (this.state.supported) {
        return <canvas className="Background-canvas" />;
      } else {
        return <div className="Background-fallback" />;
      }
    })();
    return <div className="Background">{elem}</div>;
  }

  private initScene(): Three.Scene {
    const scene = new Three.Scene();
    return scene;
  }

  private initLights(
    lightCount: number,
    scene: Three.Scene,
  ): LightController[] {
    const lights = [];
    for (let i = 0; i < this.props.lightCount; i += 1) {
      const position = Point.newRandomRange(-8, 8);
      const light = new Light({ position, radius: 0.05, color: 0xfb88ee });
      const controller = new LightController(light);
      light.addToScene(scene);
      lights.push(controller);
    }
    return lights;
  }

  private animate = (timestamp: number) => {
    this.lights.map(light => light.draw(timestamp));
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  private onSupportedResize = () => {
    const width = this.div.clientWidth;
    const height = this.div.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.setState({ width, height });
  };

  private initRenderer(canvas: HTMLCanvasElement): Three.WebGLRenderer {
    const renderer = new Three.WebGLRenderer({ antialias: true, canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#000000");
    return renderer;
  }

  private initCamera(aspect: number): Three.PerspectiveCamera {
    const camera = new Three.PerspectiveCamera(75, aspect, 0.1, 2000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
    return camera;
  }

  private checkCompatibility(): boolean {
    return true;
  }

  private handleMouseMovement = (ev: MouseEvent): any => {
    ev.preventDefault();
    /* console.debug(ev.clientX, ev.clientY);*/
  };
}
