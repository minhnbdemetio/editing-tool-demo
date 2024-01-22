import { getAngleByPoint } from './line';
import { LinePoint } from './line-point';
import { v4 as uuidV4 } from 'uuid';

export enum SvgLineAdornment {
  Arrow = 'arrow',
  Triangle = 'triangle',
  Square = 'square',
  Rhombus = 'rhombus',
  OutlinedSquare = 'outlined-square',
  OutlinedRhombus = 'outlined-rhombus',
  OutlinedTriangle = 'outlined-triangle',
  OutlinedCircle = 'outlined-circle',
  Circle = 'circle',
  Line = 'line',
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

export enum StrokeLineCap {
  Butt = 'butt',
  Round = 'round',
  Square = 'square',
}

export enum StrokeDashArraySizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  None = 'none',
}

export enum SvgAlignment {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
  MIDDLE = 'middle',
}

export enum SvgFlip {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

declare type SvgStrokeType =
  | string
  | {
      offset: number;
      color: string;
    }[];

export type SvgLineOptions = {
  strokeWidth?: number;
  length?: number;
  stroke?: string;
  startAdornment?: SvgLineAdornment;
  endAdornment?: SvgLineAdornment;
  type?: SvgLineType.Elbowed | SvgLineType.Straight;
  cornerRounding?: number;
  strokeDashArray?: StrokeDashArraySizes;
  shadowDirection?: number;
  shadowOpacity?: number;
  shadowDistance?: number;
  shadowBlur?: number;
  strokeLineCap?: StrokeLineCap;
  opacity?: number;
};

export class SvgLine {
  private strokeWidth: number;
  private length: number;
  private stroke: SvgStrokeType;
  private startAdornment: SvgLineAdornment;
  private endAdornment: SvgLineAdornment;
  public padding: number = 6;
  private type: SvgLineType;
  private cornerRounding: number;
  points: LinePoint;
  endPoint: LinePoint;
  private toleranceNumber = 0.5;
  private strokeDashArray: [number, number] | undefined = undefined;
  private strokeDashArraySize: StrokeDashArraySizes = StrokeDashArraySizes.None;

  public shadowDirection: number = 0;
  public shadowOpacity: number = 0;
  public shadowDistance: number = 0;
  public shadowBlur: number = 0;

  private opacity: number = 100;

  private strokeLineCap: StrokeLineCap;

  private shadowSvgId = uuidV4();
  private gradientId = uuidV4();

  constructor(options: SvgLineOptions = {}) {
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth || 5;
    this.startAdornment = options.startAdornment || SvgLineAdornment.None;
    this.endAdornment = options.endAdornment || SvgLineAdornment.None;
    this.length = options.length || 50;
    this.type = options.type || SvgLineType.Straight;
    this.cornerRounding = options.cornerRounding || 10;

    this.padding = 50;

    if (options.strokeDashArray)
      this.setStrokeDashArray(options.strokeDashArray);

    this.strokeLineCap = options.strokeLineCap || StrokeLineCap.Butt;

    this.setShadow(
      options || {
        shadowBlur: 0,
        shadowDirection: 0,
        shadowDistance: 0,
        shadowOpacity: 100,
      },
    );

    const end = new LinePoint(200, 0, null, null);
    const start = new LinePoint(0, 0, null, end);

    end.setPrev(start);

    this.points = start;
    this.endPoint = end;
  }

  private addPath(
    d: string,
    options: { fill?: string; strokeDashArray?: [number, number] } = {},
  ): string {
    let pathOptions: string[] = [];
    if (!!options.fill) pathOptions.push(`fill="${options.fill}"`);
    if (!!options.strokeDashArray) {
      pathOptions.push(
        `stroke-dasharray="${options.strokeDashArray[0]},${options.strokeDashArray[1]}"`,
      );
    }
    return `<path d="${d}" ${pathOptions.join(' ')} />`;
  }

