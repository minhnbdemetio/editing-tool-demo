import { cloneDeep } from 'lodash';
import { Effect } from '../Effect';

export type TextEffectOptions = {
  color?: string;
  offset?: number;
  direction?: number;
  blur?: number;
  transparency?: number;
  thickness?: number;
};

export abstract class TextEffect extends Effect {
  name: string;
  options: TextEffectOptions = {};
  constructor(name: string, options: TextEffectOptions = {}) {
    super();
    this.name = name;
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
