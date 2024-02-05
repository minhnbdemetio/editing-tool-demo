import { getAngleByPoint } from '../line';
import { SvgLine } from './Line';
import {
  BoundingRectPosition,
  IStraightLine,
  SvgLineType,
} from './Interface.Line';
import { LinePoint } from './Point';
import { AdornmentDirection } from './adornment/Adornment.interfaces';

export class StraightLine extends SvgLine implements IStraightLine {
  type: SvgLineType = SvgLineType.Straight;

  getLine(): string {
    const line: string = this.getHorizontalLine(this.getLineWidth(), {
      isFirst: true,
      isLast: true,
    });
    return this.addPath(`M ${+this.padding},${+this.padding}  ${line}`, {
      fill: 'none',
      strokeDashArray: this.getSvgStrokeDashArray(),
    });
  }

  getDisplayPosition() {
    return this.points.getPosition();
  }

  getRotateAngle(): number {
    const start = this.points;
    const end = start.getNext();

    if (end) {
      const { x: leftX, y: leftY } = start.getPosition();
      const { x: rightX, y: rightY } = end.getPosition();
      return getAngleByPoint(leftX, leftY, rightX, rightY, 'end') - 90;
    }

    return 0;
  }

  getLineWidth() {
    const start = this.points;
    const end = start.getNext();

    if (end) {
      const { x: rightX, y: rightY } = end.getPosition();
      const { x: leftX, y: leftY } = start.getPosition();
      const vertical = rightX - leftX;
      const horizontal = rightY - leftY;
      let lineWidth = Math.sqrt(
        Math.pow(vertical, 2) + Math.pow(horizontal, 2),
      );

      return lineWidth;
    }

    return 0;
  }

  public getBoundingPosition(relative?: boolean): BoundingRectPosition {
    if (this.type === SvgLineType.Straight && !relative) {
      const lineWidth = this.getLineWidth();
      const arrowLength = this.getAdornmentLength();
      return {
        x1: 0,
        y1: 0,
        x2: lineWidth,
        y2: 0,
        x3: arrowLength,
        y3: 0,
        x4: lineWidth,
        y4: arrowLength,
      };
    }

    return super.getBoundingPosition();
  }

  getStartAdornmentDirection(): AdornmentDirection {
    return 'left';
  }

  getEndAdornmentDirection(): AdornmentDirection {
    return 'right';
  }

  getStartAdornmentPosition(): { x: number; y: number } {
    return { x: this.padding, y: this.padding };
  }

  getEndAdornmentPosition(): { x: number; y: number } {
    return { x: this.padding + this.getLineWidth(), y: this.padding };
  }
}
