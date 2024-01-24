import { SVG } from '@svgdotjs/svg.js';
import { SvgShape } from './SvgShape';
const draw = SVG().size(300, 300);

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
    const round = this.width * 0.25;
    const side = this.width * 0.55;

    const width = this.width * 0.8;

    const squareYLength = this.height * 0.5;
    const squareXLength = this.width * 0.45;

    const beginX = this.width * 0.05;
    const beginY = this.height / 2;

    const r = squareYLength / 2 + this.height * 0.1;

    return `<path stroke="red" pathLength="1" stroke-width="5" d="M${beginX},${beginY} 
      l ${squareXLength} ${squareYLength} l ${squareXLength} -${squareYLength}
      a${r},${r} 0 0,0 -${this.width * 0.4},-${this.height * 0.4}
      a${r},${r} 0 0,0 -${this.width * 0.4},${this.height * 0.4}
    z"></path>`;
  }
}
