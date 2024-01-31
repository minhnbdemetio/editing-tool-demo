import { Square } from './Square';

export class InvertedRoundCornerSquare extends Square {
  createBottomLeftCorner(): string {
    const bottomLeftCornerSize = this.getCornerSize(this.corners.bl);

    return `q${bottomLeftCornerSize},0,${bottomLeftCornerSize},${bottomLeftCornerSize}`;
  }

  createBottomRightCorner(): string {
    const bottomRightCornerSize = this.getCornerSize(this.corners.br);

    return `q0,${-bottomRightCornerSize},${bottomRightCornerSize},-${bottomRightCornerSize}`;
  }

  createTopRightCorner(): string {
    const bottomRightCornerSize = this.getCornerSize(this.corners.tr);

    return `q-${bottomRightCornerSize},0,-${bottomRightCornerSize},-${bottomRightCornerSize}`;
  }

  createTopLeftCorner(): string {
    const bottomLeftCornerSize = this.getCornerSize(this.corners.tl);

    return `q0,${bottomLeftCornerSize},-${bottomLeftCornerSize},${bottomLeftCornerSize}`;
  }
}
