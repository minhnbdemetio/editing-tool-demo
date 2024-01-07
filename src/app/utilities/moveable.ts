import { MoveableObject } from '../factories/MoveableObject';
import { MoveableTextObject } from '../factories/MoveableText';

export const isTextObject = (
  object: MoveableObject | null,
): object is MoveableTextObject =>
  ['text', 'heading'].includes(object?.type || '');
