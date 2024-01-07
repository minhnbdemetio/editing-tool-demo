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
  private padding: number = 5;
  private type: SvgLineType;
  private cornerRounding: number;
  private points: LinePoint;

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

    const end = new LinePoint(this.length, 0, null, null);
    const start = new LinePoint(0, 0, null, end);

    end.setPrev(start);

    this.points = start;
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
    const centerPoint = this.getCenterPoint();
    const { left, right } = this.getLineAdornmentPadding();

    if (this.getType() === SvgLineType.Straight) return this.getStraightLine();

    const lines: string[] = [];

    let point: LinePoint | null = this.points;
    while (point) {
      const nextPoint = point.getNext();

      if (nextPoint) {
        const nextPosition = nextPoint.getPosition();
        const currentPosition = point.getPosition();
        const isVerticalLine = currentPosition.x === nextPosition.x;
        const isHorizontal = currentPosition.y === nextPosition.y;

        const isCurve = point.hasNextCurve();

        if (!isCurve) {
          console.debug(nextPosition, currentPosition);

          lines.push(
            ` l ${nextPosition.x - currentPosition.x},${
              nextPosition.y - currentPosition.y
            }`,
          );
        } else {
          if (isVerticalLine) {
            const dy = point.getDY();
            const nextDx = point.getNext()?.getDX();

            const roundingX =
              nextDx && nextDx >= 0
                ? this.cornerRounding
                : -this.cornerRounding;
            const roundingY =
              dy >= 0 ? this.cornerRounding : -this.cornerRounding;

            if (point.hasPrevCurve()) {
              lines.push(`m 0,${this.cornerRounding}`);
            }

            lines.push(
              ` v ${dy - roundingY}`,
              ` q 0,${-roundingX} ${roundingX},${roundingY}`,
            );
          }
          if (isHorizontal) {
            const dx = point.getDX();
            const nextDy = point.getNext()?.getDY();

            const roundingX =
              dx && dx >= 0 ? this.cornerRounding : -this.cornerRounding;
            const roundingY =
              nextDy && nextDy >= 0
                ? this.cornerRounding
                : -this.cornerRounding;

            let rounding = dx >= 0 ? this.cornerRounding : -this.cornerRounding;
            if (point.hasPrevCurve()) {
              lines.push(`m ${rounding},0`);
            }
            lines.push(
              ` h ${dx - rounding}`,
              ` q ${rounding},0 ${rounding},${rounding}`,
            );
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
      `M ${left + this.padding + startX} ${startY} ${lines.join(' ')}`,
      { fill: 'none' },
    );
  }
  private getAdornment(
    position: SvgLineAdornmentPosition.Start | SvgLineAdornmentPosition.End,
  ): string {
    const start = this.points;

    const adornment =
      position === SvgLineAdornmentPosition.Start
        ? this.startAdornment
        : this.endAdornment;
    switch (adornment) {
      case SvgLineAdornment.Arrow:
        return this.getArrowAdornment(
          this.getAdornmentDirection(start),
          start.x,
          start.y,
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
    const start = this.points;
    const dy = start.getDY();
    const dx = start.getDX();

    const arrowLength = this.strokeWidth * 3;

    switch (direction) {
      case 'up': {
        const startDrawArrowX = dx - arrowLength;
        const startDrawArrowY = dx + arrowLength;
        return this.addPath(
          `M ${startDrawArrowX} ${startDrawArrowY} l ${arrowLength} ${-arrowLength}  ${arrowLength} ${-arrowLength}`,
          { fill: 'none' },
        );
      }
    }

    return '';
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
      length: width + this.padding,
      height: height + this.padding,
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

    console.debug(this.getPoints());
    console.debug(this.toSvg());
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
      console.debug('target point', targetPoint);
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
}
