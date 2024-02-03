import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from '../MoveableObject';
import { GradientStop } from '../../../utilities/color.type';

import {
  DEFAULT_TEXT_SCALE,
  GRADIENT_BACKGROUND_CSS_VARIABLE,
  GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE,
  TEXT_INNER_ELEMENTS,
  TEXT_STYLE_FONT_SIZE,
  TextVariant,
} from '../constant/text';
import { EditableText } from '../editable/EditableText';
import { StyleEffect, TextStyleEffect } from '../effects/text/StyleEffect';
import { TextEffect, TextEffectOptions } from '../effects/text/TextEffect';
import { ShapeEffect, TextShapeEffect } from '../effects/text/ShapeEffect';
import { TextDecorationEffect } from '../effects/text/TextDecorationEffect';
import {
  TextDecoration,
  TextFontStyle,
  TextFormat,
  TextListStyle,
  TextTransform,
  TransformDirection,
} from './TextFormat';
import { TextStyle } from './TextStyle';
import { v4 } from 'uuid';
import { OBJECT_INNER_ELEMENTS } from '../constant/object';

export class MoveableTextObject
  extends MoveableObject
  implements EditableText, TextFormat
{
  variant?: TextVariant;
  gradientStops?: GradientStop[];
  transformDirection: string;
  curve?: number;
  scaleY: number;
  scaleX: number;
  styleEffect: StyleEffect;
  shapeEffect: ShapeEffect;
  fontFamily: string;
  fontStyle: TextFontStyle;
  textTransform: TextTransform;
  textAlign: string;
  textDecoration: TextDecorationEffect;
  textListStyle: TextListStyle;
  letterSpacing: number;
  lineHeight: number;
  opacity: number;
  textStyle: TextStyle;
  fontWeight: string;
  editable: boolean;
  color: string = 'black';
  previousSize: {
    width: number;
    height: number;
  } = {
    width: 0,
    height: 0,
  };
  isResizing: boolean = false;

  constructor(options?: Partial<MoveableTextObject>) {
    super(options);
    this.type = 'text';
    this.variant = TextVariant.NORMAL;
    this.transformDirection = 'bottom';
    this.styleEffect = new StyleEffect();
    this.shapeEffect = new ShapeEffect();
    this.textStyle = {
      fontSize: TEXT_STYLE_FONT_SIZE.NORMAL,
    };
    this.lineHeight = 1.5;
    this.scaleX = DEFAULT_TEXT_SCALE;
    this.scaleY = DEFAULT_TEXT_SCALE;
    this.fontFamily = 'Arial';
    this.fontStyle = 'normal';
    this.textTransform = 'none';
    this.textAlign = 'left';
    this.textDecoration = new TextDecorationEffect();
    this.textListStyle = 'none';
    this.letterSpacing = 0;
    this.opacity = 1;
    this.fontWeight = '400';
    this.editable = false;
  }
  getTextStyle() {
    return this.textStyle;
  }
  getFontSize() {
    return this.textStyle.fontSize;
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
  getOpacity() {
    return Math.round(this.opacity * 100);
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
    this.textStyle = { ...this.textStyle, fontSize: fontSize };
  }
  applyFontSize() {
    const element = this.getElement();
    if (!element) return false;
    element.style.fontSize = this.textStyle.fontSize + 'px';
  }
  setTextStyle(textStyle: TextStyle) {
    this.textStyle = textStyle;
  }
  applyTextStyle() {
    this.applyFontSize();
  }
  getColor() {
    return this.color;
  }
  setTextColor(color: string) {
    this.color = color;
    this.gradientStops = undefined;
  }
  applyColor() {
    const element = this.getElement();
    if (!element) return false;
    element.style.color = this.color;
  }
  setTextGradient(stops: GradientStop[]) {
    this.gradientStops = stops;
  }
  setEditable(editable: boolean) {
    this.editable = editable;
  }
  getEditable() {
    return this.editable;
  }
  getResizingStatus() {
    return this.isResizing;
  }
  setResizing(isResizing: boolean) {
    this.isResizing = isResizing;
  }

  getPreviousSize() {
    return this.previousSize;
  }

  setPreviousSize(size: { width: number; height: number }) {
    this.previousSize = size;
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
  getSvgElement() {
    return document.getElementById(`${TEXT_INNER_ELEMENTS.SVG}-${this.id}`);
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
  getFlipperElement() {
    return document.getElementById(
      `${OBJECT_INNER_ELEMENTS.FLIPPER}-${this.id}`,
    );
  }
  changeTransformOrigin(transformDirection: TransformDirection) {
    this.transformDirection = transformDirection;
  }
  onUpdateTransformDirection() {
    if (this.transformDirection === 'bottom' && this.isResizing) return;
    const element = this.getElement();
    if (!element) return;
    const prevHeight = this.getPreviousSize().height;
    const currentHeight = element.clientHeight;
    const elementStyles = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(elementStyles.webkitTransform);
    const translateX = matrix.e;
    const translateY = matrix.f;

    // Calculate the new transform origin

    if (this.transformDirection === 'center') {
      element.style.transform = `translate(${translateX}px, ${
        translateY - (currentHeight - prevHeight) / 2
      }px)`;
    } else if (this.transformDirection === 'top') {
      element.style.transform = `translate(${translateX}px, ${
        translateY - (currentHeight - prevHeight)
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
    element.style.lineHeight = `${this.lineHeight}`;
  }
  setStyleEffect(styleEffect: TextEffect) {
    this.styleEffect = styleEffect;
    this.styleEffect.id = this.id;
  }
  updateStyleEffectOption(option: TextEffectOptions) {
    this.styleEffect.setOption(option);
  }

  setShapeEffect(shapeEffect: ShapeEffect) {
    this.shapeEffect = shapeEffect;
    this.shapeEffect.id = this.id;
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
  applyFontWeight() {
    const element = this.getElement();
    if (!element) return;
    element.style.fontWeight = this.fontWeight;
  }
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

  setFontStyle(fontStyle: TextFontStyle) {
    this.fontStyle = fontStyle;
  }

  applyTextListStyle: () => void = () => {
    const listElements = this.getElement()?.querySelectorAll('ul');
    if (!listElements?.length) return false;

    listElements.forEach(listElement => {
      if (this.isTextListStyle('none')) {
        listElement.style.paddingLeft = '0';
        listElement.style.listStyleType = 'none';
      } else {
        listElement.style.paddingLeft = '20px';
        listElement.style.listStyleType = this.getTextListStyle();
      }
    });
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
    const contenteditable = this.getTextContainer();
    const flipperElement = this.getFlipperElement();
    if (!element || !contenteditable) return;
    this.applyFontSize();
    this.applyLetterSpacing();
    this.applyLineHeight();
    this.textDecoration.apply(element);
    this.applyOpacity();
    this.applyColor();

    if (this.styleEffect.variant === TextStyleEffect.OUTLINE) {
      this.applyTextGradient(contenteditable);
    } else {
      this.applyTextGradient(element);
    }

    if (this.shapeEffect.variant !== TextShapeEffect.NONE) {
      this.shapeEffect.styleEffect = this.styleEffect;
      this.shapeEffect.textDecoration = this.textDecoration;
    }
    if (flipperElement) {
      this.styleEffect.apply(flipperElement);
      this.shapeEffect.apply(flipperElement);
    }

    this.renderTextScale();
    this.applyFontEffect();

    this.applyTextListStyle();
  }
  async setupMoveable(): Promise<void> {
    super.setupMoveable();
    const element = this.getElement();
    const textContainer = this.getTextContainer();
    if (!element || !textContainer) return;
    textContainer.addEventListener('dblclick', () => {
      textContainer.setAttribute('contenteditable', 'true');
      textContainer.focus();
      this.setEditable(true);
    });
    textContainer.addEventListener('blur', () => {
      textContainer.setAttribute('contenteditable', 'false');
      this.setEditable(false);
    });
    this.setPreviousSize({
      width: element.clientWidth,
      height: element.clientHeight,
    });
  }
  clone(options?: Partial<MoveableTextObject>): MoveableTextObject {
    return new MoveableTextObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
