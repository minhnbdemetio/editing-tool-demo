import { Polygon } from './Polygon';

export class Hexagon extends Polygon {
  getCoordinates() {
    const centerPoint = this.getCenterPoint();

    const topY = (this.height * 15) / 100;

    return [
      { x: centerPoint, y: 0 },
      { x: this.width, y: topY },
      { x: this.width, y: this.height - topY },
      { x: centerPoint, y: this.height },
      { x: 0, y: this.height - topY },
      { x: 0, y: topY },
    ];
  }
}
