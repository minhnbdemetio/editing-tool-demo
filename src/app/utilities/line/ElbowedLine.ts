import { SvgLineType } from './Interface.Line';
import { SvgLine } from './Line';
import { LinePoint } from './Point';
import { AdornmentDirection } from './adornment/Adornment.interfaces';

export class ElbowedLine extends SvgLine {
  type: SvgLineType = SvgLineType.Elbowed;

  getLine(): string {
    const lines: string[] = [];

    let point: LinePoint | null = this.points;
    while (point) {
      const nextPoint: LinePoint | null = point.getNext();

      if (nextPoint) {
        const nextPosition = nextPoint.getPosition();
        const currentPosition = point.getPosition();
        const isVerticalLine = point.isEqual(currentPosition.x, nextPosition.x);
        const isHorizontal = point.isEqual(currentPosition.y, nextPosition.y);

        const hasNextCurve = point.hasNextCurve();
        const hasPrevCurve = point.hasPrevCurve();
        const isFirst = !point.getPrev();
        const isLast = !point.getNext()?.getNext();

        if (isHorizontal) {
          lines.push(
            this.getHorizontalLine(point.getDX(), {
              hasNextCurve,
              hasPrevCurve,
              isFirst,
              isLast,
              nextDy: point.getNext()?.getDY(),
            }),
          );
        } else if (isVerticalLine) {
          lines.push(
            this.getVerticalLine(point.getDY(), {
              hasNextCurve,
              hasPrevCurve,
              isFirst,
              isLast,
              nextDx: point.getNext()?.getDX(),
            }),
          );
        }
      }

      point = nextPoint;
    }

    const bounding = this.getBoundingPosition();

    const startPointPosition = this.points.getPosition();
    let startX = startPointPosition.x - bounding.x1;
    let startY = startPointPosition.y - bounding.y1;

    return this.addPath(
      `M ${+this.padding + startX},${+startY + this.padding}  ${lines.join(
        ' ',
      )}`,
      { fill: 'none', strokeDashArray: this.getSvgStrokeDashArray() },
    );
  }

  getDisplayPosition(): { x: number; y: number } {
    const bounding = this.getBoundingPosition();

    return { x: bounding.x1, y: bounding.y1 };
  }

  getRotateAngle(): number {
    return 0;
  }

  getStartAdornmentDirection(): AdornmentDirection {
    const dy = this.points.getDY();
    const dx = this.points.getDX();

    let direction: AdornmentDirection = 'up';

    if (dy !== 0) {
      if (dy > 0) direction = 'up';
      else direction = 'down';
    } else {
      if (dx > 0) direction = 'left';
      else direction = 'right';
    }

    return direction;
  }

  getEndAdornmentDirection(): AdornmentDirection {
    const dy = this.endPoint.getPrev()?.getDY() || 0;
    const dx = this.endPoint.getPrev()?.getDX() || 0;

    let direction: AdornmentDirection = 'up';

    if (dy !== 0) {
      if (dy > 0) direction = 'down';
      else direction = 'up';
    } else {
      if (dx > 0) direction = 'right';
      else direction = 'left';
    }

    return direction;
  }

  getStartAdornmentPosition(): { x: number; y: number } {
    const bounding = this.getBoundingPosition();

    const point = this.points;

    return {
      x: point.x - bounding.x1 + this.padding,
      y: point.y - bounding.y1 + this.padding,
    };
  }

  getEndAdornmentPosition(): { x: number; y: number } {
    const bounding = this.getBoundingPosition();

    const point = this.endPoint;

    return {
      x: point.x - bounding.x1 + this.padding,
      y: point.y - bounding.y1 + this.padding,
    };
  }
}
