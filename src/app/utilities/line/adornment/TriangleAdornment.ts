import { Adornment } from './Adornment';

export class TriangleAdornment extends Adornment {
  getAdornments(): { up: string; left: string; down: string; right: string } {
    const arrowLength = this.getLength();
    const arrowSide = arrowLength - this.strokeWidth / 2;

    const x = this.getX();
    const y = this.getY();

    return {
      up: `M ${x} ${y} m ${-this.strokeWidth},${arrowSide} h -${
        arrowSide / 2
      } l ${arrowSide} ${-arrowSide} ${arrowSide} ${arrowSide} z`,
      down: `M ${x} ${y} m ${-this.strokeWidth},${-arrowSide} h -${
        arrowSide / 2
      } l ${arrowSide} ${arrowSide} ${arrowSide} -${arrowSide} z`,
      left: `M ${x} ${y} m ${arrowSide},${-this.strokeWidth} v -${
        arrowSide / 2
      } l ${-arrowSide} ${arrowSide} ${arrowSide} ${arrowSide} z`,
      right: `M ${x} ${y} m ${-arrowSide},${-this.strokeWidth} v -${
        arrowSide / 2
      } l ${arrowSide} ${arrowSide} ${-arrowSide} ${arrowSide} z`,
    };
  }

  getPadding(): number {
    return this.getLength();
  }
}
