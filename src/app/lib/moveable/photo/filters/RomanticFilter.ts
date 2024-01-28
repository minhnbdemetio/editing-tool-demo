import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class RomanticFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Romantic;
    this.brightness = 13;
    this.contrast = 2;
    this.saturation = 0;
    this.hue = { r: 255, g: 117, b: 0 };
    this.temperature = -17;
    this.blur = -1;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/romantic.png';
  }

  createFilter() {}
}
