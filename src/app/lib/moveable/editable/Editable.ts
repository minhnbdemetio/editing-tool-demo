import { GradientStop } from '@/app/utilities/color.type';
import { Effect } from '../effects/Effect';
import { CanFlip } from './CanFlip';

export interface Editable extends CanFlip {
  effect: Effect | undefined;
  opacity: number;
  height: number;
  width: number;
  isLocked: boolean;
  x: number;
  y: number;
  color?: string;
  gradient?: GradientStop[];
  toggleLock: () => void;
  setOpacity: (opacity: number) => void;
  getElement: () => HTMLElement | null;
  getElementCss<T extends keyof CSSStyleDeclaration>(
    property: T,
  ): CSSStyleDeclaration[T] | null;
}
