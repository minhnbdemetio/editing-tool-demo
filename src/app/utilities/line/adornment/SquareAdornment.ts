import { Adornment } from './Adornment';

export class SquareAdornment extends Adornment {
  getAdornments(): { up: string; left: string; down: string; right: string } {
    const arrowLength = this.getLength();
    const arrowSide = arrowLength * 2;

    const x = this.getX();
    const y = this.getY();

    return {
      up: `M  ${x} ${y}  h -${
        arrowSide / 2
      } v ${arrowSide} h ${arrowSide} v -${arrowSide} z`,
      down: `M  ${x} ${y} h -${
        arrowSide / 2
      } v ${-arrowSide} h ${arrowSide} v ${arrowSide} z`,
      left: `M  ${x + arrowSide} ${y} l 0 -${
        arrowSide / 2
      } -${arrowSide} 0 0 ${arrowSide} ${arrowSide} 0 z`,
      right: `M  ${x}  ${y} l 0 -${
        arrowSide / 2
      } -${arrowSide} 0 0 ${arrowSide} ${arrowSide} 0 z`,
    };
  }

  getPadding(): number {
    return this.getLength() * 2;
  }
}
