import {
  CURVE_EFFECT_CONTAINER,
  TEXT_CURVE_DEFAULT_VALUE,
  TEXT_CURVE_INPUT_LAYER_CONTAINER,
} from '../../constant/text';
import { TextEffect, TextEffectOptions } from './TextEffect';

export enum TextShapeEffect {
  NONE = 'none',
  CURVE = 'curve',
}

export class ShapeEffect extends TextEffect {
  constructor(option?: TextEffectOptions) {
    super(option);
  }
}

export class TextCurveEffect extends ShapeEffect {
  isRegisterInputEvent: boolean = false;
  boundOnInput: (this: HTMLElement, ev: Event) => void = () => {};
  isRegisterClickOutsideEvent: boolean = false;
  boundOnClickOutside: (this: HTMLElement, ev: Event) => void = () => {};
  isRegisterClickToCurveEvent: boolean = false;
  boundOnClickToCurveElement: (this: HTMLElement, ev: Event) => void = () => {};
  id?: string;
  constructor(option?: TextEffectOptions) {
    super(option);
    this.varient = TextShapeEffect.CURVE;
  }

  getElement(): HTMLElement | null {
    if (!this.id) return null;
    return document.getElementById(this.id);
  }

  getTextContainer(): HTMLElement | null {
    const element = this.getElement();
    if (!element) return null;
    return element.querySelector('[contentEditable]');
  }

  getCurveContainer(): HTMLElement | null {
    return document.getElementById(`${CURVE_EFFECT_CONTAINER}-${this.id}`);
  }

  getTextCureLayerContainer(): HTMLElement | null {
    return document.getElementById(
      `${TEXT_CURVE_INPUT_LAYER_CONTAINER}-${this.id}`,
    );
  }

  apply(element: HTMLElement): void {
    this.id = element.id;
    const ul = this.getTextContainer();
    if (!ul) return;
    element.style.position = 'relative';
    element.style.zIndex = '1';
    ul.style.visibility = 'hidden';
    this.generateCurveElement(element);
    const curveContainer = this.getCurveContainer();

    // Add event listener
    if (!this.isRegisterClickToCurveEvent) {
      this.isRegisterClickToCurveEvent = true;
      this.boundOnClickToCurveElement =
        this.onClickToCurveContainerElement.bind(this);
      curveContainer?.addEventListener(
        'click',
        this.boundOnClickToCurveElement,
      );
    }
  }

