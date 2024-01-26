import { SVG } from '@svgdotjs/svg.js';
import { SvgShape } from './SvgShape';
const draw = SVG().size(300, 300);

export class Arrow extends SvgShape {
  getPath(): string {
    const squareYLength = this.height * 0.5;

    const width = this.width - this.strokeWidth;
    const height = this.height - this.strokeWidth * 2;

    const halfWidth = width / 2;

    const beginY = this.height / 4 + this.strokeWidth / 2;

    return `<path stroke="${this.stroke}" stroke-width="${
      this.strokeWidth
    }" fill="currentColor" 
    d="M ${this.strokeWidth / 2},${beginY} 
    l ${width / 2},0 0,-${height / 4} ${halfWidth},${height / 2}
    ${-halfWidth},${height / 2} 0,${-height / 4},${-halfWidth},0
    Z" ></path>`;
  }
}
