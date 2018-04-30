import { Light } from "./Light";
import { Point, randomPoint } from "../utils";

export class LightController {
  private checkpoint: Point;
  private destination: Point;
  private velocity: Point;

  constructor(private light: Light) {
    this.checkpoint = light.position;
    this.velocity = new Point(0, 0, 0);
    this.destination = Point.newRandomRange(-8, 8);
  }

  public draw(timstamp: number) {
    // console.debug(
    //   `Position: ${this.position.stringify()}, Velocity: ${this.velocity.stringify()}`,
    // );
    if (this.pastDestination()) {
      this.checkpoint = this.destination;
      this.destination = Point.newRandomRange(-8, 8);
      // console.debug(
      //   `New destination ${JSON.stringify(this.destination.stringify())}`,
      // );
    }

    const dist = this.light.position.distanceTo(this.destination);
    const totalDist = this.destination.distanceTo(this.checkpoint);
    const progress = 1.0 - dist / totalDist;
    const vx = 0.01 * (this.destination.x - this.position.x);
    const vy = 0.01 * (this.destination.y - this.position.y);
    const vz = 0.01 * (this.destination.z - this.position.z);
    this.velocity = new Point(0.5, 0.5, 0.5).mult(
      this.velocity.sub(new Point(vx, vy, vz)),
    );
    this.light.position = this.light.position.add(this.velocity);
  }

  private get position(): Point {
    return this.light.position;
  }

  private set position(point: Point) {
    this.light.position = point;
  }

  private pastMidPoint(): boolean {
    const a = this.destination.distanceTo(this.checkpoint);
    const b = this.destination.distanceTo(this.light.position);
    return b < a / 2.0;
  }

  private pastDestination(): boolean {
    const a = this.destination.distanceTo(this.checkpoint);
    const b = this.destination.distanceTo(this.light.position);
    return b < a;
  }
}
