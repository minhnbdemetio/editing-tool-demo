import { GradientStop } from '@/app/utilities/color.type';
import { Effect } from '../effects/Effect';

export enum FlipDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}
export interface Editable {
  effect: Effect | undefined;
  flipDirection: { x: boolean; y: boolean };
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
  flip: (direction: FlipDirection) => void;
  getElement: () => HTMLElement | null;
  getElementCss<T extends keyof CSSStyleDeclaration>(
    property: T,
  ): CSSStyleDeclaration[T] | null;
}
