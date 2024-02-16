import { Polygon } from './Polygon';

export class Octagon extends Polygon {
  getCoordinates() {
    const padding = this.getPadding();
    const octagonCut = padding + this.getWidth() / 4;
    const height = this.getRelativeHeight();
    const width = this.getRelativeWidth();

    return [
      { x: octagonCut, y: padding },
      { x: width - octagonCut, y: padding },
      { x: width, y: octagonCut },
      { x: width, y: height - octagonCut },
      { x: width - octagonCut, y: height },
      { x: octagonCut, y: height },
      { x: padding, y: height - octagonCut },
      { x: padding, y: octagonCut },
    ];
  }
}
