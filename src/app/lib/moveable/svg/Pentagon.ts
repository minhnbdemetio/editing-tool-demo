import { SvgShape } from './SvgShape';

export class Pentagon extends SvgShape {
  getSideLength() {
    const halfTriangleDegree = (36 * Math.PI) / 180; // Each triangle of the pentagon has 72 degrees
    const side = this.getTopX() / Math.cos(halfTriangleDegree);
    return side;
  }

  getTopX() {
    return this.width / 2;
  }

  getCoordinates() {
    const centerPoint = this.getCenterPoint();
    const topX = this.getTopX();
    const side = this.getSideLength();

    const topY = Math.sin((36 * Math.PI) / 180) * side;

    const bottomX = (this.width - side) / 2;

    return {
      x0: centerPoint,
      y0: 0,
      x1: centerPoint + topX,
      y1: topY,
      x2: this.width - bottomX,
      y2: this.height,
      x3: bottomX,
      y3: this.height,
      x4: centerPoint - topX,
      y4: topY,
    };
  }

  getPath(): string {
    const { x0, x1, x2, x3, x4, y0, y1, y2, y3, y4 } = this.getCoordinates();

    return `<path d="M${x0},${y0} L ${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4} Z" fill="currentColor"  isInit="true"></path>`;
  }
}
