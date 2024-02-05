import { Adornment } from './Adornment';

export class ArrowAdornment extends Adornment {
  outline: boolean = true;

  getAdornments(): { up: string; left: string; down: string; right: string } {
    const arrowLength = this.getLength();
    const arrowSide = arrowLength;

    const x = this.x;
    const y = this.y;

    return {
      up: `M ${x - arrowSide} ${
        y + arrowLength
      }  l ${arrowSide} ${-arrowSide}  ${arrowSide} ${arrowSide}`,
      down: `M ${x - arrowSide} ${
        y - arrowLength
      } l ${arrowSide} ${arrowSide}  ${arrowSide} ${-arrowSide}`,
      left: `M ${x + arrowLength} ${
        y - arrowSide
      } l ${-arrowSide} ${arrowSide}  ${arrowSide} ${arrowSide}`,
      right: `M ${x - arrowLength} ${
        y - arrowSide
      } l ${arrowSide} ${arrowSide}  ${-arrowSide} ${arrowSide}`,
    };
  }

  getPadding(): number {
    return (this.strokeWidth * 1) / 4;
  }
}
