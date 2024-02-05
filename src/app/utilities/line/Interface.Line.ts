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

export declare type SvgStrokeType =
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

export declare type BoundingRectPosition = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
};

export interface IPoint {
  id: string;
  x: number;
  y: number;
  next: IPoint | null;
  prev: IPoint | null;
  toleranceNumber: number;
}

export interface AdornmentLine {
  startAdornment: SvgLineAdornment;
  endAdornment: SvgLineAdornment;

  getStartAdornmentDirection(): AdornmentDirection;
  getEndAdornmentDirection(): AdornmentDirection;
}

export interface Shadow {
  shadowSvgId: string;
  shadowDirection: number;
  shadowOpacity: number;
  shadowDistance: number;
  shadowBlur: number;
}

export interface Gradient {
  gradientId: string;
}

export declare type AdornmentDirection = 'up' | 'left' | 'down' | 'right';

export interface ILine extends Gradient, Shadow, AdornmentLine {
  stroke: SvgStrokeType;
  strokeWidth: number;
  length: number;
  toleranceNumber: number;
  type: SvgLineType;
  padding: number;
  opacity: number;
  strokeLineCap: StrokeLineCap;
  strokeDashArray: [number, number] | undefined;
  strokeDashArraySize: StrokeDashArraySizes;
  cornerRounding: number;

  getLine(): string;
  getHorizontalLine(
    dx: number,
    options: {
      hasNextCurve?: boolean;
      hasPrevCurve?: boolean;
      isFirst?: boolean;
      isLast?: boolean;
      nextDy?: number;
    },
  ): string;
  getVerticalLine(
    dy: number,
    options: {
      hasNextCurve?: boolean;
      hasPrevCurve?: boolean;
      isFirst?: boolean;
      isLast?: boolean;
      nextDx?: number;
    },
  ): string;
  getStraightLineWidth(): number;
  getDisplayPosition(): { x: number; y: number };
  getRotateAngle(): number;
  getBoundingPosition(relative?: boolean): BoundingRectPosition;
}

export interface IStraightLine {}

export interface IElbowedLine {}
