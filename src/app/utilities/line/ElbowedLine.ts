import { SvgLineType } from './Interface.Line';
import { SvgLine, SvgLineOptions } from './Line';
import { Point } from './Point';
import { StraightLine } from './StraightLine';
import { AdornmentDirection } from './adornment/Adornment.interfaces';

export class ElbowedLine extends SvgLine {
  type: SvgLineType = SvgLineType.Elbowed;

  getLine(): string {
    const lines: string[] = [];

    let point: Point | null = this.points.getHead();
    while (point) {
      const nextPoint: Point | null = point.getNext();

      if (nextPoint) {
        const isVerticalLine = point.isEqualX(nextPoint);
        const isHorizontal = point.isEqualY(nextPoint);

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

    const startPointPosition = this.points.getHead().getPosition();
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
    const dy = this.points.getHead().getDY();
    const dx = this.points.getHead().getDX();

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
    const dy = this.points.getEnd().getPrev()?.getDY() || 0;
    const dx = this.points.getEnd().getPrev()?.getDX() || 0;

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

    const point = this.points.getHead();

    return {
      x: point.x - bounding.x1 + this.padding,
      y: point.y - bounding.y1 + this.padding,
    };
  }

  getEndAdornmentPosition(): { x: number; y: number } {
    const bounding = this.getBoundingPosition();

    const point = this.points.getEnd();

    return {
      x: point.x - bounding.x1 + this.padding,
      y: point.y - bounding.y1 + this.padding,
    };
  }

  public mergeStraightLine() {
    if (this.getType() === SvgLineType.Elbowed) {
      let point: null | Point = this.points.getHead();

      while (point) {
        const next = point.getNext();
        const prev = point.getPrev();

        if (next && prev) {
          if (
            (Math.abs(next.x - point.x) <= this.toleranceNumber &&
              Math.abs(prev.x - point.x) <= this.toleranceNumber) ||
            (Math.abs(next.y - point.y) <= this.toleranceNumber &&
              Math.abs(prev.y - point.y) <= this.toleranceNumber)
          ) {
            this.points.remove(point);
          }
        }

        point = next;
      }
    }
  }

  public updatePoints(
    startId: string,
    endId: string,
    point: { x?: number; y?: number },
  ) {
    if (this.getType() === SvgLineType.Elbowed && startId && endId) {
      const start = this.points.findById(startId);
      const end = start?.getNext();
      if (start && end) {
        if (point.y) {
          start.y = point.y;
          end.y = point.y;
        }
        if (point.x) {
          start.x = point.x;
          end.x = point.x;
        }
      }
    }
  }

  public getLinePositions() {
    if (this.type !== SvgLineType.Elbowed) return [];

    const positions: {
      x1: number;
      y1: number;
      startId: string;
      endId: string;
      y2: number;
      x2: number;
    }[] = [];

    let point: null | Point = this.points.getHead();

    while (point) {
      const next = point.getNext();

      if (next) {
        positions.push({
          startId: point.id,
          x1: point.x,
          y1: point.y,
          endId: next.id,
          x2: next.x,
          y2: next.y,
        });
      }

      point = point.getNext();
    }

    return positions;
  }

  public createNewHead(id: string, x: number, y: number) {
    const newHead = new Point(x, y, null, null);
    this.points.addBefore(this.points.getHead(), newHead);
  }

  public createNewEnd(id: string, x: number, y: number) {
    const newPoint = new Point(x, y, null, null);
    this.points.addAfter(this.points.getEnd(), newPoint);
  }

  public toStraight() {
    this.type = SvgLineType.Straight;
    this.points.getHead().setNext(this.points.getEnd());
    this.points.getEnd().setPrev(this.points.getHead());

    return new StraightLine(this.toObject());
  }
}