  public getStartAdornment() {
    return this.startAdornment;
  }

  public getEndAdornment() {
    return this.endAdornment;
  }

  public getOpacity() {
    return this.opacity;
  }

  public setOpacity(opacity: number) {
    this.opacity = opacity;
  }

  getCenterPoint(): number {
    const { height } = this.getDimensions();
    return height / 2;
  }

  private getVerticalLine(point: LinePoint, lines: string[]) {
    let dy = point.getDY();
    const nextDx = point.getNext()?.getDX();

    const isFirst = !point.getPrev();
    const isEnd = !point.getNext()?.getNext();

    const { startBottom, startTop, endTop, endBottom } =
      this.getLineAdornmentPadding();

    if (dy >= this.toleranceNumber) {
      if (point.hasNextCurve()) dy -= this.cornerRounding;
      if (point.hasPrevCurve()) dy -= this.cornerRounding;

      if (isFirst) {
        dy -= startTop + startBottom;
        lines.push(`m 0 ${startBottom + startTop}`);
      }

      if (isEnd) {
        dy -= endTop + endBottom;
      }

      if (nextDx && nextDx > this.toleranceNumber) {
        if (isFirst && startTop) {
        }
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

      if (isFirst) {
        dy += startTop + startBottom;
        lines.push(`m 0 ${-startBottom - startTop}`);
      }

      if (isEnd) {
        dy += endTop + endBottom;
      }

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

  private getHorizontalLine(point: LinePoint, lines: string[]) {
    let dx = point.getDX();

    const isFirst = !point.getPrev();
    const isEnd = !point.getNext()?.getNext();

    const { startLeft, startRight, endLeft, endRight } =
      this.getLineAdornmentPadding();

    console.debug({ startLeft, startRight, endLeft, endRight });

    if (this.getType() === SvgLineType.Straight) {
      dx = this.getStraightLineWidth();
    }

    const nextDy = point.getNext()?.getDY();

    if (dx >= 0) {
      if (point.hasNextCurve()) dx -= this.cornerRounding;
      if (point.hasPrevCurve()) dx -= this.cornerRounding;

      if (isEnd) {
        dx -= endLeft + endRight;
      }

      if (isFirst) {
        dx -= startLeft + startRight;
        lines.push(`m ${startLeft + startRight} 0`);
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

      if (isFirst) {
        dx += startLeft + startRight;
        lines.push(`m ${-(startLeft + startRight)} 0`);
      }
      if (isEnd) {
        dx += endLeft + endRight;
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

  private getLine(): string {
    const lines: string[] = [];

    let point: LinePoint | null = this.points;
    while (point) {
      const nextPoint = point.getNext();

      if (nextPoint) {
        const nextPosition = nextPoint.getPosition();
        const currentPosition = point.getPosition();
        const isVerticalLine = point.isEqual(currentPosition.x, nextPosition.x);
        const isHorizontal = point.isEqual(currentPosition.y, nextPosition.y);

        if (isHorizontal || this.getType() === SvgLineType.Straight) {
          this.getHorizontalLine(point, lines);
        } else if (isVerticalLine) {
          this.getVerticalLine(point, lines);
        }
      }

      point = nextPoint;
    }

    const bounding = this.getBoundingPosition();

    const startPointPosition = this.points.getPosition();
    let startX = startPointPosition.x - bounding.x1;
    let startY = startPointPosition.y - bounding.y1;

    if (this.getType() === SvgLineType.Straight) {
      startX = 0;
      startY = 0;
    }

    return this.addPath(
      `M ${+this.padding + startX},${+startY + this.padding}  ${lines.join(
        ' ',
      )}`,
      { fill: 'none', strokeDashArray: this.getSvgStrokeDashArray() },
    );
  }
  private getAdornment(
    position: SvgLineAdornmentPosition.Start | SvgLineAdornmentPosition.End,
  ): string {
    let start = this.points;
    const bouding = this.getBoundingPosition();

    if (position === SvgLineAdornmentPosition.End) {
      start = this.endPoint as LinePoint;
    }

    let x = start.x - bouding.x1 + this.padding;
    let y = start.y - bouding.y1 + this.padding;

    let direction: 'right' | 'left' | 'up' | 'down' =
      position === SvgLineAdornmentPosition.End
        ? this.getEndAdornmentDirection(start)
        : this.getStartAdornmentDirection(start);

    const isStraightLine = this.getType() === SvgLineType.Straight;
    if (isStraightLine) {
      if (position === SvgLineAdornmentPosition.Start) {
        x = this.padding;
        y = this.padding;
      } else {
        y = this.padding;
        x = this.padding + this.getStraightLineWidth();
      }
    }

    const adornment =
      position === SvgLineAdornmentPosition.Start
        ? this.startAdornment
        : this.endAdornment;

    switch (adornment) {
      case SvgLineAdornment.Arrow:
        return this.getArrowAdornment(direction, x, y);
      case SvgLineAdornment.Triangle:
        return this.getTriangleAdornment(direction, x, y);
      case SvgLineAdornment.OutlinedTriangle:
        return this.getTriangleAdornment(direction, x, y, true);
      case SvgLineAdornment.Circle:
        return this.getCircleAdornment(direction, x, y);
      case SvgLineAdornment.OutlinedCircle:
        return this.getCircleAdornment(direction, x, y, true);
      case SvgLineAdornment.Square:
        return this.getSquareAdornment(direction, x, y);
      case SvgLineAdornment.OutlinedSquare:
        return this.getSquareAdornment(direction, x, y, true);
      case SvgLineAdornment.Rhombus:
        return this.getRhombusAdornment(direction, x, y);
      case SvgLineAdornment.OutlinedRhombus:
        return this.getRhombusAdornment(direction, x, y, true);
      case SvgLineAdornment.Line:
        return this.getLineAdornment(direction, x, y, true);
      default:
        return '';
    }
  }

  private getStartAdornmentDirection(startPoint: LinePoint) {
    if (this.type === SvgLineType.Straight) return 'left';

    const dy = startPoint.getDY();
    const dx = startPoint.getDX();

    let direction: 'up' | 'left' | 'down' | 'right' = 'up';

    if (dy !== 0) {
      if (dy > 0) direction = 'up';
      else direction = 'down';
    } else {
      if (dx > 0) direction = 'left';
      else direction = 'right';
    }

    return direction;
  }

  private getEndAdornmentDirection(startPoint: LinePoint) {
    if (this.type === SvgLineType.Straight) return 'right';

    const dy = startPoint.getPrev()?.getDY() || 0;
    const dx = startPoint.getPrev()?.getDX() || 0;

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

  public getStrokeDashArray() {
    return this.strokeDashArray;
  }
  public getStrokeDashArraySize() {
    return this.strokeDashArraySize;
  }
  public setStrokeDashArray(size: StrokeDashArraySizes) {
    this.strokeDashArraySize = size;
    const strokeWidth = this.getStrokeWidth();
    switch (size) {
      case StrokeDashArraySizes.Small: {
        this.strokeDashArray = [strokeWidth * 1, strokeWidth];
        break;
      }
      case StrokeDashArraySizes.Medium: {
        this.strokeDashArray = [strokeWidth * 3, strokeWidth];
        break;
      }
      case StrokeDashArraySizes.Large: {
        this.strokeDashArray = [strokeWidth * 6, strokeWidth];
        break;
      }
      case StrokeDashArraySizes.None: {
        this.strokeDashArray = undefined;
      }
    }
  }

  private getArrowAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
  ): string {
    const arrowLength = this.getAdornmentLength();
    const arrowSide = arrowLength;

    switch (direction) {
      case 'up': {
        return this.addPath(
          `M ${x - arrowSide} ${
            y + arrowLength
          }  l ${arrowSide} ${-arrowSide}  ${arrowSide} ${arrowSide}`,
          { fill: 'none' },
        );
      }
      case 'left': {
        return this.addPath(
          `M ${x + arrowLength} ${
            y - arrowSide
          } l ${-arrowSide} ${arrowSide}  ${arrowSide} ${arrowSide}`,
          { fill: 'none' },
        );
      }
      case 'right': {
        return this.addPath(
          `M ${x - arrowLength} ${
            y - arrowSide
          } l ${arrowSide} ${arrowSide}  ${-arrowSide} ${arrowSide}`,
          { fill: 'none' },
        );
      }
      case 'down': {
        return this.addPath(
          `M ${x - arrowSide} ${
            y - arrowLength
          } l ${arrowSide} ${arrowSide}  ${arrowSide} ${-arrowSide}`,
          { fill: 'none' },
        );
      }
    }
  }

  private getAdornmentLength(): number {
    return this.strokeWidth * 3 - this.strokeWidth / 2;
  }

  private getStrokeColor(): string {
    if (typeof this.stroke === 'string') return this.stroke;

    return `url(#${this.gradientId})`;
  }

  public isStrokeLineCap(strokeLineCap: StrokeLineCap) {
    return this.strokeLineCap === strokeLineCap;
  }

  private getTriangleAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
    outlined?: boolean,
  ): string {
    const option = { fill: outlined ? 'none' : this.getStrokeColor() };
    const arrowLength = this.getAdornmentLength();
    const arrowSide = arrowLength - this.strokeWidth / 2;

    switch (direction) {
      case 'up': {
        return this.addPath(
          `M ${x} ${y} m ${-this.strokeWidth},${arrowSide} h -${
            arrowSide / 2
          } l ${arrowSide} ${-arrowSide} ${arrowSide} ${arrowSide} z`,
          option,
        );
      }
      case 'left': {
        return this.addPath(
          `M ${x} ${y} m ${arrowSide},${-this.strokeWidth} v -${
            arrowSide / 2
          } l ${-arrowSide} ${arrowSide} ${arrowSide} ${arrowSide} z`,
          option,
        );
      }
      case 'right': {
        return this.addPath(
          `M ${x} ${y} m ${-arrowSide},${-this.strokeWidth} v -${
            arrowSide / 2
          } l ${arrowSide} ${arrowSide} ${-arrowSide} ${arrowSide} z`,
          option,
        );
      }
      case 'down': {
        return this.addPath(
          `M ${x} ${y} m ${-this.strokeWidth},${-arrowSide} h -${
            arrowSide / 2
          } l ${arrowSide} ${arrowSide} ${arrowSide} -${arrowSide} z`,
          option,
        );
      }
    }
  }
  private getSquareAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
    outlined?: boolean,
  ): string {
    const option = { fill: outlined ? 'none' : this.getStrokeColor() };
    const arrowLength = this.getAdornmentLength();
    const arrowSide = arrowLength * 2;

    switch (direction) {
      case 'up': {
        return this.addPath(
          `M  ${x} ${y}  h -${
            arrowSide / 2
          } v ${arrowSide} h ${arrowSide} v -${arrowSide} z`,
          option,
        );
      }
      case 'left': {
        return this.addPath(
          `M  ${x + arrowSide} ${y} l 0 -${
            arrowSide / 2
          } -${arrowSide} 0 0 ${arrowSide} ${arrowSide} 0 z`,
          option,
        );
      }
      case 'right': {
        return this.addPath(
          `M  ${x}  ${y} l 0 -${
            arrowSide / 2
          } -${arrowSide} 0 0 ${arrowSide} ${arrowSide} 0 z`,
          option,
        );
      }
      case 'down': {
        return this.addPath(
          `M  ${x} ${y} h -${
            arrowSide / 2
          } v ${-arrowSide} h ${arrowSide} v ${arrowSide} z`,
          option,
        );
      }
    }
  }

  private getRhombusAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
    outlined?: boolean,
  ): string {
    const option = { fill: outlined ? 'none' : this.getStrokeColor() };
    const rhombusSide = this.getAdornmentLength();

    const triangleSidePadding = 0;

    switch (direction) {
      case 'up': {
        return this.addPath(
          `M ${x} ${y} m 0,${
            rhombusSide * 2 + triangleSidePadding
          } l -${rhombusSide} -${rhombusSide} l ${rhombusSide} ${-rhombusSide} l ${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${rhombusSide} z`,
          option,
        );
      }
      case 'left': {
        return this.addPath(
          `M ${x} ${y} m ${
            rhombusSide * 2 + triangleSidePadding
          },0 l -${rhombusSide} -${rhombusSide} l -${rhombusSide} ${rhombusSide} l ${rhombusSide} ${rhombusSide} l ${rhombusSide} -${rhombusSide} z`,
          option,
        );
      }
      case 'right': {
        return this.addPath(
          `M ${x} ${y} m ${
            -rhombusSide * 2 - triangleSidePadding
          },0 l ${rhombusSide} -${rhombusSide} l ${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${rhombusSide} l ${-rhombusSide} -${rhombusSide} z`,
          option,
        );
      }
      case 'down': {
        return this.addPath(
          `M ${x} ${y} m 0,${
            -rhombusSide * 2 - triangleSidePadding
          } l ${rhombusSide} ${rhombusSide} l -${rhombusSide} ${rhombusSide} l ${-rhombusSide} ${-rhombusSide} l ${rhombusSide} -${rhombusSide} z`,
          option,
        );
      }
    }
  }

  private getLineAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
    outlined?: boolean,
  ): string {
    const option = { fill: outlined ? 'none' : this.getStrokeColor() };
    const lineSide = this.getAdornmentLength();

    switch (direction) {
      case 'down':
      case 'up': {
        return this.addPath(
          `M ${x} ${y} m ${lineSide},0 h ${-lineSide * 2}`,
          option,
        );
      }

      case 'right':
      case 'left': {
        return this.addPath(
          `M ${x} ${y} m 0,${-lineSide} v ${lineSide * 2}`,
          option,
        );
      }
    }
  }

  private getCircleAdornment(
    direction: 'up' | 'left' | 'down' | 'right',
    x: number,
    y: number,
    outlined?: boolean,
  ): string {
    const arrowLength = this.getAdornmentLength();

    switch (direction) {
      case 'up': {
        return `<circle cx="${x}" cy="${
          y + arrowLength
        }" r="${arrowLength}" stroke="black" stroke-width="${
          this.strokeWidth
        }" fill="${outlined ? 'none' : 'currentColor'}" />`;
      }
      case 'left': {
        return `<circle cx="${
          x + arrowLength
        }" cy="${y}" r="${arrowLength}" stroke="black" stroke-width="${
          this.strokeWidth
        }" fill="${outlined ? 'none' : 'currentColor'}" />`;
      }
      case 'right': {
        return `<circle cx="${
          x - arrowLength
        }" cy="${y}" r="${arrowLength}" stroke="black" stroke-width="${
          this.strokeWidth
        }" fill="${outlined ? 'none' : 'currentColor'}" />`;
      }
      case 'down': {
        return `<circle cx="${x}" cy="${
          y - arrowLength
        }" r="${arrowLength}" stroke="black" stroke-width="${
          this.strokeWidth
        }" fill="${outlined ? 'none' : 'currentColor'}" />`;
      }
    }
  }

  private getLineAdornmentPadding(): {
    startLeft: number;
    startRight: number;
    startTop: number;
    startBottom: number;
    endLeft: number;
    endRight: number;
    endTop: number;
    endBottom: number;
  } {
    const adornmentPadding: {
      startLeft: number;
      startRight: number;
      startTop: number;
      startBottom: number;
      endLeft: number;
      endRight: number;
      endTop: number;
      endBottom: number;
    } = {
      startLeft: 0,
      startRight: 0,
      startTop: 0,
      startBottom: 0,
      endLeft: 0,
      endRight: 0,
      endTop: 0,
      endBottom: 0,
    };

    const startAdornmentPos = this.getStartAdornmentDirection(this.points);
    const endAdornmentPos = this.getEndAdornmentDirection(this.endPoint);

    const setStartPadding = (
      direction: 'left' | 'up' | 'down' | 'right',
      padding: number,
    ) => {
      adornmentPadding.startBottom = 0;
      adornmentPadding.startRight = 0;
      adornmentPadding.startLeft = 0;
      adornmentPadding.startTop = 0;

      switch (direction) {
        case 'left':
          adornmentPadding.startLeft = padding;
          break;
        case 'right':
          adornmentPadding.startRight = padding;
          break;
        case 'up':
          adornmentPadding.startTop = padding;
          break;
        case 'down':
          adornmentPadding.startBottom = padding;
          break;
      }
    };

    const setEndPadding = (
      direction: 'left' | 'up' | 'down' | 'right',
      padding: number,
    ) => {
      adornmentPadding.endBottom = 0;
      adornmentPadding.endLeft = 0;
      adornmentPadding.endRight = 0;
      adornmentPadding.endTop = 0;

      switch (direction) {
        case 'left':
          adornmentPadding.endLeft = padding;
          break;
        case 'right':
          adornmentPadding.endRight = padding;
          break;
        case 'up':
          adornmentPadding.endTop = padding;
          break;
        case 'down':
          adornmentPadding.endBottom = padding;
          break;
      }
    };

    switch (this.startAdornment) {
      case SvgLineAdornment.Arrow:
        setStartPadding(startAdornmentPos, (this.strokeWidth * 1) / 4);
        break;
      case SvgLineAdornment.OutlinedSquare:
      case SvgLineAdornment.OutlinedRhombus:
      case SvgLineAdornment.OutlinedCircle:
        setStartPadding(startAdornmentPos, this.getAdornmentLength() * 2);
        break;
      case SvgLineAdornment.None:
      case SvgLineAdornment.Line:
        setStartPadding(startAdornmentPos, -this.strokeWidth / 2);
        break;

      default:
        setStartPadding(startAdornmentPos, this.getAdornmentLength());
    }

    switch (this.endAdornment) {
      case SvgLineAdornment.Arrow:
        setEndPadding(endAdornmentPos, (this.strokeWidth * 1) / 4);

        break;
      case SvgLineAdornment.OutlinedSquare:
      case SvgLineAdornment.OutlinedRhombus:
      case SvgLineAdornment.OutlinedCircle:
        setEndPadding(endAdornmentPos, this.getAdornmentLength() * 2);
        break;
      case SvgLineAdornment.None:
      case SvgLineAdornment.Line:
        setEndPadding(endAdornmentPos, -this.strokeWidth / 2);
        break;

      default:
        setEndPadding(startAdornmentPos, this.getAdornmentLength());
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

  private getLinearGradient() {
    if (typeof this.stroke === 'string') return '';

    return `
    <linearGradient  id="${this.gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
      ${this.stroke.map(
        gradientStop =>
          `<stop offset="${gradientStop.offset * 100}%" style="stop-color:${
            gradientStop.color
          };stop-opacity:1" />`,
      )}
    </linearGradient>
    `;
  }

  private getDimensions: () => { length: number; height: number } = () => {
    const bounding = this.getBoundingPosition();

    const width = Math.abs(bounding.x2 - bounding.x1);
    const height = Math.abs(bounding.y3 - bounding.y1);

    return {
      length: width + this.padding * 2,
      height: height + this.padding * 2,
    };
  };

  public setStroke(stroke: SvgStrokeType) {
    this.stroke = stroke;
  }

  public getStroke(stroke: string) {
    this.stroke = stroke;
  }

  public setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }
  public getStrokeWidth() {
    return this.strokeWidth;
  }

  public setStrokeLineCap(strokeLineCap: StrokeLineCap): void {
    this.strokeLineCap = strokeLineCap;
  }
  public getStrokeLineCap(): StrokeLineCap {
    return this.strokeLineCap;
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

  public toStraight() {
    if (this.type === SvgLineType.Elbowed) {
      this.type = SvgLineType.Straight;

      this.points.setNext(this.endPoint);
      this.endPoint.setPrev(this.points);
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

  private getSvgStrokeDashArray(): [number, number] | undefined {
    if (!this.strokeDashArray) return undefined;

    if (this.isStrokeLineCap(StrokeLineCap.Butt)) return this.strokeDashArray;

    if (this.isStrokeLineCap(StrokeLineCap.Round)) {
      const capLength = this.strokeDashArray[0] - this.strokeWidth;
      return [
        capLength < 0 ? 0.1 : capLength,
        this.strokeDashArray[1] + this.strokeWidth,
      ];
    }

    return undefined;
  }

  public getType(): SvgLineType {
    return this.type;
  }

  public toSvg(): string {
    const { length, height } = this.getDimensions();

    return `
        <svg  height="${height}" width="${length}">
            <defs>
            ${this.getSvgShadow()}
            ${this.getLinearGradient()}
            </defs>
            <g stroke-location="inside"  opacity="${
              this.opacity / 100
            }" stroke-linejoin="${this.strokeLineCap}" stroke-linecap="${
              this.strokeLineCap
            }" filter="url(#${
              this.shadowSvgId
            })" fill="${this.getStrokeColor()}" stroke="${this.getStrokeColor()}"  stroke-width="${
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
    stroke: SvgStrokeType;
    startAdornment: SvgLineAdornment;
    endAdornment: SvgLineAdornment;
    type: SvgLineType;
    points: LinePoint;
  } {
    return {
      stroke: this.stroke,
      length: this.length,
      strokeWidth: this.strokeWidth,
      startAdornment: this.startAdornment,
      endAdornment: this.endAdornment,
      type: this.type,
      points: this.points,
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

  public getBoundingPosition(relative?: boolean): {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
  } {
    let bounding: {
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

    if (this.type === SvgLineType.Straight && !relative) {
      const lineWidth = this.getStraightLineWidth();
      const arrowLength = this.getAdornmentLength();
      bounding = {
        x1: 0,
        y1: 0,
        x2: lineWidth,
        y2: 0,
        x3: arrowLength,
        y3: 0,
        x4: lineWidth,
        y4: arrowLength,
      };
      return bounding;
    }

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
            this.removePoint(point.id);
          }
        }

        point = next;
      }
    }
  }

