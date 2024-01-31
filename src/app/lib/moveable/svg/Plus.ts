import { SvgShape } from './SvgShape';

export class Plus extends SvgShape {
  getPath(): string {
    const squareYLength = this.height * 0.5;

    const width = this.width - this.strokeWidth / 2;
    const height = this.height - this.strokeWidth / 2;

    const x = width / 3;
    const y = height / 3;

    const plusWidth = width / 3;
    const plusHeight = height / 3;

    return `<path stroke="${this.stroke}" stroke-width="${
      this.strokeWidth
    }" fill="currentColor" d="M ${x},0 
    l ${plusWidth},0 l 0,${y} 
    l ${x},0 l 0,${plusHeight}
    l -${x},0 l 0,${plusHeight}
    l -${plusWidth},0 l 0,-${y}
     l -${x},0 l 0,${-plusHeight} l ${x},0
    Z" ></path>`;
  }
}
