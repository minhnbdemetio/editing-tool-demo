import { cloneDeep } from 'lodash';
import { Effect } from '../Effect';

export type TextEffectOptions = {
  color?: string;
  offset?: number;
  direction?: number;
  blur?: number;
  transparency?: number;
  thickness?: number;
  spread?: number;
  roundness?: number;
};

export abstract class TextEffect extends Effect {
  varient: string = 'none';
  options: TextEffectOptions = {};
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
}
