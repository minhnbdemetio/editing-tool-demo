import { v4 as uuid } from 'uuid';

export const PHOTO_INNER_ELEMENTS = {
  SVG: 'svg-container',
  DEFS: 'defs',
  CONTRAST_MASK: 'contrast-mask',
  BRIGHTNESS_MASK: 'brightness-mask',
  TEMPERATURE_MASK: 'temperature-mask',
  SATURATION_MASK: 'saturation-mask',
  BLUR_FILTER: 'blur-filter',
  VIGNETTE_RESULT: 'vignette-result',
  HUE_MASK: 'hue-mask',
};

export const SOURCE_GRAPHIC = 'SourceGraphic';

export declare type Filter = {
  id: string;
  name: string;
  thumbnail: string;
  setup: any;
};
const NONE_FILTER: Filter = {
  id: uuid(),
  name: 'None',
  thumbnail: '/filter_thumbnails/none.png',
  setup: {
    contrast: 0,
    brightness: 0,
    saturation: 0,
    blur: 0,
    temperature: 0,
    hue: undefined,
    vignette: 0,
  },
};
const COLORFUL_FILTER: Filter = {
  id: uuid(),
  name: 'Colorful',
  thumbnail: '/filter_thumbnails/colorful.png',
  setup: {
    brightness: 7,
    contrast: 5,
    saturation: 10,
    hue: undefined,
    temperature: 0,
    blur: -6,
    vignette: 0,
  },
};
const SUNSET_FILTER: Filter = {
  id: uuid(),
  name: 'Sunset',
  thumbnail: '/filter_thumbnails/sunset.png',
  setup: {
    brightness: -14,
    contrast: 23,
    saturation: 0,
    hue: { r: 255, g: 177, b: 0 },
    temperature: 41,
    blur: -16,
    vignette: 0,
  },
};
const BRIGHT_FILTER: Filter = {
  id: uuid(),
  name: 'Bright',
  thumbnail: '/filter_thumbnails/bright.png',
  setup: {
    brightness: 26,
    contrast: 0,
    saturation: 16,
    hue: undefined,
    temperature: 0,
    blur: -12,
    vignette: 0,
  },
};
const EARLY_MORNING_FILTER: Filter = {
  id: uuid(),
  name: 'Early morning',
  thumbnail: '/filter_thumbnails/early-morning.png',
  setup: {
    brightness: 7,
    contrast: 9,
    saturation: 6,
    hue: { r: 0, g: 156, b: 255 },
    temperature: -49,
    blur: 0,
    vignette: 0,
  },
};
const RECALL_FILTER: Filter = {
  id: uuid(),
  name: 'Recall',
  thumbnail: '/filter_thumbnails/recall.png',

  setup: {
    brightness: 13,
    contrast: -16,
    saturation: -50,
    hue: undefined,
    temperature: 0,
    blur: 0,
    vignette: 0,
  },
};
const ROMANTIC_FILTER: Filter = {
  id: uuid(),
  name: 'Romantic',
  thumbnail: '/filter_thumbnails/romantic.png',
  setup: {
    brightness: 13,
    contrast: 2,
    saturation: 0,
    hue: { r: 255, g: 117, b: 0 },
    temperature: -17,
    blur: -1,
    vignette: 0,
  },
};
const CONTRAST_FILTER: Filter = {
  id: uuid(),
  name: 'Contrast',
  thumbnail: '/filter_thumbnails/contrast.png',
  setup: {
    brightness: 1,
    contrast: 26,
    saturation: 9,
    hue: undefined,
    temperature: 0,
    blur: 0,
    vignette: 0,
  },
};
const CALM_FILTER: Filter = {
  id: uuid(),
  name: 'Calm',
  thumbnail: '/filter_thumbnails/calm.png',

  setup: {
    brightness: 12,
    contrast: -14,
    saturation: -17,
    hue: undefined,
    temperature: 0,
    blur: 0,
    vignette: 0,
  },
};
const VINTAGE_FILTER: Filter = {
  id: uuid(),
  name: 'Vintage',
  thumbnail: '/filter_thumbnails/vintage.png',

  setup: {
    brightness: -40,
    contrast: 13,
    saturation: -10,
    hue: undefined,
    temperature: 8,
    blur: 0,
    vignette: 18,
  },
};
const BLUE_FILTER: Filter = {
  id: uuid(),
  name: 'Blue',
  thumbnail: '/filter_thumbnails/blue.png',

  setup: {
    brightness: 0,
    contrast: 0,
    saturation: 9,
    hue: { r: 66, g: 255, b: 0 },
    temperature: -21,
    blur: 0,
    vignette: 0,
  },
};
const LOVELY_FILTER: Filter = {
  id: uuid(),
  name: 'Lovely',
  thumbnail: '/filter_thumbnails/lovely.png',

  setup: {
    brightness: 0,
    contrast: 0,
    saturation: 9,
    hue: { r: 96, g: 0, b: 255 },
    temperature: 23,
    blur: 0,
    vignette: 0,
  },
};
const SEPIA_FILTER: Filter = {
  id: uuid(),
  name: 'Sepia',
  thumbnail: '/filter_thumbnails/sepia.png',

  setup: {
    brightness: -14,
    contrast: 13,
    saturation: -100,
    hue: { r: 255, g: 103, b: 0 },
    temperature: 41,
    blur: -5,
    vignette: 19,
  },
};
const ANALOG_FILTER: Filter = {
  id: uuid(),
  name: 'Analog',
  thumbnail: '/filter_thumbnails/analog.png',

  setup: {
    brightness: -25,
    contrast: 14,
    saturation: -100,
    hue: { r: 255, g: 255, b: 0 },
    temperature: 43,
    blur: 0,
    vignette: 0,
  },
};
const MONSTERS_FILTER: Filter = {
  id: uuid(),
  name: 'Monsters',
  thumbnail: '/filter_thumbnails/monsters.png',

  setup: {
    brightness: -18,
    contrast: 58,
    saturation: -87,
    hue: { r: 0, g: 254, b: 255 },
    temperature: -62,
    blur: -9,
    vignette: 0,
  },
};
const BLACK_WHITE_FILTER: Filter = {
  id: uuid(),
  name: 'Black and white',
  thumbnail: '/filter_thumbnails/bandw.png',

  setup: {
    brightness: -6,
    contrast: 6,
    saturation: -100,
    hue: undefined,
    temperature: 0,
    blur: -12,
    vignette: 0,
  },
};

export const FILTERS: Filter[] = [
  NONE_FILTER,
  COLORFUL_FILTER,
  SUNSET_FILTER,
  BRIGHT_FILTER,
  EARLY_MORNING_FILTER,
  RECALL_FILTER,
  ROMANTIC_FILTER,
  CONTRAST_FILTER,
  CALM_FILTER,
  VINTAGE_FILTER,
  BLUE_FILTER,
  LOVELY_FILTER,
  SEPIA_FILTER,
  ANALOG_FILTER,
  MONSTERS_FILTER,
  BLACK_WHITE_FILTER,
];
