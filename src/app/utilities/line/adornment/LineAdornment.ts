import { Adornment } from './Adornment';

export class LineAdornment extends Adornment {
  getAdornments(): { up: string; left: string; down: string; right: string } {
    const arrowLength = this.getLength();
    const lineSide = arrowLength - this.strokeWidth / 2;

    const x = this.getX();
    const y = this.getY();

    return {
      up: `M ${x} ${y} m ${lineSide},0 h ${-lineSide * 2}`,
      down: `M ${x} ${y} m ${lineSide},0 h ${-lineSide * 2}`,
      left: `M ${x} ${y} m 0,${-lineSide} v ${lineSide * 2}`,
      right: `M ${x} ${y} m 0,${-lineSide} v ${lineSide * 2}`,
    };
  }

  getPadding(): number {
    return -this.strokeWidth / 2;
  }
}
