import { PhotoFilter } from '../types';

export const getPhotoFilterParamsString = (filter: PhotoFilter) => {
  const params: string[] = [
    `brightness:${filter.brightness}`,
    `contrast:${filter.contrast}`,
    `saturation:${filter.saturation}`,
    `temperature:${filter.temperature}`,
    `vignette:${filter.vignette}`,
    `blur:${filter.blur}`,
  ];

  if (filter.hue) {
    params.push(`hue:r-${filter.hue?.r}_g-${filter.hue.g}_b-${filter.hue.b}`);
  }
  return params.join(',');
};

export const isEqual = (filter1: PhotoFilter, filter2: PhotoFilter) =>
  getPhotoFilterParamsString(filter1) === getPhotoFilterParamsString(filter2);
