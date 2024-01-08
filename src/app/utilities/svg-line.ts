import { getAngleByPoint } from './line';
import { LinePoint } from './line-point';

export enum SvgLineAdornment {
  Arrow = 'arrow',
  Triangle = 'triangle',
  Square = 'square',
  Rhombus = 'rhombus',
  OutlinedSquare = 'outlined-square',
  OutlinedRhombus = 'outlined-rhombus',
  OutlinedTriangle = 'outlined-triangle',
  None = 'none',
}

export enum SvgLineAdornmentPosition {
  Start = 'start',
  End = 'end',
}

export enum SvgLineType {
  Straight = 'straight',
  Elbowed = 'elbowed',
}

export class SvgLine {
  private strokeWidth: number;
  private length: number;
  private stroke: string;
  private startAdornment: SvgLineAdornment;
  private endAdornment: SvgLineAdornment;
  private padding: number = 6;
  private type: SvgLineType;
  private cornerRounding: number;
  points: LinePoint;
  endPoint: LinePoint;
  private toleranceNumber = 0.5;

  constructor(
    options: {
      strokeWidth?: number;
      length?: number;
      stroke?: string;
      startAdornment?: SvgLineAdornment;
      endAdornment?: SvgLineAdornment;
      type?: SvgLineType.Elbowed | SvgLineType.Straight;
      cornerRounding?: number;
    } = {},
  ) {
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth || 2;
    this.startAdornment = options.startAdornment || SvgLineAdornment.None;
    this.endAdornment = options.endAdornment || SvgLineAdornment.None;
    this.length = options.length || 50;
    this.type = options.type || SvgLineType.Straight;
    this.cornerRounding = options.cornerRounding || 10;

    const end = new LinePoint(100, 50, null, null);
    const start = new LinePoint(20, 20, null, end);

    end.setPrev(start);

    this.points = start;
    this.endPoint = end;
  }

  private addPath(d: string, options: { fill?: string } = {}): string {
    let pathOptions: string[] = [];
    if (!!options.fill) pathOptions.push(`fill="${options.fill}"`);
    return `<path d="${d}" ${pathOptions.join(' ')} />`;
  }

  getCenterPoint(): number {
    const { height } = this.getDimensions();
    return height / 2;
  }

  private getStraightLine() {
    const start = this.points;
    const end = start.getNext();
    const { left } = this.getLineAdornmentPadding();
    const centerPoint = this.getCenterPoint();

    if (end) {
      let lineWidth = this.getStraightLineWidth();

      return this.addPath(
        `M ${left + this.padding} ${centerPoint} l ${lineWidth},0`,
      );
    }

    return '';
  }

