import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from './MoveableObject';
import { GradientStop } from '../utilities/color.type';
import { TEXT_CONTAINER } from '../constants/moveable';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';
import { hexToRgba } from '../utilities/color';

export type MoveableTextShadow = {
  color?: string;
  offset?: number;
  direction?: number;
  blur?: number;
  transparency?: number;
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

export class MoveableTextObject extends MoveableObject {
  variant?: MoveableTextVariant;
  styleEffect?: MoveableTextStyleEffect;
  textShadow?: MoveableTextShadow;
  textIntensity?: number;
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'text';
    this.variant = 'normal';
    this.styleEffect = 'none';
  }

  clone(options?: { htmlString: string; id: string }): MoveableTextObject {
    if (options) {
      return new MoveableTextObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
  getFontSize() {
    const fontSizeString = this.getCssProperty('fontSize');
    const matches = fontSizeString?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getLetterSpacing() {
    const letterSpacing = this.getCssProperty('letterSpacing');
    const matches = letterSpacing?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getLineHeight() {
    const lineHeight = this.getCssProperty('lineHeight');
    const matches = lineHeight?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    }
    return undefined;
  }
  getTextShadow() {
    if (this.textShadow) return this.textShadow;
    return undefined;
  }
  getTextStyleEffect() {
    return this.styleEffect;
  }
  getTextIntensity() {
    return this.textIntensity;
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
  }
  setTextGradient(stops: GradientStop[]) {
    const element = this.getElement();
    const textContainer = this.getTextContainer();
    if (!element || !textContainer) return false;
    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    svgElement.setAttribute('width', textContainer.offsetWidth.toString());

    svgElement.setAttribute('height', textContainer.offsetHeight.toString());

    svgElement.setAttribute('id', `svg-${this.id}`);
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
  }
  getTextContainer() {
    let attempt = 0;
    let element = null;
    const textContainerId = `text-container-${this.id}`;
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
  changeTransformOrigin(
    transformOrigin?: CSSStyleDeclaration['transformOrigin'],
  ) {
    //TODO: Not working yet
    const element = this.getElement();
    if (!element) return;
    element.style.transformOrigin = transformOrigin ?? 'bottom';
  }
  toggleLock(): void {
    super.toggleLock();
    const textContainer = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    );
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
  setTextShadow(textShadow: MoveableTextShadow) {
    const MAX_VALUE = 16;
    const element = this.getElement();
    if (!element) return false;
    const {
      color = this.getCssProperty('color') || '#000',
      offset = 50,
      direction = 45,
      blur = 0,
      transparency = 40,
    } = textShadow;
    const offsetVal = (offset / 100) * MAX_VALUE;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${hShadow}px ${vShadow}px ${
      (blur / 100) * MAX_VALUE
    }px ${hexToRgba(color, transparency / 100)}`;
    element.style.textShadow = shadow;
  }
  setStyleEffect(styleEffect: MoveableTextStyleEffect) {
    this.styleEffect = styleEffect;
  }
  setEffectLift(intensity: number, color: string = '#000') {
    const element = this.getElement();
    if (!element) return false;
    this.textIntensity = intensity;
    const transparency = ((60 - 5) / 100) * intensity + 5;
    const blur = ((34.5 - 4.6) / 100) * intensity + 4.6;
    const shadow = `${hexToRgba(
      color,
      transparency / 100,
    )} 0px 4.6px ${blur}px `;
    element.style.textShadow = shadow;
  }
}
