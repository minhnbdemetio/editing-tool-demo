import {
  PHOTO_INNER_ELEMENTS,
  SOURCE_GRAPHIC,
} from '../moveable/constant/photo';
import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class ContrastFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Contrast;
    this.brightness = 1;
    this.contrast = 26;
    this.saturation = 9;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/contrast.png';
  }

  createFilter() {}
}
