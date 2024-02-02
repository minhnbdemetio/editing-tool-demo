import { TextStyle } from './TextStyle';
export type TextFontStyle = 'italic' | 'normal';
export type TextTransform = 'none' | 'uppercase';
export type TextListStyle = 'none' | 'number' | 'disc';
export type TextDecoration = {
  underline: boolean;
  lineThrough: boolean;
};

export type TransformDirection = 'bottom' | 'center' | 'top';

export interface TextFormat {
  fontFamily: string;
  textAlign: string;
  textTransform: TextTransform;
  fontStyle: TextFontStyle;
  textListStyle: TextListStyle;
  textStyle: TextStyle;
  fontWeight: string;

  setTextStyle: (textStyle: TextStyle) => void;
  getTextStyle: () => TextStyle;

  setFontStyle: (fontStyle: TextFontStyle) => void;
  getFontStyle: () => TextFontStyle;
  isFontStyle: (style: TextFontStyle) => boolean;

  setTextTransform: (textTransform: TextTransform) => void;
  getTextTransform: () => TextTransform;
  isTextTransform: (textTransform: TextTransform) => boolean;

  getTextAlign: () => string;
  setTextAlign: (textAlign: string) => void;
  isTextAlign: (textAlign: string) => boolean;

  setFontWeight: (fontWeight: string) => void;
  getFontWeight: () => string;

  isTextDecorationEnable: (key: keyof TextDecoration) => boolean;

  getTextListStyle: () => TextListStyle;
  setTextListStyle: (listStyle: TextListStyle) => void;
  isTextListStyle: (listStyle: TextListStyle) => boolean;

  setFontFamily: (fontFamily: string) => void;
  getFontFamily: () => string;

  applyFontEffect: () => void;
  applyTextListStyle: () => void;

  letterSpacing: number;
  getLetterSpacing: () => number;
  setLetterSpacing: (letterSpacing: number | null) => void;
  applyLetterSpacing: () => void;

  lineHeight: number;
  getLineHeight: () => number;
  setLineHeight: (lineHeight: number | null) => void;
  applyLineHeight: () => void;

  opacity: number;
  getOpacity: () => number;
  setOpacity: (opacity: number) => void;
  applyOpacity: (element: HTMLElement) => void;
}
