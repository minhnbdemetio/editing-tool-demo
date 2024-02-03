import { CanFlip } from './CanFlip';

export interface Editable extends CanFlip {
  opacity: number;
  height: number;
  width: number;
  isLocked: boolean;
  x: number;
  y: number;
  color?: string;
  toggleLock: () => void;
  setOpacity: (opacity: number) => void;
  getElement: () => HTMLElement | null;
  getElementCss<T extends keyof CSSStyleDeclaration>(
    property: T,
  ): CSSStyleDeclaration[T] | null;
}
