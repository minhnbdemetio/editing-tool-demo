import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class SunsetFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Sunset;
    this.brightness = -14;
    this.contrast = 23;
    this.saturation = 0;
    this.hue = { r: 255, g: 177, b: 0 };
    this.temperature = 41;
    this.blur = -16;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/sunset.png';
  }

  createFilter() {}
}
