import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class EarlyMorningFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.EarlyMorning;
    this.brightness = 7;
    this.contrast = 9;
    this.saturation = 6;
    this.hue = { r: 0, g: 156, b: 255 };
    this.temperature = -49;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/early-morning.png';
  }

  createFilter() {}
}
