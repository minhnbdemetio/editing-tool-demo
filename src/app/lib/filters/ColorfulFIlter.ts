import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class ColorfulFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Colorful;
    this.brightness = 7;
    this.contrast = 5;
    this.saturation = 10;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = -6;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/colorful.png';
  }

  createFilter() {}
}
