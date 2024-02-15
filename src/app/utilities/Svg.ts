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
  stroke?: SvgStrokeType;
  opacity?: number;
  strokeLineCap?: StrokeLineCap;
  strokeDashArray?: StrokeDashArraySizes;
  strokeWidth?: number;
  shadowDirection?: number;
  shadowOpacity?: number;
  shadowDistance?: number;
  shadowBlur?: number;
  width?: number;
  height?: number;
};

export class Svg implements ISvg, Gradient {
  stroke: SvgStrokeType;

  strokeWidth: number;
  opacity: number;
  strokeLineCap: StrokeLineCap;
  strokeDashArray: [number, number] | undefined;
  strokeDashArraySize: StrokeDashArraySizes = StrokeDashArraySizes.None;

  public shadowDirection: number = 0;
  public shadowOpacity: number = 0;
  public shadowDistance: number = 0;
  public shadowBlur: number = 0;

  shadowSvgId = v4();
  gradientId: string = v4();

  width: number;
  height: number;

  constructor(options: SvgOptions) {
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth || 1;
    this.opacity = options.opacity || 100;
    this.strokeLineCap = this.strokeLineCap =
      options.strokeLineCap || StrokeLineCap.Butt;

    if (options.strokeDashArray)
      this.setStrokeDashArray(options.strokeDashArray);

    this.gradientId = v4();

    this.setShadow(
      options || {
        shadowBlur: 0,
        shadowDirection: 0,
        shadowDistance: 0,
        shadowOpacity: 100,
      },
    );

    this.width = options.width || 0;
    this.height = options.height || 0;
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

  public getShadowFilter() {
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

  public setStroke(stroke: SvgStrokeType) {
    this.stroke = stroke;
  }

  public getStroke(stroke: string) {
    this.stroke = stroke;
  }

  public setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;

    this.setStrokeDashArray(this.strokeDashArraySize);
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

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  getCenterPoint(): number {
    const { height } = this.getDimensions();
    return height / 2;
  }

  getOpacity(): number {
    return this.opacity;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
  }

  toObject() {
    return {
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      opacity: this.opacity,
      strokeLineCap: this.strokeLineCap,
      strokeDashArray: this.strokeDashArraySize,
      shadowDirection: this.shadowDirection,
      shadowOpacity: this.shadowOpacity,
      shadowDistance: this.shadowDistance,
      shadowBlur: this.shadowBlur,
      width: this.width,
      height: this.height,
    };
  }
}
