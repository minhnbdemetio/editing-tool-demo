import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from '../MoveableObject';
import { GradientStop } from '../../../utilities/color.type';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';
import {
  DEFAULT_TEXT_SCALE,
  GRADIENT_BACKGROUND_CSS_VARIABLE,
  GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE,
  TEXT_INNER_ELEMENTS,
  TEXT_STYLE_DEFAULT_VALUE,
  TextVarient,
} from '../constant/text';
import { EditableText } from '../editable/EditableText';
import { StyleEffect, TextStyleEffect } from '../effects/text/StyleEffect';
import { TextEffect, TextEffectOptions } from '../effects/text/TextEffect';
import { ShapeEffect, TextShapeEffect } from '../effects/text/ShapeEffect';
import { CSSProperties } from 'react';
import { TextDecorationEffect } from '../effects/text/TextDecorationEffect';

export type TextFontStyle = 'italic' | 'normal';
export type TextTransform = 'none' | 'uppercase';
export type TextListStyle = 'none' | 'number' | 'disc';
export type TextDecoration = {
  underline: boolean;
  lineThrough: boolean;
};

export type TextFormat = {
  fontFamily: string;
  textAlign: string;
  textTransform: TextTransform;
  fontWeight: string;
  fontStyle: TextFontStyle;
  textListStyle: TextListStyle;
  textStyle: TextVarient;

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

  fontSize: number;
  getFontSize: () => number;
  setFontSize: (fontSize: number | null) => void;
  applyFontSize: () => void;

  letterSpacing: number;
  getLetterSpacing: () => number;
  setLetterSpacing: (letterSpacing: number | null) => void;
  applyLetterSpacing: () => void;

  lineHeight: number;
  getLineHeight: () => number;
  setLineHeight: (lineHeight: number | null) => void;
  applyLineHeight: () => void;

  getTextStyle: () => string;
  setTextStyle: (textStyle: TextVarient) => void;

  opacity: number;
  getOpacity: () => number;
  setOpacity: (opacity: number) => void;
  applyOpacity: (element: HTMLElement) => void;
};

export type TransformDirection = 'bottom' | 'center' | 'top';

