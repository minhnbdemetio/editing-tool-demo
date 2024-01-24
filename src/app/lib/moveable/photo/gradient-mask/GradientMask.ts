export type GradientMaskType = 'rect' | 'circle' | 'linear';

export abstract class GradientMask {
  direction?: number;
  range?: number;
  type?: GradientMaskType;
  constructor() {}

  apply() {}
}
