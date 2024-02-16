import { DATA_LOCKED } from '../lib/moveable/constant/object';
import { MoveableBodyTextObject } from '../lib/moveable/text/MoveableBodyText';
import { MoveableHeadingTextObject } from '../lib/moveable/text/MoveableHeadingText';
import { MoveableLineObject } from '../lib/moveable/MoveableLine';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { MoveablePhoto } from '../lib/moveable/photo/MoveablePhoto';
import { MoveableSubheadingTextObject } from '../lib/moveable/text/MoveableSubheadingText';
import { MoveableTextObject } from '../lib/moveable/text/MoveableText';
import { MoveableShape } from '../lib/moveable/shape/MoveableShape';

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

export const isElementLocked = (
  target: HTMLElement | SVGElement | undefined | null,
) => {
  return target?.getAttribute(DATA_LOCKED) === 'true';
};

export const isPhoto = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveablePhoto => moveableObject?.type === 'photo';
export const isShape = (
  moveableObject: MoveableObject | null,
): moveableObject is MoveableShape => moveableObject?.type === 'shape';
