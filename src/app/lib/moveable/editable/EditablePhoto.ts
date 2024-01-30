import { CanFillColor } from '../photo/CanFillColor';
import { Croppable } from '../photo/Croppable';
import { PhotoFilter } from '../photo/filters/PhotoFilter';
import { Editable } from './Editable';

export interface EditablePhoto extends Editable, CanFillColor, Croppable {
  filter?: PhotoFilter;
  loaded: boolean;
  dragStartPoint?: { x: number; y: number };
}
