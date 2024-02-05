import { v4 } from 'uuid';
import {
  Gradient,
  StrokeDashArraySizes,
  StrokeLineCap,
  SvgStrokeType,
} from './Svg.interfaces';

interface ISvg {
  stroke: SvgStrokeType;
  strokeWidth: number;
  opacity: number;
  strokeLineCap: StrokeLineCap;
  strokeDashArray: [number, number] | undefined;
  strokeDashArraySize: StrokeDashArraySizes;
}

export type SvgOptions = {
  stroke?: string;
  opacity?: number;
  strokeLineCap?: StrokeLineCap;
  strokeDashArray?: StrokeDashArraySizes;
  strokeWidth?: number;
};

export class Svg implements ISvg, Gradient {
  stroke: SvgStrokeType;

  strokeWidth: number;
  opacity: number;
  strokeLineCap: StrokeLineCap;
  strokeDashArray: [number, number] | undefined;
  strokeDashArraySize: StrokeDashArraySizes = StrokeDashArraySizes.None;

  gradientId: string;

  constructor(options: SvgOptions) {
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth || 1;
    this.opacity = options.opacity || 100;
    this.strokeLineCap = this.strokeLineCap =
      options.strokeLineCap || StrokeLineCap.Butt;

    if (options.strokeDashArray)
      this.setStrokeDashArray(options.strokeDashArray);

    this.gradientId = v4();
  }

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

  public isStrokeLineCap(strokeLineCap: StrokeLineCap) {
    return this.strokeLineCap === strokeLineCap;
  }

  getSvgStrokeDashArray(): [number, number] | undefined {
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

  addPath(
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

  getStrokeColor(): string {
    if (typeof this.stroke === 'string') return this.stroke;

    return `url(#${this.gradientId})`;
  }

  getLinearGradient() {
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
}
