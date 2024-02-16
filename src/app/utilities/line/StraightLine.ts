import { SvgLine } from './Line';
import {
  BoundingRectPosition,
  IStraightLine,
  SvgLineType,
} from './Interface.Line';
import { AdornmentDirection } from './adornment/Adornment.interfaces';
import { Point } from './Point';
import { ElbowedLine } from './ElbowedLine';

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
    return this.points.getHead().getPosition();
  }

  getAngleByPoint = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    position: 'start' | 'end',
  ) => {
    const verticalHeight = Math.abs(y2 - y1);
    const horizontalWidth = Math.abs(x2 - x1);

    const tanRatio = verticalHeight / horizontalWidth;

    const basicAngle = Math.atan(tanRatio) * (180 / Math.PI) - 90;

    let angle = -basicAngle;

    if (y2 > y1 && x2 > x1) {
      angle = 180 - angle;
    }

    if (y2 > y1 && x1 > x2) {
      angle += 180;
    }

    if (x2 < x1 && y2 < y1) {
      angle = -angle;
    }

    if (position === 'start') return 180 + angle;

    return angle;
  };

  getRotateAngle(): number {
    const start = this.points.getHead();
    const end = start.getNext();

    if (end) {
      const { x: leftX, y: leftY } = start.getPosition();
      const { x: rightX, y: rightY } = end.getPosition();
      return this.getAngleByPoint(leftX, leftY, rightX, rightY, 'end') - 90;
    }

    return 0;
  }

  getLineWidth() {
    const start = this.points.getHead();
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

  public toElbowed() {
    this.type = SvgLineType.Elbowed;
    this.convertPointsToElbowed();

    return new ElbowedLine(this.toObject());
  }

  convertPointsToElbowed() {
    let point: Point | null = this.points.getHead();

    while (point) {
      const nextPosition = point.getNext()?.getPosition();

      if (nextPosition) {
        let pointPosition = point.getPosition();
        const isVerticalStraightLine = pointPosition.x === nextPosition.x;
        const isHorizontalStraightLine = pointPosition.y === nextPosition.y;

        if (!isHorizontalStraightLine && !isVerticalStraightLine) {
          const middle = new Point(
            pointPosition.x,
            nextPosition.y,
            point,
            point.getNext(),
          );
          point.getNext()?.setPrev(middle);
          point.setNext(middle);
        }
      }

      point = point.getNext();
    }
  }
}
