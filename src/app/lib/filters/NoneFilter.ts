import { PhotoFilter, PhotoFilterType } from './PhotoFilter';

export class NoneFilter extends PhotoFilter {
  constructor() {
    super();
    this.name = PhotoFilterType.None;
    this.thumbnail = '/filter_thumbnails/none.png';
  }

  createFilter() {}
}
