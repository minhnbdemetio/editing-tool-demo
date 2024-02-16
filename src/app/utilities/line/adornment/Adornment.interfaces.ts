export declare type AdornmentDirection = 'up' | 'left' | 'down' | 'right';

export interface IAdornment {
  length: number;
  outline: boolean;
  x: number;
  y: number;
  direction: AdornmentDirection;

  getAdornments(): {
    up: string;
    left: string;
    down: string;
    right: string;
  };

  toPath(): string;

  getLength(): number;

  setX(x: number): void;
  setY(y: number): void;

  getX(): number;
  getY(): number;

  getPadding(): number;
}
