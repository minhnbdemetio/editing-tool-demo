import { MoveableObject } from '../factories/MoveableObject';
import { MoveableTextObject } from '../factories/MoveableText';

export const isTextObject = (
  object: MoveableObject | null,
): object is MoveableTextObject => {
  if(!object || !object.type) return false
  return ['text', 'heading'].includes(object.type)
};
