import {
  PIXEL_TO_CENTIMETER,
  PIXEL_TO_INCH,
  PIXEL_TO_MILLIMETER,
  UNITS,
} from '../constants/unit-constants';

const pixelToInch = (pixels: number) => +(pixels / PIXEL_TO_INCH).toFixed(2);
const pixelToCentiMeter = (pixels: number) =>
  +(pixels / PIXEL_TO_CENTIMETER).toFixed(2);
const pixelToMillimeter = (pixels: number) =>
  +(pixels / PIXEL_TO_MILLIMETER).toFixed(2);

const inchToPixel = (inches: number) => Math.ceil(inches * PIXEL_TO_INCH);
const millimeterToPixel = (millimeters: number) =>
  Math.ceil(millimeters * PIXEL_TO_MILLIMETER);
const centimeterToPixel = (centimeters: number) =>
  Math.ceil(centimeters * PIXEL_TO_CENTIMETER);

export const getDisplayDimension = (
  from: string,
  to: string,
  dimension: number,
): number => {
  const isFromPixel = from === UNITS.PIXEL;
  const isToPixel = to === UNITS.PIXEL;

  /// From pixels from Others
  if (isFromPixel) {
    switch (to) {
      case UNITS.CENTIMETER:
        return pixelToCentiMeter(dimension);
      case UNITS.INCH:
        return pixelToInch(dimension);
      case UNITS.MILLIMETER:
        return pixelToMillimeter(dimension);

      default:
        return dimension;
    }
  }

  /// From others from pixels
  if (isToPixel) {
    switch (from) {
      case UNITS.CENTIMETER:
        return centimeterToPixel(dimension);
      case UNITS.INCH:
        return inchToPixel(dimension);
      case UNITS.MILLIMETER:
        return millimeterToPixel(dimension);

      default:
        return dimension;
    }
  }

  /// From others from others
  const pixels = getDisplayDimension(from, 'px', dimension);

  return getDisplayDimension('px', to, pixels);
};
