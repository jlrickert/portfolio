import * as Three from "three";
import { randFloat, randomPoint, Point } from "../utils";

export type TColor = string | number | Three.Color;

export interface ILightOptions {
  radius: number;
  color: TColor;
  position: Point;
}

export class Light {
  private light: Three.PointLight;
  private geometry: Three.SphereGeometry;
  private mesh: Three.Mesh;

  private _position: Point;
  constructor(options: ILightOptions) {
    this._position = options.position;
    this.geometry = this.initGeometry(options.radius);
    this.mesh = this.initMesh(this.geometry, options.color);
    this.light = this.initLight(this.mesh, options.position, options.color);
  }

  public addToScene(scene: Three.Scene) {
    scene.add(this.light);
  }

  public get position(): Point {
    return this._position;
  }

  public set position(point: Point) {
    this._position = point;
    this.light.position.set(point.x, point.y, point.z);
  }

  private initGeometry(radius: number): Three.SphereGeometry {
    const segmentSize = 32;
    const sphere = new Three.SphereGeometry(radius, segmentSize, segmentSize);
    return sphere;
  }

  private initMesh(geometry: Three.SphereGeometry, color: TColor): Three.Mesh {
    const mesh = new Three.Mesh(
      geometry,
      new Three.MeshBasicMaterial({ color }),
    );
    return mesh;
  }

  private initLight(
    mesh: Three.Mesh,
    pos: Point,
    color: TColor,
  ): Three.PointLight {
    const intensity = 2;
    const light = new Three.PointLight(color, 2);
    light.position.set(pos.x, pos.y, pos.z);
    light.add(mesh);
    return light;
  }
}
