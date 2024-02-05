import { Adornment } from './adornment/Adornment';
import { AdornmentDirection } from './adornment/Adornment.interfaces';

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
  startAdornment: Adornment | undefined;
  endAdornment: Adornment | undefined;

  getStartAdornmentDirection(): AdornmentDirection;
  getEndAdornmentDirection(): AdornmentDirection;
  setStartAdornment(adornment: Adornment | undefined): void;
  setEndAdornment(adornment: Adornment | undefined): void;
  getStartAdornment(): Adornment | undefined;
  getEndAdornment(): Adornment | undefined;

  getStartAdornmentPath(): string;
  getEndAdornmentPath(): string;

  getStartAdornmentPosition(): { x: number; y: number };
  getEndAdornmentPosition(): { x: number; y: number };

  syncStartAdornmentSvgProperties(): void;
  syncEndAdornmentSvgProperties(): void;
}

export interface Shadow {
  shadowSvgId: string;
  shadowDirection: number;
  shadowOpacity: number;
  shadowDistance: number;
  shadowBlur: number;
}

export interface ILine extends Shadow, AdornmentLine {
  length: number;
  toleranceNumber: number;
  type: SvgLineType;
  padding: number;
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
  getDisplayPosition(): { x: number; y: number };
  getRotateAngle(): number;
  getBoundingPosition(relative?: boolean): BoundingRectPosition;
}

export interface IStraightLine {
  getLineWidth(): number;
}

export interface IElbowedLine {}
