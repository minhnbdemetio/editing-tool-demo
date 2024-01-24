import { Polygon } from './Polygon';

export class Octagon extends Polygon {
  getCoordinates() {
    const centerPoint = this.getCenterPoint();
    const topX = this.getTopX();

    const topY = (this.height * 45) / 100;

    const bottomX = (this.width * 20) / 100;
    return [
      { x: centerPoint, y: 0 },
      { x: centerPoint + topX, y: topY },
      { x: this.width - bottomX, y: this.height },
      { x: bottomX, y: this.height },
      { x: centerPoint - topX, y: topY },
    ];
  }
}
