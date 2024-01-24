import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class CalmFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Calm;
    this.brightness = 12;
    this.contrast = -14;
    this.saturation = -17;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/calm.png';
  }

  createFilter() {}
}
