export declare type SvgStrokeType =
  | string
  | {
      offset: number;
      color: string;
    }[];

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

export interface Gradient {
  gradientId: string;
}
