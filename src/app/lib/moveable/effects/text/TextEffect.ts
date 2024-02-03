import { cloneDeep } from 'lodash';
import { Effect } from '../Effect';
import { TEXT_INNER_ELEMENTS } from '../../constant/text';

export type TextEffectOptions = {
  color?: string;
  offset?: number;
  direction?: number;
  blur?: number;
  transparency?: number;
  thickness?: number;
  spread?: number;
  roundness?: number;
  curve?: number;
};

export abstract class TextEffect extends Effect {
  variant: string = 'none';
  options: TextEffectOptions = {};
  id?: string;
  constructor(options: TextEffectOptions = {}) {
    super();
    this.options = options;
  }

  setOption(option: TextEffectOptions): void {
    this.options = {
      ...this.options,
      ...option,
    };
  }

  getOptions(): TextEffectOptions {
    return cloneDeep(this.options);
  }

  getTextContainer(): HTMLElement | null {
    const contentEditableId = `${TEXT_INNER_ELEMENTS.CONTAINER}-${this.id}`;
    return document.getElementById(contentEditableId);
  }
}
