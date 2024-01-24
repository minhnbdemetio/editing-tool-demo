import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class VintageFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Vintage;
    this.brightness = -40;
    this.contrast = 13;
    this.saturation = -10;
    this.hue = undefined;
    this.temperature = 8;
    this.blur = 0;
    this.vignette = 18;
    this.thumbnail = '/filter_thumbnails/vintage.png';
  }

  createFilter() {}
}
