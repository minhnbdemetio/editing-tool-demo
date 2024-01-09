import { MoveableBodyTextObject } from '../factories/MoveableBodyText';
import { MoveableHeadingTextObject } from '../factories/MoveableHeadingText';
import { MoveableLineObject } from '../factories/MoveableLine';
import { MoveableObject } from '../factories/MoveableObject';
import { MoveableSubheadingTextObject } from '../factories/MoveableSubheadingText';
import { MoveableTextObject } from '../factories/MoveableText';

export const isText = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableTextObject => moveableObject?.type === 'text';

export const isNormalText = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableHeadingTextObject =>
  isText(moveableObject) && moveableObject.variant === 'normal';

export const isHeading = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableHeadingTextObject =>
  isText(moveableObject) && moveableObject.variant === 'heading';

export const isSubheading = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableSubheadingTextObject =>
  isText(moveableObject) && moveableObject.variant === 'subheading';

export const isBodyText = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableBodyTextObject =>
  isText(moveableObject) && moveableObject.variant === 'body';

export const isLine = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableLineObject => moveableObject?.type === 'line';
