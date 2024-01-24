import { SvgShape } from './SvgShape';

export abstract class Polygon extends SvgShape {
  getTopX() {
    return this.width / 2;
  }

  abstract getCoordinates(): { x: number; y: number }[];

  getPath(): string {
    const points = this.getCoordinates();

    const beginPath = points.shift();

    return `<path d="M${beginPath?.x},${beginPath?.y} L ${points
      .map(({ x, y }) => `${x},${y}`)
      .join(' ')} Z" fill="currentColor"  isInit="true"></path>`;
  }
}
