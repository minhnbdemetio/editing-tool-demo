import { TextEffectOptions } from '../effects/text/TextEffect';

export const TEXT_INNER_ELEMENTS = {
  CONTAINER: 'text-container',
  SVG: 'svg',
};

export const DEFAULT_TEXT_SCALE = 1;

export const TEXT_SHADOW_DEFAULT_VALUE = {
  color: '#000000',
  offset: 50,
  direction: 45,
  blur: 0,
  transparency: 40,
};

export const TEXT_LIFT_DEFAULT_VALUE = {
  offset: 50,
};

export const TEXT_HOLLOW_DEFAULT_VALUE = {
  thickness: 50,
};

export const TEXT_SPLICE_DEFAULT_VALUE = {
  color: '#808080',
  thickness: 50,
  offset: 50,
  direction: -45,
};

export const TEXT_OUTLINE_DEFAULT_VALUE = {
  color: '#bfbfbf',
  thickness: 100,
};

export const TEXT_ECHO_DEFAULT_VALUE = {
  color: '#000',
  direction: -45,
  offset: 50,
};

export const TEXT_GLITCH_DEFAULT_VALUE = {
  color: 'blue-pink',
  direction: -45,
  offset: 50,
};

export const TEXT_NEON_DEFAULT_VALUE = {
  thickness: 50,
};

export const TEXT_BACKGROUND_DEFAULT_VALUE = {
  color: '#ffed00',
  spread: 50,
  transparency: 100,
  roundness: 50,
};

export const TEXT_CURVE_DEFAULT_VALUE = {
  curve: 50,
};

export const TEXT_SHADOW_EFFECT_CSS_VARIABLES = '--text-shadow-effect';
export const TEXT_LIFT_EFFECT_CSS_VARIABLES = '--text-lift-effect';
export const TEXT_HOLLOW_EFFECT_CSS_VARIABLES = '--text-lift-effect';
export const TEXT_SPLICE_EFFECT_CSS_VARIABLES = '--text-splice-effect';
export const TEXT_OUTLINE_EFFECT_CSS_VARIABLES = '--text-outline-effect';
export const TEXT_ECHO_EFFECT_CSS_VARIABLES = '--text-echo-effect';
export const TEXT_GLITCH_EFFECT_CSS_VARIABLES = '--text-glitch-effect';
export const TEXT_NEON_EFFECT_CSS_VARIABLES = '--text-neon-effect';
export const TEXT_BACKGROUND_EFFECT_CSS_VARIABLES = '--text-background-effect';
export const TEXT_PREVIOUS_COLOR_CSS_VARIABLE = '--prev-color';

export const OUTLINE_EFFECT_CONTAINER = 'outline-effect-container';
export const BACKGROUND_EFFECT_CONTAINER = 'background-effect-container';
export const CURVE_EFFECT_CONTAINER = 'curve-effect-container';
export const TEXT_CURVE_INPUT_LAYER_CONTAINER = 'text-layer-container';
