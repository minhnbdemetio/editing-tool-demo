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

    return `<path stroke="red" pathLength="1" stroke-width="5" d="M${
      this.width * 0.1
    },${this.height * 0.55} c 0,0,0,0,${this.width * 0.4},${
      this.height * 0.4
    } c 0,0,0,0,${this.width * 0.4},-${this.height * 0.4}
    a-${this.width * 0.2},-${this.height * 0.2} 0 0,0 -${this.width * 0.4},-${
      this.height * 0.4
    }
     a-${this.width * 0.2},-${this.height * 0.2} 0 0,0 -${this.width * 0.4},${
       this.height * 0.4
     }
    z"></path>`;
  }
}
