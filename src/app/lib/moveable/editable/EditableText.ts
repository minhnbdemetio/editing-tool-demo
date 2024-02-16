import { StyleEffect } from '../effects/text/StyleEffect';
import { Editable } from './Editable';

export interface EditableText extends Editable {
  styleEffect: StyleEffect;
  editable: boolean
}