  generateCurveElement(element: HTMLElement) {
    const elId = element.id;
    const ul = this.getTextContainer();
    if (!ul) return false;
    const { curve = TEXT_CURVE_DEFAULT_VALUE.curve } = this.options;
    let curveContainer = this.getCurveContainer();
    if (!curveContainer) {
      curveContainer = document.createElement('div');
      curveContainer.id = `${CURVE_EFFECT_CONTAINER}-${elId}`;
      curveContainer.style.position = 'absolute';
      curveContainer.style.top = '0';
      curveContainer.style.left = '0';
      curveContainer.style.zIndex = '1';
      element.appendChild(curveContainer);
    } else {
      // Remove all child elements
      while (curveContainer.firstChild) {
        curveContainer.removeChild(curveContainer.firstChild);
      }
    }
    // Logic calculate curve
    const styles = window.getComputedStyle(element);
    const text = ul.textContent?.trim() || '';
    const fontSize = parseFloat(
      styles.fontSize?.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const width = parseFloat(
      styles.width?.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const Wi = width / text.length;
    const R = (3.2 * fontSize) / Math.sin((Math.PI * (curve ?? 50)) / 180);
    const dx = R - 3.2 * fontSize;
    const alpha = this.calculateAlphaCurve((180 * width) / (Math.PI * R));
    const delta = (180 * Wi) / (Math.PI * R);
    let nextAlpha = alpha;
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const span = document.createElement('span');
      span.innerText = letter;
      span.style.position = 'absolute';
      const { x, y } = this.calculateCurveTranslate(nextAlpha, R, dx);
      span.style.transform = `translate(${x}px, ${y}px) rotate(${
        nextAlpha - 90
      }deg)`;
      nextAlpha = alpha + (i + 1) * delta;
      if (nextAlpha > 360) {
        nextAlpha -= 360;
      }
      curveContainer.appendChild(span);
    }
  }

  calculateAlphaCurve(deg: number) {
    let a = deg;
    while (a > 360) {
      a -= 360;
    }
    a = a / 2;
    if (a <= 90) {
      return 90 - a;
    } else {
      return 450 - a;
    }
  }

  calculateCurveTranslate(
    deg: number,
    R: number,
    dx: number,
  ): { x: number; y: number } {
    let x: number, y: number;
    if (deg <= 90) {
      x = R - R * Math.cos((deg * Math.PI) / 180);
      y = R - R * Math.sin((deg * Math.PI) / 180);
    } else if (deg <= 180) {
      x = R + R * Math.sin(((deg - 90) * Math.PI) / 180);
      y = R - R * Math.cos(((deg - 90) * Math.PI) / 180);
    } else if (deg <= 270) {
      x = R + R * Math.cos(((deg - 180) * Math.PI) / 180);
      y = R + R * Math.sin(((deg - 180) * Math.PI) / 180);
    } else {
      x = R - R * Math.cos(((360 - deg) * Math.PI) / 180);
      y = R + R * Math.sin(((360 - deg) * Math.PI) / 180);
    }
    return { x: x - dx, y };
  }

  onClickOutsideCurveContainerElement(e: Event) {
    const curveContainer = this.getCurveContainer() as HTMLElement;
    if (!curveContainer) return;
    const text = this.getTextCureLayerContainer() as HTMLElement;
    const target = e.target as HTMLElement;
    if (
      target !== curveContainer &&
      target?.parentElement !== curveContainer &&
      text !== e.target
    ) {
      curveContainer.style.opacity = '1';
      if (text) {
        text.removeEventListener('input', this.boundOnInput);
        this.isRegisterInputEvent = false;
        document.body.removeChild(text);
      }
      this.isRegisterClickOutsideEvent = false;
      document.removeEventListener('mousedown', this.boundOnClickOutside);
    }
  }

  onClickToCurveContainerElement(e: Event) {
    const curveContainer = this.getCurveContainer();
    const element = this.getElement();
    const ul = this.getTextContainer();
    if (!curveContainer || !element || !ul) return;
    const elementStyles = window.getComputedStyle(element);
    const { x, y } = element.getBoundingClientRect();
    let text = this.getTextCureLayerContainer();
    if (!text) {
      text = document.createElement('div');
      text.id = `${TEXT_CURVE_INPUT_LAYER_CONTAINER}-${this.id}`;
      text.contentEditable = 'true';
      text.textContent = ul.textContent?.trim() || '';
      text.style.fontSize = elementStyles.fontSize;
      text.style.color = elementStyles.color;
      text.style.fontFamily = elementStyles.fontFamily;
      text.style.position = 'fixed';
      text.style.top = `${y}px`;
      text.style.left = `${x}px`;
      text.style.minWidth = '20px';
      text.style.minHeight = '20px';
    }
    curveContainer.style.opacity = '0.3';
    document.body.appendChild(text);
    if (!this.isRegisterClickOutsideEvent) {
      this.isRegisterClickOutsideEvent = true;
      this.boundOnClickOutside =
        this.onClickOutsideCurveContainerElement.bind(this);
      document.addEventListener('mousedown', this.boundOnClickOutside);
    }
    if (!this.isRegisterInputEvent) {
      this.isRegisterInputEvent = true;
      this.boundOnInput = this.onInput.bind(this);
      text.addEventListener('input', this.boundOnInput);
    }
  }

  onInput(e: Event) {
    const curveContainer = this.getCurveContainer();
    const element = this.getElement();
    if (!curveContainer || !element) return;
    const ul = this.getTextContainer();
    if (!curveContainer || !ul) return;
    const target = e.target as HTMLInputElement;
    const textContent = target.textContent?.trim() || '';
    ul.textContent = textContent;
    this.generateCurveElement(element);
  }

  reset(el: HTMLElement): void {
    const ul = this.getTextContainer();
    const curveContainer = this.getCurveContainer();
    const textLayerContainer = this.getTextCureLayerContainer();
    if (textLayerContainer) {
      textLayerContainer.removeEventListener('input', this.boundOnInput);
      this.isRegisterInputEvent = false;
      document.body.removeChild(textLayerContainer);
    }
    if (!curveContainer || !ul) return;
    curveContainer.parentElement?.removeChild(curveContainer);
    ul.style.visibility = 'unset';
    if (ul.parentElement) {
      ul.parentElement.style.position = 'unset';
    }
    this.isRegisterClickToCurveEvent = false;
    document.removeEventListener('mousedown', this.boundOnClickToCurveElement);
  }
}