  public setShadow(options: {
    shadowDirection?: number;
    shadowOpacity?: number;
    shadowDistance?: number;
    shadowBlur?: number;
  }) {
    if (options.shadowBlur) this.shadowBlur = options.shadowBlur || 0;
    if (options.shadowOpacity)
      this.shadowOpacity = options.shadowOpacity || 100;
    if (options.shadowDistance)
      this.shadowDistance = options.shadowDistance || 0;
    if (options.shadowDirection)
      this.shadowDirection = options.shadowDirection || 0;
  }
  public getShadowPosition(): { dx: number; dy: number } {
    const distance = (this.shadowDistance / 100) * this.strokeWidth;
    let angle = this.shadowDirection;

    const isLeft = angle >= 45 && angle < 135;
    const isTop = angle >= 135 && angle < 225;
    const isRight = angle >= 225 && angle < 315;

    const getPosition = (_angle: number) => {
      let result: number;
      angle -= 45;

      result = Math.sin((_angle * Math.PI) / 180) * distance;

      return result;
    };

    if (isLeft) {
      return { dx: -distance, dy: -getPosition(angle - 90) };
    }
    if (isTop) {
      return { dy: -distance, dx: getPosition(angle - 180) };
    }
    if (isRight) {
      return { dx: distance, dy: getPosition(angle - 270) };
    }

    return { dy: distance, dx: -getPosition(angle) };
  }

