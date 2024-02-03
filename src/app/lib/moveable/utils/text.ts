import { isNumber } from 'lodash';
import { TEXT_STYLE_FONT_SIZE } from '../constant/text';

export const isHeadingFont = (fontSize: number | undefined) =>
  isNumber(fontSize) && fontSize >= TEXT_STYLE_FONT_SIZE.HEADING;

export const isSubheadingFont = (fontSize: number | undefined) =>
  isNumber(fontSize) &&
  fontSize >= TEXT_STYLE_FONT_SIZE.SUBHEADING &&
  fontSize < TEXT_STYLE_FONT_SIZE.HEADING;

export const isBodyFont = (fontSize: number | undefined) =>
  isNumber(fontSize) &&
  fontSize >= TEXT_STYLE_FONT_SIZE.BODY_TEXT &&
  fontSize < TEXT_STYLE_FONT_SIZE.SUBHEADING;
