export class Point {
  public static newRandomRange(min: number, max: number) {
    return new Point(
      randFloat(min, max),
      randFloat(min, max),
      randFloat(min, max),
    );
  }
  constructor(public x: number, public y: number, public z: number) {}

  public add(point: Point): Point {
    return new Point(point.x + this.x, point.y + this.y, point.z + this.z);
  }

  public sub(point: Point): Point {
    return new Point(point.x - this.x, point.y - this.y, point.z - this.z);
  }

  public mult(point: Point): Point {
    return new Point(point.x * this.x, point.y * this.y, point.z * this.z);
  }

  public distanceTo(point: Point) {
    const dx = point.x - this.x;
    const dy = point.y - this.y;
    const dz = point.z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public toJson(): { x: number; y: number; z: number } {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  public stringify(): string {
    return JSON.stringify(this.toJson());
  }
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomPoint(min: Point, max: Point): Point {
  return new Point(
    randFloat(min.x, max.x),
    randFloat(min.y, max.y),
    randFloat(min.z, max.y),
  );
}

export enum EColors {
  Red = 0xffffff,
  Green = 0xffffff,
  Blue = 0xffffff,
  Voilet = 0xffffff,
}

export const colors = [
  EColors.Red,
  EColors.Green,
  EColors,
  EColors.Blue,
  EColors.Voilet,
];

export function randomColor() {}