export class MoveableTextObject
  extends MoveableObject
  implements EditableText, TextFormat
{
  variant?: MoveableTextVariant;
  gradientStops?: GradientStop[];
  transformDirection: string;
  curve?: number;
  scaleY: number = DEFAULT_TEXT_SCALE;
  scaleX: number = DEFAULT_TEXT_SCALE;
  styleEffect: StyleEffect;
  shapeEffect: ShapeEffect;
  fontFamily: string = 'Arial';
  fontWeight: string = '400';
  fontStyle: TextFontStyle = 'normal';
  textTransform: TextTransform = 'none';
  textAlign: string = 'left';
  textDecoration: TextDecorationEffect = new TextDecorationEffect();
  textListStyle: TextListStyle = 'none';
  fontSize: number = 18;
  letterSpacing: number = 0;
  lineHeight: number;
  textStyle: TextVarient = TextVarient.HEADING;
  opacity: number = 1;

  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.type = 'text';
    this.variant = 'normal';
    this.transformDirection = 'bottom';
    this.styleEffect = new StyleEffect();
    this.shapeEffect = new ShapeEffect();
    this.lineHeight = this.fontSize * 1.5;
  }

  clone(options?: { htmlString: string; id: string }): MoveableTextObject {
    if (options) {
      return new MoveableTextObject({
        id: options.id,
        htmlString: options.htmlString,
      });
    }
    const clonedData = this.cloneData();
    return new MoveableTextObject({
      id: clonedData.cloneObjectId,
      htmlString: clonedData.clonedObjectHtml,
    });
  }
  getFontSize() {
    return this.fontSize;
  }
  getLetterSpacing() {
    return this.letterSpacing;
  }
  getLineHeight() {
    return this.lineHeight;
  }
  getTextStyleEffect() {
    return this.styleEffect;
  }
  getTextStyle() {
    return this.textStyle;
  }
  getOpacity() {
    return Math.round(this.opacity * 100);
  }
  getSvgElement() {
    return document.getElementById(`${TEXT_INNER_ELEMENTS.SVG}-${this.id}`);
  }
  getContentEditable() {
    const element = this.getElement();
    if (!element) return null;
    return (element.querySelector('[contenteditable]') ||
      element.firstChild) as HTMLElement;
  }
  setOpacity(opacity: number) {
    if (opacity < 0 || opacity > 100) return false;
    this.opacity = opacity / 100;
  }
  applyOpacity() {
    const element = this.getElement();
    if (!element) return false;
    element.style.opacity = `${this.opacity}`;
  }
  setFontSize(fontSize: number | null) {
    if (!fontSize) return false;
    this.fontSize = fontSize;
  }
  applyFontSize() {
    const element = this.getElement();
    if (!element) return false;
    element.style.fontSize = this.fontSize + 'px';
  }
  setTextStyle(textStyle: TextVarient) {
    const textStyleOption = TEXT_STYLE_DEFAULT_VALUE[textStyle];
    if (!textStyleOption) return;
    this.fontSize = textStyleOption.fontSize;
    this.fontWeight = textStyleOption.fontWeight;
    this.fontStyle = textStyleOption.fontStyle;
    this.lineHeight = this.fontSize * 1.5;
    this.textStyle = textStyle;
  }
  setTextColor(color: string) {
    const element = this.getElement();
    if (!element) return false;
    element.style.color = color;
    this.gradientStops = undefined;
  }
  setTextGradient(stops: GradientStop[]) {
    this.gradientStops = stops;
  }

  applyTextGradient(element: HTMLElement) {
    if (!this.gradientStops) {
      element.style.setProperty(GRADIENT_BACKGROUND_CSS_VARIABLE, '');
      element.style.setProperty(GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE, '');
      element.style.background = '';
      element.style.backgroundClip = '';
      element.style.webkitTextFillColor = '';
      return;
    }
    const linearGradient = this.gradientStops
      .map(({ offset, color }) => `${color} ${offset * 100}%`)
      .join(', ');
    element.style.setProperty(
      GRADIENT_BACKGROUND_CSS_VARIABLE,
      `linear-gradient(0deg, ${linearGradient})`,
    );
    element.style.setProperty(
      GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE,
      'transparent',
    );
    element.style.background = `var(${GRADIENT_BACKGROUND_CSS_VARIABLE})`;
    element.style.backgroundClip = 'text';
    element.style.webkitTextFillColor = `var(${GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE})`;
  }
  getTextContainer() {
    let attempt = 0;
    let element = null;
    const textContainerId = `${TEXT_INNER_ELEMENTS.CONTAINER}-${this.id}`;
    while (attempt < MAX_FIND_ELEMENT_ATTEMPTS) {
      const elementById = document.getElementById(textContainerId);
      if (elementById) {
        element = elementById;
        break;
      } else {
        attempt++;
      }
    }

    return element;
  }
  changeTransformOrigin(transformDirection: TransformDirection) {
    this.transformDirection = transformDirection;
  }
  onUpdateTransformDirection() {
    if (this.transformDirection === 'bottom') return;
    const element = this.getElement();
    const textContainer = this.getTextContainer();
    const firstItemContainer = textContainer?.firstElementChild;
    if (!element || !firstItemContainer) return;
    const elementStyles = window.getComputedStyle(element);
    const firstTextStyles = window.getComputedStyle(firstItemContainer);
    const lineHeight = parseFloat(
      firstTextStyles.lineHeight?.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const transform = elementStyles.transform;

    // Extract the translateX and translateY values
    const match =
      /matrix\(\d+, \d+, \d+, \d+, (\d+(\.\d+)?), (\d+(\.\d+)?)\)/.exec(
        transform,
      );
    const translateX = match ? parseFloat(match[1]) : 0;
    const translateY = match ? parseFloat(match[3]) : 0;

    // Calculate the new transform origin

    if (this.transformDirection === 'center') {
      element.style.transform = `translate(${translateX}px, ${
        translateY - lineHeight / 2
      }px)`;
    } else if (this.transformDirection === 'top') {
      element.style.transform = `translate(${translateX}px, ${
        translateY - lineHeight
      }px)`;
    }
  }
  toggleLock(): void {
    super.toggleLock();
    const textContainer = this.getTextContainer();
    textContainer?.setAttribute('contenteditable', !this.toggleLock + '');
  }

  setLetterSpacing(letterSpacing: number | null) {
    if (!letterSpacing) return false;
    this.letterSpacing = letterSpacing;
  }
  applyLetterSpacing() {
    const element = this.getElement();
    if (!element) return false;
    element.style.letterSpacing = this.letterSpacing + 'px';
  }
  setLineHeight(lineHeight: number | null) {
    if (!lineHeight) return false;
    this.lineHeight = lineHeight;
  }
  applyLineHeight() {
    const element = this.getElement();
    if (!element) return false;
    element.style.lineHeight = this.lineHeight + 'px';
  }
  setStyleEffect(styleEffect: TextEffect) {
    this.styleEffect = styleEffect;
  }
  updateStyleEffectOption(option: TextEffectOptions) {
    this.styleEffect.setOption(option);
  }

  setShapeEffect(shapeEffect: ShapeEffect) {
    this.shapeEffect = shapeEffect;
  }

  updateShapeEffectOption(shapeEffectOption: TextEffectOptions) {
    this.shapeEffect.setOption(shapeEffectOption);
  }

  setTextScale({ scaleX, scaleY }: { scaleX?: number; scaleY?: number }) {
    this.scaleX = scaleX ?? this.scaleX;
    this.scaleY = scaleY ?? this.scaleY;
  }

  renderTextScale(el?: HTMLElement) {
    const element = el ?? this.getElement();
    if (!element) return;

    element.style.transform =
      element.style.transform.replace(
        /scale\(\d+(\.\d+)?, \d+(\.\d+)?\)/g,
        '',
      ) + ` scale(${this.scaleX}, ${this.scaleY})`;
  }

  getFontFamily: () => string = () => {
    return this.fontFamily;
  };

  setFontFamily: (fontFamily: string) => void = fontFamily => {
    this.fontFamily = fontFamily;
  };

  setTextTransform: (textTransform: TextTransform) => void = textTransform => {
    this.textTransform = textTransform;
  };
  getTextTransform: () => TextTransform = () => {
    return this.textTransform;
  };
  isTextTransform: (textTransform: TextTransform) => boolean =
    textTransform => {
      return this.getTextTransform() === textTransform;
    };
  setFontWeight: (fontWeight: string) => void = fontWeight => {
    this.fontWeight = fontWeight;
  };
  getFontWeight: () => string = () => {
    return this.fontWeight;
  };
  isFontStyle: (style: TextFontStyle) => boolean = style => {
    return this.getFontStyle() === style;
  };
  getFontStyle: () => TextFontStyle = () => {
    return this.fontStyle;
  };

  getTextAlign: () => string = () => this.textAlign;
  setTextAlign: (textAlign: string) => void = textAlign => {
    this.textAlign = textAlign;
  };
  isTextAlign: (textAlign: string) => boolean = textAlign => {
    return this.getTextAlign() === textAlign;
  };

  getTextListStyle: () => TextListStyle = () => this.textListStyle;
  setTextListStyle: (listStyle: TextListStyle) => void = listStyle => {
    this.textListStyle = listStyle;
  };
  isTextListStyle: (listStyle: TextListStyle) => boolean = listStyle => {
    return this.getTextListStyle() === listStyle;
  };

  isTextDecorationEnable: (key: keyof TextDecoration) => boolean = key =>
    this.textDecoration.getTextDecoration()[key];

  setFontStyle: (fontStyle: TextFontStyle) => void = fontStyle => {
    this.fontStyle = fontStyle;
  };

  applyTextListStyle: () => void = () => {
    const listElement = this.getElement()?.querySelector('ul');
    if (!listElement) return false;

    if (this.isTextListStyle('none')) {
      listElement.style.paddingLeft = '0';
      listElement.style.listStyleType = 'none';
    } else {
      listElement.style.paddingLeft = '20px';
      listElement.style.listStyleType = this.getTextListStyle();
    }
  };

  applyFontEffect: () => void = () => {
    const element = this.getElement();

    if (element) {
      element.style.fontFamily = this.getFontFamily();
      element.style.fontWeight = this.getFontWeight();
      element.style.fontStyle = this.getFontStyle();
      element.style.textTransform = this.getTextTransform();
      element.style.textAlign = this.getTextAlign();
    }
  };

  render() {
    const element = this.getElement();
    const contenteditable = this.getContentEditable();
    if (!element || !contenteditable) return;
    this.applyFontSize();
    this.applyLetterSpacing();
    this.applyLineHeight();
    this.textDecoration.apply(element);
    this.applyOpacity()

    if (this.styleEffect.varient === TextStyleEffect.OUTLINE) {
      this.applyTextGradient(contenteditable);
    } else {
      this.applyTextGradient(element);
    }

    if (this.shapeEffect.varient !== TextShapeEffect.NONE) {
      this.shapeEffect.styleEffect = this.styleEffect;
      this.shapeEffect.textDecoration = this.textDecoration;
    }
    this.styleEffect.apply(element);
    this.shapeEffect.apply(element);

    this.renderTextScale();
    this.applyFontEffect();

    this.applyTextListStyle();
  }
}
