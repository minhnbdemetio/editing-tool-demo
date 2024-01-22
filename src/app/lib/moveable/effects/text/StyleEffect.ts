import { hexToRgba } from '@/app/utilities/color';
import { TextEffect, TextEffectOptions } from './TextEffect';
import {
  TEXT_HOLLOW_DEFAULT_VALUE,
  TEXT_LIFT_DEFAULT_VALUE,
  TEXT_LIFT_EFFECT_CSS_VARIABLES,
  TEXT_SHADOW_DEFAULT_VALUE,
  TEXT_SHADOW_EFFECT_CSS_VARIABLES,
} from '../../constant/text';

export enum TextStyleEffect {
  NONE = 'none',
  SHADOW = 'shadow',
  LIFT = 'lift',
  HOLLOW = 'hollow',
  EMBOSS = 'emboss',
  OUTLINE = 'outline',
  ECHO = 'echo',
  GLITCH = 'glitch',
  NEON = 'neon',
  BACKGROUND = 'background',
}

export class StyleEffect extends TextEffect {
  constructor(name: TextStyleEffect, option?: TextEffectOptions) {
    super(name, option);
  }
}

export class TextShadowEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_SHADOW_DEFAULT_VALUE) {
    super(TextStyleEffect.SHADOW, {
      color: option.color,
      offset: option.offset,
      direction: option.direction,
      blur: option.blur,
      transparency: option.transparency,
      ...option,
    });
  }
  apply(element: HTMLElement): void {
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_VALUE = parseFloat(matches?.[1] ?? '0') * 0.166;
    const {
      direction = TEXT_SHADOW_DEFAULT_VALUE.direction,
      blur = TEXT_SHADOW_DEFAULT_VALUE.blur,
      color = TEXT_SHADOW_DEFAULT_VALUE.color,
      transparency = TEXT_SHADOW_DEFAULT_VALUE.transparency,
      offset = TEXT_SHADOW_DEFAULT_VALUE.offset,
    } = this.options;

    const offsetVal = (offset / 100) * MAX_VALUE;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${hShadow}px ${vShadow}px ${
      (blur / 100) * MAX_VALUE
    }px ${hexToRgba(color, transparency / 100)}`;
    element.style.setProperty(TEXT_SHADOW_EFFECT_CSS_VARIABLES, shadow);

    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-shadow-effect\)/g, '')
      .trim();

    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_SHADOW_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_SHADOW_EFFECT_CSS_VARIABLES})`;
  }

  reset(el: HTMLElement): void {
    el.style.removeProperty(TEXT_SHADOW_EFFECT_CSS_VARIABLES);
    el.style.textShadow = el.style.textShadow.replace(
      /(,.+|.+|)var\(--text-shadow-effect\)/g,
      '',
    );
  }
}

export class TextLiftEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_LIFT_DEFAULT_VALUE) {
    super(TextStyleEffect.LIFT, option);
  }
  apply(element: HTMLElement): void {
    const { offset = TEXT_LIFT_DEFAULT_VALUE.offset } = this.options;
    const transparency = ((60 - 5) / 100) * offset + 5;
    const blur = ((34.5 - 4.6) / 100) * offset + 4.6;
    const shadow = `${hexToRgba(
      '#000',
      transparency / 100,
    )} 0px 4.6px ${blur}px `;
    element.style.setProperty(TEXT_LIFT_EFFECT_CSS_VARIABLES, shadow);
    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-lift-effect\)/g, '')
      .trim();
    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_LIFT_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_LIFT_EFFECT_CSS_VARIABLES})`;
  }

  reset(el: HTMLElement): void {
    el.style.removeProperty(TEXT_LIFT_EFFECT_CSS_VARIABLES);
    el.style.textShadow = el.style.textShadow.replace(
      /(,.+|.+|)var\(--text-lift-effect\)/g,
      '',
    );
  }
}

export class TextHollowEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_HOLLOW_DEFAULT_VALUE) {
    super(TextStyleEffect.HOLLOW, option);
  }

  apply(element: HTMLElement): void {
    const radius = 0.0916;
    const { thickness = TEXT_HOLLOW_DEFAULT_VALUE.thickness } = this.options;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_THICKNESS = parseFloat(matches?.[1] ?? '0') * radius;
    element.style.caretColor = styles.color;
    element.style.webkitTextStrokeWidth = `${
      (thickness - 1) * (MAX_THICKNESS / 99)
    }px`;
    element.style.webkitTextStrokeColor = styles.color;
    element.style.webkitTextFillColor = 'transparent';
  }

  reset(element: HTMLElement): void {
    element.style.caretColor = 'auto'; // initial value is 'auto'
    element.style.webkitTextStrokeWidth = '0'; // initial value is '0'
    element.style.webkitTextStrokeColor = 'transparent'; // initial value is 'transparent'
    element.style.webkitTextFillColor = 'black'; // initial value is 'black'
  }
}
