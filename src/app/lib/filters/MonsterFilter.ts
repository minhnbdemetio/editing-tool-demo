import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class MonsterFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.Monster;
    this.brightness = -18;
    this.contrast = 58;
    this.saturation = -87;
    this.hue = { r: 0, g: 254, b: 255 };
    this.temperature = -62;
    this.blur = -9;
    this.vignette = 0;
    this.thumbnail = '/filter_thumbnails/monster.png';
  }

  createFilter() {}
}
