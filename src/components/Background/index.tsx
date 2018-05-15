import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Three from "three";

import * as Styles from "./background.module.css";
import { Light } from "./Light";
import { LightController } from "./LightController";
import { randomPoint, Point } from "./utils";

export interface Props {
  lightCount: number;
}

interface State {
  running: boolean;
  width: number;
  height: number;
}

export class Background extends React.Component<Props, State> {
  private canvas: HTMLCanvasElement;
  private renderer: Three.WebGLRenderer;
  private camera: Three.PerspectiveCamera;
  private scene: Three.Scene;
  private lights: LightController[];

  constructor(props: Props) {
    super(props);
    this.state = {
      running: false,
      width: 0,
      height: 0,
    };
  }

  public componentDidMount(): void {
    const canvas = ReactDOM.findDOMNode(this) as HTMLCanvasElement;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const aspect = width / height;

    this.canvas = canvas;
    this.renderer = this.initRenderer(canvas);
    this.camera = this.initCamera(aspect);
    this.scene = this.initScene();
    this.lights = this.initLights(this.props.lightCount, this.scene);
    window.addEventListener("resize", this.onResize, false);
    window.addEventListener("mousemove", this.handleMouseMovement, false);

    requestAnimationFrame(this.animate);
    this.setState({ running: true, width, height });
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.handleMouseMovement);
    this.setState({ running: false });
  }

  public render(): React.ReactElement<HTMLDivElement> {
    return <canvas className={Styles.Background} />;
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

  private onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
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

  private handleMouseMovement = (ev: MouseEvent) => {
    ev.preventDefault();
  };
}
