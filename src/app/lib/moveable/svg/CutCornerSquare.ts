import { Square } from './Square';

export class CutCornerSquare extends Square {
  createBottomLeftCorner(): string {
    const bottomLeftCornerSize = this.getCornerSize(this.corners.bl);

    return `l ${bottomLeftCornerSize},${bottomLeftCornerSize}`;
  }

  createBottomRightCorner(): string {
    const bottomRightCornerSize = this.getCornerSize(this.corners.br);

    return `l ${bottomRightCornerSize},-${bottomRightCornerSize}`;
  }

  createTopRightCorner(): string {
    const bottomRightCornerSize = this.getCornerSize(this.corners.tr);

    return `l -${bottomRightCornerSize},-${bottomRightCornerSize}`;
  }

  createTopLeftCorner(): string {
    const bottomLeftCornerSize = this.getCornerSize(this.corners.tl);

    return `l -${bottomLeftCornerSize},${bottomLeftCornerSize}`;
  }
}
