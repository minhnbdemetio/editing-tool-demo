import {
  PIXEL_TO_CENTIMETER,
  PIXEL_TO_INCH,
  PIXEL_TO_MILLIMETER,
  UNITS,
} from '../constants/unit-constants';

export const pixelsToInches = (pixels: number) => pixels / PIXEL_TO_INCH;
export const pixelsToCentiMeters = (pixels: number) =>
  pixels / PIXEL_TO_CENTIMETER;
export const pixelsToMillimeters = (pixels: number) =>
  pixels / PIXEL_TO_MILLIMETER;

export const inchesToPixels = (inches: number) => inches * PIXEL_TO_INCH;
export const millimetersToPixels = (millimeters: number) =>
  millimeters * PIXEL_TO_MILLIMETER;
export const centimetersToPixels = (centimeters: number) =>
  centimeters * PIXEL_TO_CENTIMETER;

export const convertFrameSize = (
  from: string,
  to: string,
  dimension: number,
  decimals: number | null = 0,
): number => {
  const isFromPixel = from === UNITS.PIXEL;
  const isToPixel = to === UNITS.PIXEL;

  const round = (number: number) => {
    if (decimals == null) return number;
    if (decimals == 0) return Math.round(number);

    return +number.toFixed(decimals);
  };

  /// From pixels from Others
  if (isFromPixel) {
    switch (to) {
      case UNITS.CENTIMETER:
        return round(pixelsToCentiMeters(dimension));
      case UNITS.INCH:
        return round(pixelsToInches(dimension));
      case UNITS.MILLIMETER:
        return round(pixelsToMillimeters(dimension));

      default:
        return round(dimension);
    }
  }

  /// From others from pixels
  if (isToPixel) {
    switch (from) {
      case UNITS.CENTIMETER:
        return round(centimetersToPixels(dimension));
      case UNITS.INCH:
        return round(inchesToPixels(dimension));
      case UNITS.MILLIMETER:
        return round(millimetersToPixels(dimension));

      default:
        return round(dimension);
    }
  }

  // not support others case
  return dimension;
};
