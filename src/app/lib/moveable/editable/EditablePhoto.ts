import { PhotoPosition } from '../photo/Croppable';
import { PhotoFilter } from '../photo/filters/PhotoFilter';
import { Editable } from './Editable';

export interface EditablePhoto extends Editable {
  filter?: PhotoFilter;
  loaded: boolean;
  dragStartPoint?: { x: number; y: number };
}
