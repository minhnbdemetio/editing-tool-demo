type LineAdornment =
  | 'arrow'
  | 'triangle'
  | 'square'
  | 'rhombus'
  | 'outlined-square'
  | 'outlined-rhombus'
  | 'outlined-triangle'
  | 'none';

export enum SvgLineAdornnment {
  Arrow = 'arrow',
  Triangle = 'triangle',
  Square = 'square',
  Rhombus = 'rhombus',
  OutlinedSquare = 'outlined-square',
  OutlinedRhombus = 'outlined-rhombus',
  OutlinedTriangle = 'outlined-triangle',
  None = 'none',
}

export enum SvgLineAdornnmentPosition {
  Start = 'start',
  End = 'end',
}

export class SvgLine {
  private strokeWidth: number;
  private length: number;
  private stroke: string;
  private startAdornment: LineAdornment;
  private endAdornment: LineAdornment;
  private padding: number = 5;

  constructor(
    options: {
      strokeWidth?: number;
      length?: number;
      stroke?: string;
      startAdornment?: LineAdornment;
      endAdornment?: LineAdornment;
    } = {},
  ) {
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth || 2;
    this.startAdornment = options.startAdornment || SvgLineAdornnment.None;
    this.endAdornment = options.endAdornment || SvgLineAdornnment.None;
    this.length = options.length || 50;
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
    return this.addPath(
      `M ${left + this.padding} ${centerPoint} L ${
        this.length + right
      } ${centerPoint}`,
    );
  }
  private getAdornment(
    position: SvgLineAdornnmentPosition.Start | SvgLineAdornnmentPosition.End,
  ): string {
    const adornment =
      position === SvgLineAdornnmentPosition.Start
        ? this.startAdornment
        : this.endAdornment;
    switch (adornment) {
      case SvgLineAdornnment.Arrow:
        return this.getArrowAdornment(position);
      case SvgLineAdornnment.Triangle:
        return this.getTriangleAdornment(position);
      case SvgLineAdornnment.OutlinedTriangle:
        return this.getTriangleAdornment(position, true);
      default:
        return '';
    }
  }

  private getArrowAdornment(
    position: SvgLineAdornnmentPosition.Start | SvgLineAdornnmentPosition.End,
  ): string {
    const centerPoint = this.getCenterPoint();
    const arrowLength =
      this.strokeWidth *
      3 *
      (position === SvgLineAdornnmentPosition.End ? 1 : -1);
    const startDrawArrowY = centerPoint - arrowLength;
    const startDrawArrowX =
      position === SvgLineAdornnmentPosition.End
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
    position: SvgLineAdornnmentPosition.Start | SvgLineAdornnmentPosition.End,
    outlined?: boolean,
  ): string {
    const centerPoint = this.getCenterPoint();
    const arrowLength =
      this.getAdornmentLength() *
      (position === SvgLineAdornnmentPosition.End ? 1 : -1);
    const startDrawArrowY = centerPoint - arrowLength;
    const startDrawArrowX =
      position === SvgLineAdornnmentPosition.End
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
      case SvgLineAdornnment.OutlinedTriangle:
        adornmentPadding.left = this.getAdornmentLength();
        break;
    }
    switch (this.endAdornment) {
      case SvgLineAdornnment.OutlinedTriangle:
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
  public setEndAdornment(adornment: SvgLineAdornnment) {
    this.endAdornment = adornment;
  }

  public setStartAdornment(adornment: SvgLineAdornnment) {
    this.startAdornment = adornment;
  }
  public setLength(length: number) {
    this.length = length;
  }

  public toSvg(): string {
    const { length, height } = this.getDimensions();

    return `
        <svg height="${height}" length="${length}">
            <g stroke="${this.stroke}" stroke-length="${this.strokeWidth}" >
                ${this.getAdornment(SvgLineAdornnmentPosition.Start)}
                ${this.getLine()}
                ${this.getAdornment(SvgLineAdornnmentPosition.End)}
            </g>
            Sorry, your browser does not support inline SVG.
        </svg>
    `;
  }
  public toObject(): {
    strokeWidth: number;
    length: number;
    stroke: string;
    startAdornment: LineAdornment;
    endAdornment: LineAdornment;
  } {
    return {
      stroke: this.stroke,
      length: this.length,
      strokeWidth: this.strokeWidth,
      startAdornment: this.startAdornment,
      endAdornment: this.endAdornment,
    };
  }
}
