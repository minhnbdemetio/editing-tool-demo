import { NoneFilter } from '../photo/filters/NoneFilter';
import { PhotoFilter } from '../photo/filters/PhotoFilter';
import { SunsetFilter } from '../photo/filters/SunsetFilter';
import { BrightFilter } from '../photo/filters/BrightFilter';
import { EarlyMorningFilter } from '../photo/filters/EarlyMorningFilter';
import { RecallFilter } from '../photo/filters/RecallFilter';
import { RomanticFilter } from '../photo/filters/RomanticFilter';
import { ContrastFilter } from '../photo/filters/ContrastFilter';
import { CalmFilter } from '../photo/filters/CalmFilter';
import { VintageFilter } from '../photo/filters/VintageFilter';
import { BlueFilter } from '../photo/filters/BlueFilter';
import { LovelyFilter } from '../photo/filters/LovelyFilter';
import { SepiaFilter } from '../photo/filters/SepiaFilter';
import { AnalogFilter } from '../photo/filters/AnalogFilter';
import { MonsterFilter } from '../photo/filters/MonsterFilter';
import { BlackWhiteFilter } from '../photo/filters/BlackWhiteFilter';
import { ColorfulFilter } from '../photo/filters/ColorfulFilter';

export const PHOTO_INNER_ELEMENTS = {
  SVG: 'svg-container',
  DEFS: 'defs',
  G: 'g',
  IMAGE_LAYER: 'image-layer',
  CONTRAST_MASK: 'contrast-mask',
  BRIGHTNESS_MASK: 'brightness-mask',
  TEMPERATURE_MASK: 'temperature-mask',
  SATURATION_MASK: 'saturation-mask',
  BLUR_FILTER: 'blur-filter',
  VIGNETTE_RESULT: 'vignette-result',
  HUE_MASK: 'hue-mask',
};

export const SOURCE_GRAPHIC = 'SourceGraphic';

export const PHOTO_FILTERS: PhotoFilter[] = [
  new NoneFilter(),
  new ColorfulFilter(),
  new SunsetFilter(),
  new BrightFilter(),
  new EarlyMorningFilter(),
  new RecallFilter(),
  new RomanticFilter(),
  new ContrastFilter(),
  new CalmFilter(),
  new VintageFilter(),
  new BlueFilter(),
  new LovelyFilter(),
  new SepiaFilter(),
  new AnalogFilter(),
  new MonsterFilter(),
  new BlackWhiteFilter(),
];