  private getLine(): string {
    const { left } = this.getLineAdornmentPadding();

    if (this.getType() === SvgLineType.Straight) return this.getStraightLine();

    const lines: string[] = [];

    let point: LinePoint | null = this.points;
    while (point) {
      const nextPoint = point.getNext();

      if (nextPoint) {
        const nextPosition = nextPoint.getPosition();
        const currentPosition = point.getPosition();
        const isVerticalLine = point.isEqual(currentPosition.x, nextPosition.x);
        const isHorizontal = point.isEqual(currentPosition.y, nextPosition.y);

        if (isVerticalLine) {
          let dy = point.getDY();
          const nextDx = point.getNext()?.getDX();

          if (dy >= this.toleranceNumber) {
            if (point.hasNextCurve()) dy -= this.cornerRounding;
            if (point.hasPrevCurve()) dy -= this.cornerRounding;

            if (nextDx && nextDx > this.toleranceNumber) {
              lines.push(` v ${dy}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q 0,${this.cornerRounding} ${this.cornerRounding},${this.cornerRounding}`,
                );
              }
            } else {
              lines.push(` v ${dy}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q 0,${this.cornerRounding} ${-this.cornerRounding},${
                    this.cornerRounding
                  }`,
                );
              }
            }
          } else {
            if (point.hasNextCurve()) dy += this.cornerRounding;
            if (point.hasPrevCurve()) dy += this.cornerRounding;
            if (nextDx && nextDx > this.toleranceNumber) {
              lines.push(` v ${dy}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q 0,${-this.cornerRounding} ${this.cornerRounding},${-this
                    .cornerRounding}`,
                );
              }
            } else {
              lines.push(` v ${dy}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q 0,${-this.cornerRounding} ${-this.cornerRounding},${-this
                    .cornerRounding}`,
                );
              }
            }
          }
        }
        if (isHorizontal) {
          let dx = point.getDX();

          const nextDy = point.getNext()?.getDY();

          if (dx >= 0) {
            if (point.hasNextCurve()) dx -= this.cornerRounding;

            if (point.hasPrevCurve()) {
              dx -= this.cornerRounding;
            }

            if (nextDy && nextDy >= 0) {
              lines.push(` h ${dx}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q ${this.cornerRounding},0 ${this.cornerRounding},${this.cornerRounding}`,
                );
              }
            } else {
              lines.push(` h ${dx}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q ${this.cornerRounding},0 ${this.cornerRounding},${-this
                    .cornerRounding}`,
                );
              }
            }
          } else {
            if (point.hasNextCurve()) dx += this.cornerRounding;
            if (point.hasPrevCurve()) {
              dx += this.cornerRounding;
            }

            if (nextDy && nextDy >= 0) {
              lines.push(` h ${dx}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q ${-this.cornerRounding},0 ${-this.cornerRounding},${
                    this.cornerRounding
                  }`,
                );
              }
            } else {
              lines.push(` h ${dx}`);

              if (!!point.hasNextCurve()) {
                lines.push(
                  ` q ${-this.cornerRounding},0 ${-this.cornerRounding},${-this
                    .cornerRounding}`,
                );
              }
            }
          }
        }
      }

      point = nextPoint;
    }

    const bounding = this.getBoundingPosition();

    const startPointPosition = this.points.getPosition();
    const startX = startPointPosition.x - bounding.x1;
    const startY = startPointPosition.y - bounding.y1;

    return this.addPath(
      `M ${left + this.padding + startX} ${startY + this.padding} ${lines.join(
        ' ',
      )}`,
      { fill: 'none' },
    );
  }
  private getAdornment(
    position: SvgLineAdornmentPosition.Start | SvgLineAdornmentPosition.End,
  ): string {
    const start = this.points;

    const bouding = this.getBoundingPosition();

    const adornment =
      position === SvgLineAdornmentPosition.Start
        ? this.startAdornment
        : this.endAdornment;
    switch (adornment) {
      case SvgLineAdornment.Arrow:
        return this.getArrowAdornment(
          this.getAdornmentDirection(start),
          start.x - bouding.x1 + this.padding,
          start.y - bouding.y1 + this.padding,
        );
      case SvgLineAdornment.Triangle:
        return this.getTriangleAdornment(position);
      case SvgLineAdornment.OutlinedTriangle:
        return this.getTriangleAdornment(position, true);
      default:
        return '';
    }
  }

  private getAdornmentDirection(startPoint: LinePoint) {
    const dy = startPoint.getDY();
    const dx = startPoint.getDX();

    let direction: 'up' | 'left' | 'down' | 'right' = 'up';

    if (dy !== 0) {
      if (dy > 0) direction = 'down';
      else direction = 'up';
    } else {
      if (dx > 0) direction = 'right';
      else direction = 'left';
    }

    return direction;
  }

  private getArrowAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
  ): string {
    const arrowLength = this.strokeWidth * 3;

    switch (direction) {
      case 'down': {
        return this.addPath(
          `M ${x - arrowLength} ${
            y + arrowLength
          }  l ${arrowLength} ${-arrowLength}  ${arrowLength} ${arrowLength}`,
          { fill: 'none' },
        );
      }
      case 'right': {
        return this.addPath(
          `M ${x + arrowLength} ${
            y - arrowLength
          } l ${-arrowLength} ${arrowLength}  ${arrowLength} ${arrowLength}`,
          { fill: 'none' },
        );
      }
      case 'left': {
        return this.addPath(
          `M ${x - arrowLength} ${
            y - arrowLength
          } l ${arrowLength} ${arrowLength}  ${-arrowLength} ${arrowLength}`,
          { fill: 'none' },
        );
      }
      case 'up': {
        return this.addPath(
          `M ${x - arrowLength} ${
            y - arrowLength
          } l ${arrowLength} ${arrowLength}  ${arrowLength} ${-arrowLength}`,
          { fill: 'none' },
        );
      }
    }
  }

  private getAdornmentLength(): number {
    return this.strokeWidth * 3;
  }

  private getTriangleAdornment(
    position: SvgLineAdornmentPosition,
    outlined?: boolean,
  ): string {
    const centerPoint = this.getCenterPoint();
    const arrowLength =
      this.getAdornmentLength() *
      (position === SvgLineAdornmentPosition.End ? 1 : -1);
    const startDrawArrowY = centerPoint - arrowLength;
    const startDrawArrowX =
      position === SvgLineAdornmentPosition.End
        ? this.length - arrowLength
        : this.padding - arrowLength;
    return this.addPath(
      `M ${startDrawArrowX} ${startDrawArrowY} l ${arrowLength} ${arrowLength}  ${-arrowLength} ${arrowLength} z`,
      { fill: outlined ? 'none' : '' },
    );
  }

  private getLineAdornmentPadding(): { left: number; right: number } {
    const adornmentPadding: { left: number; right: number } = {
      left: 0,
      right: 0,
    };
    switch (this.startAdornment) {
      case SvgLineAdornment.OutlinedTriangle:
        adornmentPadding.left = this.getAdornmentLength();
        break;
    }
    switch (this.endAdornment) {
      case SvgLineAdornment.OutlinedTriangle:
        adornmentPadding.right = -this.getAdornmentLength();
        break;
    }
    return adornmentPadding;
  }

  private getStraightLineWidth() {
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

  private getDimensions: () => { length: number; height: number } = () => {
    if (this.getType() === SvgLineType.Straight) {
      return {
        length: this.getStraightLineWidth() + this.padding,
        height: this.strokeWidth * 6 + this.padding,
      };
    }

    //Elbowed line
    const bounding = this.getBoundingPosition();

    const width = Math.abs(bounding.x2 - bounding.x1);
    const height = Math.abs(bounding.y3 - bounding.y1);

    return {
      length: width + this.padding * 2,
      height: height + this.padding * 2,
    };
  };

  public setStroke(stroke: string) {
    this.stroke = stroke;
  }
  public getStroke(stroke: string) {
    this.stroke = stroke;
  }
  public setEndAdornment(adornment: SvgLineAdornment) {
    this.endAdornment = adornment;
  }

  public setStartAdornment(adornment: SvgLineAdornment) {
    this.startAdornment = adornment;
  }
  public setLength(length: number) {
    if (this.type === SvgLineType.Straight) {
      this.length = length;
      const next = this.points.getNext();
      if (next) {
        next.x = this.length;
      }
    }
  }

  public setCornerRounding(cornerRounding: number): void {
    this.cornerRounding = cornerRounding;
  }

  public setType(type: SvgLineType): void {
    this.type = type;
  }

  public toElbowed() {
    if (this.type === SvgLineType.Straight) {
      this.type = SvgLineType.Elbowed;
      this.convertPointsToElbowed();
    }
  }

  private convertPointsToElbowed() {
    let point: LinePoint | null = this.points;

    while (point) {
      const nextPosition = point.getNext()?.getPosition();

      if (nextPosition) {
        let pointPosition = point.getPosition();
        const isVerticalStraightLine = pointPosition.x === nextPosition.x;
        const isHorizontalStraightLine = pointPosition.y === nextPosition.y;

        if (!isHorizontalStraightLine && !isVerticalStraightLine) {
          const middle = new LinePoint(
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

  public getType(): SvgLineType {
    return this.type;
  }

  public toSvg(): string {
    const { length, height } = this.getDimensions();

    return `
        <svg height="${height}" width="${length}">
            <g fill="${this.stroke}" stroke="${this.stroke}" stroke-width="${
              this.strokeWidth
            }" >
                ${this.getAdornment(SvgLineAdornmentPosition.Start)}
                ${this.getLine()}
                ${this.getAdornment(SvgLineAdornmentPosition.End)}
            </g>
           
        </svg>
    `;
  }

  public toObject(): {
    strokeWidth: number;
    length: number;
    stroke: string;
    startAdornment: SvgLineAdornment;
    endAdornment: SvgLineAdornment;
    type: SvgLineType;
  } {
    return {
      stroke: this.stroke,
      length: this.length,
      strokeWidth: this.strokeWidth,
      startAdornment: this.startAdornment,
      endAdornment: this.endAdornment,
      type: this.type,
    };
  }

  public moveAllPoints(change: { x: number; y: number }) {
    let point: LinePoint | null = this.points;

    while (point) {
      point.x += change.x;
      point.y += change.y;

      point = point.getNext();
    }
  }

  public getPoints() {
    let points: { id: string; x: number; y: number }[] = [];
    let point: LinePoint | null = this.points;

    while (point) {
      points.push({ id: point.id, x: point.x, y: point.y });
      point = point.getNext();
    }

    return points;
  }

  public getPointById = (id: string) => {
    let targetPoint: LinePoint | null = null;
    let point: LinePoint | null = this.points;

    while (targetPoint == null && point) {
      if (id === point.id) {
        targetPoint = point;
      }

      point = point.getNext();
    }

    return targetPoint;
  };

  public updatePoint(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point) {
      point.x = x;
      point.y = y;
    }
  }

  public getDisplayPosition() {
    if (this.type === SvgLineType.Straight) {
      return this.points.getPosition();
    }

    const bounding = this.getBoundingPosition();

    return { x: bounding.x1, y: bounding.y1 };
  }

  public getRotateAngle() {
    if (this.type === SvgLineType.Straight) {
      const start = this.points;
      const end = start.getNext();

      if (end) {
        const { x: leftX, y: leftY } = start.getPosition();
        const { x: rightX, y: rightY } = end.getPosition();
        return getAngleByPoint(leftX, leftY, rightX, rightY, 'end') - 90;
      }

      return 0;
    }

    return 0;
  }

  public getBoundingPosition(): {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
  } {
    const bounding: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x3: number;
      y3: number;
      x4: number;
      y4: number;
    } = {
      x1: 1000000,
      y1: 1000000,
      x2: -100000,
      y2: 100000,
      x3: 100000,
      y3: -100000,
      x4: -100000,
      y4: -100000,
    };

    let point: null | LinePoint = this.points;

    while (point !== null) {
      const { x, y } = point.getPosition();

      if (x < bounding.x1) bounding.x1 = x;
      if (y < bounding.y1) bounding.y1 = y;

      if (x > bounding.x2) bounding.x2 = x;
      if (y < bounding.y2) bounding.y2 = y;

      if (x < bounding.x3) bounding.x3 = x;
      if (y > bounding.y3) bounding.y3 = y;

      if (x > bounding.x4) bounding.x4 = x;
      if (y > bounding.y4) bounding.y4 = y;
      point = point.getNext();
    }

    return bounding;
  }

  public getElbowedLinePositions() {
    if (this.type !== SvgLineType.Elbowed) return [];

    const positions: {
      x1: number;
      y1: number;
      startId: string;
      endId: string;
      y2: number;
      x2: number;
    }[] = [];

    let point: null | LinePoint = this.points;

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

  public updateElbowedPoints(
    startId: string,
    endId: string,
    point: { x?: number; y?: number },
  ) {
    if (this.getType() === SvgLineType.Elbowed && startId && endId) {
      const start = this.getPointById(startId);
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

  public createPrevFor(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point && !point.getPrev()) {
      const newHead = new LinePoint(x, y, null, this.points);
      this.points.setPrev(newHead);
      this.points = newHead;
    }
  }

  public createNewEnd(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point && !point.getNext()) {
      const newPoint = new LinePoint(x, y, point, point.getNext());
      point.setNext(newPoint);

      if (!newPoint.getNext()) this.endPoint = newPoint;
    }
  }

  public removePoint(id: string) {
    const point = this.getPointById(id);

    if (point) {
      if (point.getPrev()) {
        if (point.getNext()) {
          const prev = point.getPrev();
          const next = point.getNext();
          prev?.setNext(next);
          next?.setPrev(prev);
        } else {
          const prev = point.getPrev();
          prev?.setNext(null);
          this.endPoint = prev as LinePoint;
        }
      } else {
        this.points = this.points.getNext() as LinePoint;
        this.points.setPrev(null);
      }
    }
  }

  public mergeStraightLine() {
    if (this.getType() === SvgLineType.Elbowed) {
      let point: null | LinePoint = this.points;
      console.debug(this.getPoints());

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
            console.debug('remove point id', point.id);
            this.removePoint(point.id);
          }
        }

        point = next;
      }

      console.debug(this.getPoints());
    }
  }
}
