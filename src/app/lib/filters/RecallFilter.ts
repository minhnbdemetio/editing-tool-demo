import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class RecallFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Recall;
    this.brightness = 13;
    this.contrast = -16;
    this.saturation = -50;
    this.hue = undefined;
    this.temperature = 0;
    this.blur = 0;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/recall.png';
  }

  createFilter() {}
}