  public getSvgShadow() {
    const { dx, dy } = this.getShadowPosition();

    const blur = (this.shadowBlur / 100) * 4;
    const opacity = this.shadowOpacity / 100;

    if (this.shadowDistance === 0) return ``;

    return `
   
      <filter  id="${this.shadowSvgId}" x="-40%" y="-40%" width="200%" height="200%">
        <feDropShadow  dx="${dx}" dy="${dy}"  flood-opacity="${opacity}"  in="offOut"  stdDeviation="${blur}"  />
      </filter>
      
    `;
  }

  public getClosest(reference: number, vector: 'x' | 'y'): LinePoint {
    let closestLeftPoint = this.points;
    let smallestDifference = 100000;

    let point: null | LinePoint = this.points;

    while (point) {
      const differ = Math.abs(reference - point[vector]);

      if (differ < smallestDifference) {
        closestLeftPoint = point;
        smallestDifference = differ;
      }

      point = point.getNext();
    }

    return closestLeftPoint;
  }

  public align(
    alignment: SvgAlignment,
    setting?: { width?: number; height?: number },
  ) {
    const halfStrokeWidth = this.strokeWidth / 2;

    switch (alignment) {
      case SvgAlignment.LEFT: {
        let closestLeftPoint = this.getClosest(0, 'x');
        this.moveAllPoints({ x: -closestLeftPoint.x + halfStrokeWidth, y: 0 });

        return;
      }
      case SvgAlignment.TOP: {
        let closestLeftTop = this.getClosest(0, 'y');

        this.moveAllPoints({ y: -closestLeftTop.y + halfStrokeWidth, x: 0 });
        return;
      }
      case SvgAlignment.RIGHT: {
        if (!setting?.width) throw new Error('Width is required!');
        let closestLeftRight = this.getClosest(setting.width, 'x');

        this.moveAllPoints({
          x: setting.width - closestLeftRight.x - halfStrokeWidth,
          y: 0,
        });
        return;
      }
      case SvgAlignment.BOTTOM: {
        if (!setting?.height) throw new Error('Height is required!');
        let closestLeftRight = this.getClosest(setting.height, 'x');

        this.moveAllPoints({
          y: setting.height - closestLeftRight.y - halfStrokeWidth,
          x: 0,
        });
        return;
      }
      case SvgAlignment.CENTER: {
        if (!setting?.width) throw new Error('Width is required!');

        const pageCenter = setting.width / 2;
        const { x1, x2 } = this.getBoundingPosition(true);
        const elementCenter = (x1 + x2) / 2;

        const difference = pageCenter - elementCenter;

        if (Math.abs(difference) > 1) {
          this.moveAllPoints({ x: difference, y: 0 });
        }
        return;
      }
      case SvgAlignment.MIDDLE: {
        if (!setting?.height) throw new Error('Height is required!');

        const pageCenter = setting.height / 2;

        const { y2, y4 } = this.getBoundingPosition(true);
        const elementCenter = (y2 + y4) / 2;

        const difference = pageCenter - elementCenter;

        if (Math.abs(difference) > 1) {
          this.moveAllPoints({ y: difference, x: 0 });
        }

        return;
      }
    }
  }

  public flip(direction: SvgFlip) {
    const { x2, x1, y4, y2 } = this.getBoundingPosition(true);
    let point: null | LinePoint = this.points;

    while (point) {
      if (direction === SvgFlip.HORIZONTAL) {
        point.x = x2 - point.x + x1;
      }
      if (direction === SvgFlip.VERTICAL) {
        point.y = y4 - point.y + y2;
      }

      point = point.getNext();
    }
  }
}
