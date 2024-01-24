import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class BrightFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Bright;
    this.brightness = -26;
    this.contrast = 0;
    this.saturation = 16;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = -12;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/bright.png';
  }

  createFilter() {}
}
