import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from './MoveableObject';
import { GradientStop } from '../utilities/color.type';
import { TEXT_CONTAINER } from '../constants/moveable';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';
import { hexToRgba } from '../utilities/color';
import { type } from 'os';

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

export type MoveableTextShapeEffect = 'none' | 'curve';

export class MoveableTextObject extends MoveableObject {
  variant?: MoveableTextVariant;
  styleEffect?: MoveableTextStyleEffect;
  shapeEffect?: MoveableTextShapeEffect;
  textShadow?: MoveableTextShadow;
  textIntensity?: number;
  thicknessHollowEffect?: number;
  spliceEffect?: TextSpliceEffectOption;
  outlineEffect?: TextOutlineEffectOption;
  echoEffect?: MoveableTextShadow;
  glitchEffect?: MoveableTextShadow;
  neonEffect?: MoveableTextShadow;
  backgroundEffect?: MoveableTextShadow;
  curve?: number;
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
  getOpacity() {
    const opacity = this.getCssProperty('opacity');
    if (opacity) {
      return Math.round(parseFloat(opacity) * 100);
    }
    return 100;
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
  setTextShadow(textShadow?: MoveableTextShadow) {
    if (!textShadow) {
      this.textShadow = undefined;
      return true;
    }
    const element = this.getElement();
    if (!element) return false;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_VALUE = parseFloat(matches?.[1] ?? '0') * 0.166;

    const {
      color = styles.color,
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
  setEffectLift(intensity?: number, color: string = '#000') {
    if (!intensity) {
      this.textIntensity = undefined;
      return true;
    }
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

  setThicknessHollowEffect(thickness: number) {
    const element = this.getElement();
    if (!element) return false;
    this.thicknessHollowEffect = thickness;
    this.setTextStrokeEffect(thickness);
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

  setSpliceEffect(option: TextSpliceEffectOption) {
    const element = this.getElement();
    if (!element) return false;
    this.spliceEffect = option;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.166;

    const {
      thickness = 50,
      offset = 50,
      direction = -45,
      color = styles.color,
    } = option;

    const offsetVal = (offset / 100) * MAX_SHADOW;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${color} ${hShadow}px ${vShadow}px 0px`;
    element.style.textShadow = shadow;
    this.setTextStrokeEffect(thickness);
  }

  setOutlineEffect(option: TextOutlineEffectOption) {
    const element = this.getElement();
    if (!element) return false;
    this.outlineEffect = option;
    const { thickness, color } = option;
    const clonedElementId = `outline-${this.id}`;
    let clonedElement = document.getElementById(clonedElementId);

    if (!clonedElement) {
      clonedElement = element.cloneNode(true) as HTMLElement;
      element.style.position = 'relative';
      clonedElement.id = `outline-${this.id}`;
      clonedElement.style.webkitTextFillColor = 'unset';
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '0';
      clonedElement.style.left = '0';
      clonedElement.style.zIndex = '-1';
      element.appendChild(clonedElement);
    }

    // Append the cloned element to the parent element
    this.setTextStrokeEffect(thickness, 0.0916, color, clonedElement);
  }

  setEchoEffect(option: MoveableTextShadow) {
    const element = this.getElement();
    if (!element) return false;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.166;
    const { offset = 50, direction = -45, color = styles.color } = option;

    const offsetVal = (offset / 100) * MAX_SHADOW;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${hexToRgba(
      color,
      0.5,
    )} ${hShadow}px ${vShadow}px 0px, ${hexToRgba(color, 0.3)} ${
      +hShadow * 2
    }px ${+vShadow * 2}px 0px`;
    element.style.textShadow = shadow;
  }

  setGlitchEffect(option: MoveableTextShadow) {
    const element = this.getElement();
    if (!element) return false;
    const styles = window.getComputedStyle(element);
    const isBlueRedColor = option.color === 'blue-red';
    const firstColor = 'rgb(0, 255, 255)';
    const secondColor = isBlueRedColor ? 'rgb(255, 0, 255)' : 'rgb(255, 0, 0)';
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.0833;
    const { offset = 50, direction = -45 } = option;
    const offsetVal = (offset / 100) * MAX_SHADOW;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${firstColor} ${hShadow}px ${vShadow}px 0px, ${secondColor} ${
      +hShadow * -1
    }px ${+vShadow * -1}px 0px`;

    element.style.textShadow = shadow;
    this.glitchEffect = option;
  }

  setNeonEffect(option: MoveableTextShadow) {
    const element = this.getElement();
    if (!element) return false;
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_THICKNESS = parseFloat(matches?.[1] ?? '0') * 0.0166;
    const { thickness = 1 } = option;
    const baseVal = (0.061 * thickness + 1.6) * MAX_THICKNESS;
    const filter = `drop-shadow(0px 0px ${baseVal}px ${hexToRgba(
      color,
      0.95,
    )}) drop-shadow(0px 0px ${baseVal * 5}px ${hexToRgba(
      color,
      0.75,
    )}) drop-shadow(0px 0px ${baseVal * 5 * 3}px ${hexToRgba(color, 0.44)})`;
    element.style.filter = filter;
    element.style.color = hexToRgba(color, (thickness * 0.55 + 34.45) / 100);
  }

  setBackgroundEffect(option: MoveableTextShadow) {
    const element = this.getElement();
    if (!element) return false;
    const bgEffectId = `bg-effect-${this.id}`;
    let canvas = document.getElementById(bgEffectId) as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.id = bgEffectId;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '-1';
      element.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = option.color ?? '#000';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.globalCompositeOperation = 'xor';
    ctx.beginPath();
    ctx.fillText(element.textContent || '', 30, 200);
    ctx.fill();
    ctx.restore();
  }

  setShapeEffect(shapeEffect: MoveableTextShapeEffect) {
    this.shapeEffect = shapeEffect;
  }

  setCurve(curve: number) {
    const element = this.getElement();
    if (!element) return false;
    document.removeEventListener(
      'mousedown',
      this.onClickOutsideSvgElement.bind(this),
    );
    const elId = this.id;
    const ul = element.querySelector(
      `#${TEXT_CONTAINER}${elId}`,
    ) as HTMLElement;
    if (!ul) return false;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const fontSize = parseFloat(matches?.[1] ?? '0');
    const width = parseFloat(
      styles.width?.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const svgId = `svg-${this.id}`;
    if (element.querySelector(`#${svgId}`)) {
      element.removeChild(element.querySelector(`#${svgId}`) as Element);
    }
    if (curve === 0) {
      element.style.position = 'unset';
      element.style.zIndex = 'unset';
      ul.style.visibility = 'unset';
      return;
    }
    this.curve = curve;
    element.style.position = 'relative';
    element.style.zIndex = '1';

    // Create the SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('id', svgId);

    // Create the defs and path elements
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const R = (fontSize * 2.5) / Math.sin((Math.abs(curve) * Math.PI) / 180);
    const startOffset = (100 * (180 - (width * 180) / R / Math.PI)) / 4 / 180;
    if (curve < 0) {
      path.setAttribute(
        'd',
        `M 0, 0
        a ${R},${R} 0 1,0  ${2 * R},0
        a ${R},${R} 0 1,0 ${-2 * R},0`,
      );
    } else {
      path.setAttribute(
        'd',
        `M ${2 * R}, ${2 * R}
        a ${R},${R} 0 1,0  ${-2 * R},0
        a ${R},${R} 0 1,0 ${2 * R},0`,
      );
    }
    path.setAttribute('fill', 'red');
    path.setAttribute('opacity', '0.2');
    path.setAttribute('id', 'txt-path');
    defs.appendChild(path);
    svg.appendChild(defs);

    // Create the text and textPath elements
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('fill', styles.color);
    text.setAttribute('font-size', styles.fontSize);
    text.setAttribute('font-family', styles.fontFamily);
    text.setAttribute('font-weight', styles.fontWeight);
    const textPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'textPath',
    );
    textPath.setAttribute('startOffset', `${startOffset}%`);
    textPath.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      '#txt-path',
    );
    textPath.setAttribute('id', `svg-text-content-${this.id}`);
    textPath.textContent = element.textContent;
    text.appendChild(textPath);
    svg.appendChild(text);
    svg.style.position = 'absolute';
    svg.style.zIndex = '1';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = `${R * 3}px`;
    svg.style.height = `${3 * R}px`;
    ul.style.visibility = 'hidden';

    document.removeEventListener(
      'mousedown',
      this.onClickOutsideSvgElement.bind(this),
    );

    svg.addEventListener('click', () => {
      ul.style.visibility = 'unset';
      ul.parentElement.style.position = 'absolute';
      ul.parentElement.style.zIndex = '9';
      svg.style.opacity = '0.3';
      document.addEventListener(
        'mousedown',
        this.onClickOutsideSvgElement.bind(this),
      );
      ul.addEventListener('input', this.onInput.bind(this));
    });

    // Append the SVG to the body
    element.appendChild(svg);
  }

  setShapeNone() {
    const li = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    ) as HTMLElement;
    const svgId = `svg-${this.id}`;
    const svgElement = document.getElementById(svgId);
    if (!svgElement || !li) return;
    svgElement.parentElement?.removeChild(svgElement);
    li.style.visibility = 'unset';
    li.parentElement.style.position = 'unset';
    li.removeEventListener('input', this.onInput.bind(this));
    document.removeEventListener(
      'mousedown',
      this.onClickOutsideSvgElement.bind(this),
    );
  }

  onInput(e: Event) {
    const li = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    ) as HTMLElement;
    const svgId = `svg-text-content-${this.id}`;
    const svgElement = document.getElementById(svgId);
    if (!svgElement) return;
    svgElement.textContent = li.textContent;
  }

  onClickOutsideSvgElement(e: Event) {
    const svgId = `svg-${this.id}`;
    const svgElement = document.getElementById(svgId);
    if (!svgElement) return;
    const li = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    ) as HTMLElement;
    if (e.target !== svgElement && li !== e.target) {
      svgElement.style.opacity = '1';
      li.parentElement.style.position = 'unset';
      li.style.visibility = 'hidden';
      document.removeEventListener(
        'mousedown',
        this.onClickOutsideSvgElement.bind(this),
      );
      li.removeEventListener('input', this.onInput.bind(this));
    }
  }
}
