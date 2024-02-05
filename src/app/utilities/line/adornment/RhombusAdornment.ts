import { Adornment } from './Adornment';

export class RhombusAdornment extends Adornment {
  getAdornments(): { up: string; left: string; down: string; right: string } {
    const rhombusSide = this.getLength();

    const x = this.getX();
    const y = this.getY();

    const triangleSidePadding = 0;

    return {
      up: `M ${x} ${y} m 0,${
        rhombusSide * 2 + triangleSidePadding
      } l -${rhombusSide} -${rhombusSide} l ${rhombusSide} ${-rhombusSide} l ${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${rhombusSide} z`,
      down: `M ${x} ${y} m 0,${
        -rhombusSide * 2 - triangleSidePadding
      } l ${rhombusSide} ${rhombusSide} l -${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${-rhombusSide} l ${rhombusSide} -${rhombusSide} z`,
      left: `M ${x} ${y} m ${
        rhombusSide * 2 + triangleSidePadding
      },0 l -${rhombusSide} -${rhombusSide} l -${rhombusSide} ${rhombusSide} l ${rhombusSide} ${rhombusSide} l ${rhombusSide} -${rhombusSide} z`,
      right: `M ${x} ${y} m ${
        -rhombusSide * 2 - triangleSidePadding
      },0 l ${rhombusSide} -${rhombusSide} l ${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${rhombusSide} l ${-rhombusSide} -${rhombusSide} z`,
    };
  }

  getPadding(): number {
    return this.getLength() * 2;
  }
}
