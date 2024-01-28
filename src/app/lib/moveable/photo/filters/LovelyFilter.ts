import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class LovelyFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Lovely;
    this.brightness = 0;
    this.contrast = 0;
    this.saturation = 9;
    this.hue = { r: 96, g: 0, b: 255 };
    this.temperature = 23;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/lovely.png';
  }

  createFilter() {}
}
