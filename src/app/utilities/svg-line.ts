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

class SvgLinePoint {
  x: number;
  y: number;
  private next: SvgLinePoint | null;
  private prev: SvgLinePoint | null;

  constructor(
    x: number,
    y: number,
    prev: SvgLinePoint | null,
    next: SvgLinePoint | null,
  ) {
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.next = next;
  }

  setNext(next: SvgLinePoint | null) {
    this.next = next;
  }
  getNext() {
    return this.next;
  }
  setPrev(prev: SvgLinePoint | null) {
    this.prev = prev;
  }
  getPrev() {
    return this.prev;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getDX() {
    const next = this.getNext();
    if (!next) return 0;

    return next.x - this.x;
  }

  getDY() {
    const next = this.getNext();
    if (!next) return 0;

    return next.y - this.y;
  }

  hasPrevCurve() {
    return !!this.getPrev()?.getPrev();
  }
  hasNextCurve() {
    return !!this.getNext()?.getNext();
  }
}

export class SvgLine {
  private strokeWidth: number;
  private length: number;
  private stroke: string;
  private startAdornment: SvgLineAdornment;
  private endAdornment: SvgLineAdornment;
  private padding: number = 0;
  private type: SvgLineType;
  private cornerRounding: number;
  private points: SvgLinePoint;

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

    const end = new SvgLinePoint(this.length, 0, null, null);
    const start = new SvgLinePoint(0, 0, null, end);

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

  private getLine(): string {
    const centerPoint = this.getCenterPoint();
    const { left, right } = this.getLineAdornmentPadding();

    const lines: string[] = [];

    let point: SvgLinePoint | null = this.points;
    while (point) {
      console.debug(point);

      const nextPoint = point.getNext();

      if (nextPoint) {
        const nextPosition = nextPoint.getPosition();
        const currentPosition = point.getPosition();
        const isVerticalLine = currentPosition.x === nextPosition.x;
        const isHorizontal = currentPosition.y === nextPosition.y;

        const isCurve = point.hasNextCurve();

        console.debug(isVerticalLine, isHorizontal);

        if (!isCurve) {
          lines.push(
            ` l ${nextPosition.x - currentPosition.x},${
              nextPosition.y - currentPosition.y
            }`,
          );
        } else {
          if (isVerticalLine) {
            const dy = point.getDY();
            let rounding = dy >= 0 ? this.cornerRounding : -this.cornerRounding;

            if (point.hasPrevCurve()) {
              lines.push(`m 0,${rounding}`);
            }

            lines.push(
              ` v ${dy - rounding}`,
              ` q 0,${rounding} ${rounding},${rounding}`,
            );
          }
          if (isHorizontal) {
            const dx = point.getDX();
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

    return this.addPath(
      `M ${left + this.padding} ${centerPoint} ${lines.join(' ')}`,
      { fill: 'none' },
    );
  }
  private getAdornment(
    position: SvgLineAdornmentPosition.Start | SvgLineAdornmentPosition.End,
  ): string {
    const adornment =
      position === SvgLineAdornmentPosition.Start
        ? this.startAdornment
        : this.endAdornment;
    switch (adornment) {
      case SvgLineAdornment.Arrow:
        return this.getArrowAdornment(position);
      case SvgLineAdornment.Triangle:
        return this.getTriangleAdornment(position);
      case SvgLineAdornment.OutlinedTriangle:
        return this.getTriangleAdornment(position, true);
      default:
        return '';
    }
  }

  private getArrowAdornment(position: SvgLineAdornmentPosition): string {
    const centerPoint = this.getCenterPoint();
    const arrowLength =
      this.strokeWidth *
      3 *
      (position === SvgLineAdornmentPosition.End ? 1 : -1);
    const startDrawArrowY = centerPoint - arrowLength;
    const startDrawArrowX =
      position === SvgLineAdornmentPosition.End
        ? this.length - arrowLength
        : this.padding - arrowLength;
    return this.addPath(
      `M ${startDrawArrowX} ${startDrawArrowY} l ${arrowLength} ${arrowLength}  ${-arrowLength} ${arrowLength}`,
      { fill: 'none' },
    );
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

  private getDimensions: () => { length: number; height: number } = () => {
    return {
      length: this.length + this.padding,
      height: this.strokeWidth * 6 + this.padding,
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
    this.length = length;
  }

  public setCornerRounding(cornerRounding: number): void {
    this.cornerRounding = cornerRounding;
  }

  public setType(type: SvgLineType): void {
    this.type = type;
  }

  public toSvg(): string {
    const { length, height } = this.getDimensions();

    return `
        <svg height="500" width="500">
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
}
