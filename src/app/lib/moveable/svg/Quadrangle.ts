import { Polygon } from './Polygon';

export class Quadrangle extends Polygon {
  getCoordinates() {
    const bottomOuterAngle = 10;

    const padding = this.strokeWidth / 2;

    const height = this.height - padding;
    const width = this.width - padding;
    const topPadding = Math.tan((bottomOuterAngle * Math.PI) / 180) * height;

    return [
      { x: padding, y: height },
      { x: Math.abs(topPadding), y: padding },
      { x: width - Math.abs(topPadding), y: padding },
      { x: width, y: height },
    ];
  }
}
