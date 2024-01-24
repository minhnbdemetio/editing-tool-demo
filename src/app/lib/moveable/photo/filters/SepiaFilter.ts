import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class SepiaFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Sepia;
    this.brightness = -14;
    this.contrast = 13;
    this.saturation = -100;
    this.hue = { r: 255, g: 103, b: 0 };
    this.temperature = 41;
    this.blur = -5;
    this.vignette = 19;
    this.thumbnail = '/filter_thumbnails/sepia.png';
  }

  createFilter() {}
}
