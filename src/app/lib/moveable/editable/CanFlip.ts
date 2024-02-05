export enum FlipDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type XYFlipped = { x: boolean; y: boolean };
export interface CanFlip {
  flipXY: XYFlipped;
  flip: (direction: FlipDirection) => void;
  getFlipElement: () => HTMLElement | null;
  getFlipTransform: () => string;
}
