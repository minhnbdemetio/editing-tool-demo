import { SvgShape } from './SvgShape';

export class Heart extends SvgShape {
  beginPath() {
    const centerPoint = this.getCenterPoint();

    const beginPath = {
      x: centerPoint + this.width * 0.2,
      y: 0,
    };
    return `M${beginPath.x},${beginPath.y} `;
  }

  getPath(): string {
    return `
    <path  d="${this.beginPath()} c ${this.width * 0.2},0  z" />
    `;
  }
}
