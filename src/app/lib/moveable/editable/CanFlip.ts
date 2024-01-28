export enum FlipDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface CanFlip {
  flipDirection: { x: boolean; y: boolean };
  flip: (direction: FlipDirection) => void;
  getFlipElement: () => HTMLElement | null;
  getFlipTransform: () => string;
}
