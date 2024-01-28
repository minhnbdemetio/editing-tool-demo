import { TextDecoration } from '../../text/MoveableText';
import { TextEffect } from './TextEffect';

export class TextDecorationEffect extends TextEffect {
  textDecoration: TextDecoration = {
    lineThrough: false,
    underline: false,
  };
  getTextDecoration: () => TextDecoration = () => this.textDecoration;
  setTextDecoration: (key: keyof TextDecoration, state: boolean) => void = (
    key,
    state,
  ) => {
    this.textDecoration[key] = state;
  };
  apply: (element?: HTMLElement) => void = (element?: HTMLElement) => {
    if (element) {
      const textDecorations: string[] = [];
      if (this.getTextDecoration()['underline'])
        textDecorations.push('underline');

      if (this.getTextDecoration()['lineThrough'])
        textDecorations.push('line-through');

      element.style.textDecoration = textDecorations.join(' ');
    }
  };
}
