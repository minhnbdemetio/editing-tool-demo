import { getAngleByPoint } from '../line';
import { SvgLine } from './Line';
import {
  AdornmentDirection,
  BoundingRectPosition,
  SvgLineType,
} from './Interface.Line';
import { LinePoint } from './Point';

export class StraightLine extends SvgLine {
  type: SvgLineType = SvgLineType.Straight;

  getLine(): string {
    const line: string = this.getHorizontalLine(this.getStraightLineWidth(), {
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

  public getBoundingPosition(relative?: boolean): BoundingRectPosition {
    if (this.type === SvgLineType.Straight && !relative) {
      const lineWidth = this.getStraightLineWidth();
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
}
