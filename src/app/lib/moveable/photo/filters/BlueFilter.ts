import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class BlueFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Blue;
    this.brightness = 0;
    this.contrast = 0;
    this.saturation = 9;
    this.hue = { r: 66, g: 255, b: 0 };
    this.temperature = -21;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/blue.png';
  }

  createFilter() {}
}
