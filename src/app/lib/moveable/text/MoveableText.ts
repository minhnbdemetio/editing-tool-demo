import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from '../MoveableObject';
import { GradientStop } from '../../../utilities/color.type';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';
import { DEFAULT_TEXT_SCALE, TEXT_INNER_ELEMENTS } from '../constant/text';
import { EditableText } from '../editable/EditableText';
import { StyleEffect } from '../effects/text/StyleEffect';
import { TextEffect, TextEffectOptions } from '../effects/text/TextEffect';
import { ShapeEffect } from '../effects/text/ShapeEffect';
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
export type TextAlign = 'left' | 'center' | 'right';
export type TextTransform = 'none' | 'uppercase';

export type TextFormat = {
  fontFamily: string;
  textAlign: TextAlign;
  textTransform: TextTransform;
  fontWeight: string;
  fontStyle: TextFontStyle;
  textListStyle: 'none' | 'numeric' | 'dots';

  setFontStyle: (fontStyle: TextFontStyle) => void;
  getFontStyle: () => TextFontStyle;
  isFontStyle: (style: TextFontStyle) => boolean;

  setTextTransform: (textTransform: TextTransform) => void;
  getTextTransform: () => TextTransform;
  isTextTransform: (textTransform: TextTransform) => boolean;

  setFontWeight: (fontWeight: string) => void;
  getFontWeight: () => string;

  setFontFamily: (fontFamily: string) => void;
  getFontFamily: () => string;

  applyFontEffect: () => void;
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
  textTransform: TextTransform = 'normal';
  textAlign: TextAlign = 'left';
  textListStyle: 'none' | 'numeric' | 'dots' = 'none';

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
    const currentSvgElement = this.getSvgElement();
    const element = this.getElement();
    const textContainer = this.getTextContainer();
    if (!element || !textContainer) return false;
    if (currentSvgElement) {
      currentSvgElement.remove();
      textContainer.style.display = 'block';
    }
    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    svgElement.setAttribute('width', textContainer.offsetWidth.toString());
    svgElement.setAttribute('height', textContainer.offsetHeight.toString());

    svgElement.setAttribute('id', `${TEXT_INNER_ELEMENTS.SVG}-${this.id}`);
    var textElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text',
    );
    const textCssProperties = window.getComputedStyle(textContainer);
    const textLineHeight = parseFloat(textCssProperties['lineHeight']);
    const textFontSize = parseFloat(textCssProperties['fontSize']);
    const distanceBetweenBaselineAndBox = (textLineHeight - textFontSize) / 2;

    const textElementY =
      textContainer.offsetHeight - distanceBetweenBaselineAndBox;

    textElement.setAttribute('x', '0');
    textElement.setAttribute('y', textElementY.toString());
    const computedStyles = window.getComputedStyle(textContainer);
    for (let i = 0; i < computedStyles.length; i++) {
      const styleName = computedStyles[i];
      const styleValue = computedStyles.getPropertyValue(styleName);
      textElement.style[styleName as any] = styleValue;
    }

    textElement.textContent = textContainer.textContent;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradientElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient',
    );
    gradientElement.setAttribute('id', 'textGradient');
    gradientElement.setAttribute('x1', '0%');
    gradientElement.setAttribute('y1', '0%');
    gradientElement.setAttribute('x2', '0%');
    gradientElement.setAttribute('y2', '100%');

    for (let i = 0; i < stops.length; i++) {
      const stop = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'stop',
      );
      stop.setAttribute('offset', `${stops[i].offset * 100}%`);
      stop.style.stopColor = stops[i].color;
      gradientElement.appendChild(stop);
    }
    textElement.style.fill = 'url(#textGradient)';
    defs.appendChild(gradientElement);
    svgElement.appendChild(defs);
    svgElement.appendChild(textElement);
    textContainer.style.display = 'none';
    element.appendChild(svgElement);
    this.gradientStops = stops;
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

  setFontStyle: (fontStyle: TextFontStyle) => void = fontStyle => {
    this.fontStyle = fontStyle;
  };

  applyFontEffect: () => void = () => {
    const element = this.getElement();

    if (element) {
      element.style.fontFamily = this.getFontFamily();
      element.style.fontWeight = this.getFontWeight();
      element.style.fontStyle = this.getFontStyle();
      element.style.textTransform = this.getTextTransform();
    }
  };

  render() {
    const element = this.getElement();
    if (!element) return;
    this.styleEffect.apply(element);
    this.shapeEffect.apply(element);
    this.renderTextScale();
    this.applyFontEffect();
  }
}
