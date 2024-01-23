import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class BlackWhiteFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.BlackWhite;
    this.brightness = -6;
    this.contrast = 6;
    this.saturation = -100;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = -12;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/bandw.png';
  }

  createFilter() {}
}
