import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class AnalogFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Analog;
    this.brightness = -25;
    this.contrast = 14;
    this.saturation = -100;
    this.hue = { r: 255, g: 255, b: 0 };
    this.temperature = 43;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/analog.png';
  }

  createFilter() {}
}
