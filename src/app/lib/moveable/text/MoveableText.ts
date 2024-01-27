import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from '../MoveableObject';
import { GradientStop } from '../../../utilities/color.type';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';
import {
  DEFAULT_TEXT_SCALE,
  GRADIENT_BACKGROUND_CSS_VARIABLE,
  GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE,
  TEXT_INNER_ELEMENTS,
} from '../constant/text';
import { EditableText } from '../editable/EditableText';
import { StyleEffect, TextStyleEffect } from '../effects/text/StyleEffect';
import { TextEffect, TextEffectOptions } from '../effects/text/TextEffect';
import { ShapeEffect, TextShapeEffect } from '../effects/text/ShapeEffect';
import { CSSProperties } from 'react';

export type MoveableTextShadow = {
  color?: string;
  offset?: number;
  direction?: number;
  blur?: number;
  transparency?: number;
  thickness?: number;
};

export type TextSpliceEffectOption = {
  thickness?: number;
  offset?: number;
  direction?: number;
  color?: string;
};

export type TextOutlineEffectOption = {
  thickness: number;
  color: string;
};

export type TextBackgroundEffectOption = {
  spread?: number;
  color?: string;
  roundness?: number;
  transparency?: number;
};

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
  textDecoration: TextDecoration;

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

  getTextDecoration: () => TextDecoration;
  setTextDecoration: (key: keyof TextDecoration, state: boolean) => void;
  isTextDecorationEnable: (key: keyof TextDecoration) => boolean;

  getTextListStyle: () => TextListStyle;
  setTextListStyle: (listStyle: TextListStyle) => void;
  isTextListStyle: (listStyle: TextListStyle) => boolean;

  setFontFamily: (fontFamily: string) => void;
  getFontFamily: () => string;

  applyFontEffect: () => void;
  applyTextDecorationEffect: () => void;
  applyTextListStyle: () => void;
};

export type MoveableTextStyleEffect =
  | 'none'
  | 'shadow'
  | 'lift'
  | 'hollow'
  | 'emboss'
  | 'outline'
  | 'echo'
  | 'glitch'
  | 'neon'
  | 'background';

export type TransformDirection = 'bottom' | 'center' | 'top';

export type MoveableTextShapeEffect = 'none' | 'curve';

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
  textDecoration: TextDecoration = {
    lineThrough: false,
    underline: false,
  };
  textListStyle: TextListStyle = 'none';

  constructor(options?: { id: string; htmlString: string }) {
    super(options);
    this.type = 'text';
    this.variant = 'normal';
    this.transformDirection = 'bottom';
    this.styleEffect = new StyleEffect();
    this.shapeEffect = new ShapeEffect();
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
    const fontSizeString = this.getElementCss('fontSize');
    const matches = fontSizeString?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getLetterSpacing() {
    const letterSpacing = this.getElementCss('letterSpacing');
    const matches = letterSpacing?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getLineHeight() {
    const lineHeight = this.getElementCss('lineHeight');
    const matches = lineHeight?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getTextStyleEffect() {
    return this.styleEffect;
  }
  getOpacity() {
    const opacity = this.getElementCss('opacity');
    if (opacity) {
      return Math.round(parseFloat(opacity) * 100);
    }
    return 100;
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
    const element = this.getElement();
    if (!element) return false;
    element.style.opacity = `${opacity / 100}`;
  }
  setFontSize(fontSize: number | null) {
    const element = this.getElement();
    if (!element) return false;
    element.style.fontSize = fontSize + 'px';
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
    const element = this.getElement();
    if (!element) return false;
    element.style.letterSpacing = letterSpacing + 'px';
  }
  setLineHeight(lineHeight: number | null) {
    const element = this.getElement();
    if (!element) return false;
    element.style.lineHeight = lineHeight + 'px';
  }
  setStyleEffect(styleEffect: TextEffect) {
    this.styleEffect = styleEffect;
  }
  updateStyleEffectOption(option: TextEffectOptions) {
    this.styleEffect.setOption(option);
  }

  setTextStrokeEffect(
    thickness: number,
    radius: number = 0.0916,
    color?: string,
    el?: HTMLElement,
  ) {
    const element = el ?? this.getElement();
    if (!element) return false;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_THICKNESS = parseFloat(matches?.[1] ?? '0') * radius;
    element.style.caretColor = color ?? styles.color;
    element.style.webkitTextStrokeWidth = `${
      (thickness - 1) * (MAX_THICKNESS / 99)
    }px`;
    element.style.webkitTextStrokeColor = color ?? styles.color;
    element.style.webkitTextFillColor = 'transparent';
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
    console.debug({ listStyle });
    this.textListStyle = listStyle;
  };
  isTextListStyle: (listStyle: TextListStyle) => boolean = listStyle => {
    return this.getTextListStyle() === listStyle;
  };

  getTextDecoration: () => TextDecoration = () => this.textDecoration;
  setTextDecoration: (key: keyof TextDecoration, state: boolean) => void = (
    key,
    state,
  ) => {
    this.textDecoration[key] = state;
  };
  isTextDecorationEnable: (key: keyof TextDecoration) => boolean = key =>
    this.textDecoration[key];

  setFontStyle: (fontStyle: TextFontStyle) => void = fontStyle => {
    this.fontStyle = fontStyle;
  };

  applyTextDecorationEffect: () => void = () => {
    const element = this.getElement();

    if (element) {
      const textDecorations: string[] = [];
      if (this.getTextDecoration()['underline'])
        textDecorations.push('underline');

      if (this.getTextDecoration()['lineThrough'])
        textDecorations.push('line-through');

      element.style.textDecoration = textDecorations.join(' ');
    }
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

    if (this.styleEffect.varient === TextStyleEffect.OUTLINE) {
      this.applyTextGradient(contenteditable);
    } else {
      this.applyTextGradient(element);
    }

    if (this.shapeEffect.varient !== TextShapeEffect.NONE) {
      this.shapeEffect.styleEffect = this.styleEffect;
    }
    this.styleEffect.apply(element);
    this.shapeEffect.apply(element);
    
    this.renderTextScale();
    this.applyFontEffect();
    this.applyTextDecorationEffect();
    this.applyTextListStyle();
  }
}
