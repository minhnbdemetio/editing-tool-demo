import { PhotoFilter } from '../photo/filters/PhotoFilter';
import { Editable } from './Editable';

export type PhotoPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GradientMaskType = 'rect' | 'circle' | 'linear';

export type GradientMask = {
  direction?: number;
  range?: number;
  type?: GradientMaskType;
};

export interface EditablePhoto extends Editable {
  filter?: PhotoFilter;
  loaded: boolean;
  dragStartPoint?: { x: number; y: number };
  cropPosition?: PhotoPosition;
  gradientMask?: GradientMask;
  isBackground: boolean;
  backgroundStartPosition?: PhotoPosition;
}
