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
  backgroundEffect?: TextBackgroundEffectOption;
  curve?: number;
  transformDirection: string;
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'text';
    this.variant = 'normal';
    this.styleEffect = 'none';
    this.transformDirection = 'bottom';
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
    this.onUpdateBackgroundEffect();
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
  changeTransformOrigin(transformDirection: TransformDirection) {
    this.transformDirection = transformDirection;
  }
  onUpdateTransformDirection() {
    if (this.transformDirection === 'bottom') return;
    const element = this.getElement();
    const textContainer = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    );
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
    const textContainer = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    );
    textContainer?.setAttribute('contenteditable', !this.toggleLock + '');
  }

  setLetterSpacing(letterSpacing: number | null) {
    const element = this.getElement();
    if (!element) return false;
    element.style.letterSpacing = letterSpacing + 'px';
    this.onUpdateBackgroundEffect();
  }
  setLineHeight(lineHeight: number | null) {
    const element = this.getElement();
    if (!element) return false;
    element.style.lineHeight = lineHeight + 'px';
    this.onUpdateBackgroundEffect();
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
    this.textShadow = textShadow;
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
      clonedElement.style.transform = 'initial';
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
    this.echoEffect = option;
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
    const color =
      element.style.getPropertyValue('--prev-color') || styles.color;
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
    element.style.setProperty('--prev-color', color);
    element.style.color = hexToRgba(color, (thickness * 0.55 + 34.45) / 100);
    this.neonEffect = option;
  }

  setBackgroundEffect(option: TextBackgroundEffectOption) {
    this.backgroundEffect = option;
    this.shapeEffect = 'none';
    this.curve = undefined;
    this.onUpdateBackgroundEffect();
  }

  onUpdateBackgroundEffect() {
    const element = this.getElement();
    if (
      !element ||
      this.styleEffect !== 'background' ||
      this.shapeEffect === 'curve'
    )
      return false;
    const bgEffectId = `bg-effect-${this.id}`;
    const {
      color = 'FFED00',
      spread = 50,
      roundness = 50,
      transparency = 100,
    } = this.backgroundEffect ?? {};
    const textContainer = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    );
    const firstTextChild = textContainer?.firstElementChild;
    if (!textContainer || !firstTextChild) return false;
    const textChildStyles = window.getComputedStyle(firstTextChild);
    const elHeight = parseFloat(
      textChildStyles.height.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const widthContainer = parseFloat(
      window
        .getComputedStyle(textContainer)
        .width.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );

    const bgElement = document.getElementById(bgEffectId);
    if (bgElement) {
      element.removeChild(bgElement);
    }
    const spreadVal = (spread / 100) * 10;
    const roundnessVal = (roundness / 100) * 10;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.style.position = 'relative';
    svg.id = bgEffectId;
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = `${-spreadVal}px`;
    svg.style.right = `${widthContainer + spreadVal}px`;
    svg.style.zIndex = '-1';
    svg.style.height = '100%';
    element.appendChild(svg);
    let prevPathWidth = 0;
    const lengthItems = textContainer.childNodes.length;
    textContainer.childNodes.forEach((el, index) => {
      let elWidth = 0;
      if (!el.textContent) {
        elWidth = prevPathWidth;
      } else {
        elWidth = this.getTextContentWidth(el.textContent) + 2 * spreadVal;
      }
      prevPathWidth = elWidth;
      const startX = spreadVal - roundnessVal;
      const startY = elHeight * index;
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      ) as SVGPathElement;
      path.setAttribute(
        'd',
        `M ${startX} ${startY} L ${
          index === 0 ? startX + elWidth - roundnessVal : startX + elWidth
        } ${startY} ${
          index === 0
            ? `C ${startX + elWidth - roundnessVal} ${startY}, ${
                startX + elWidth
              } ${startY}, ${startX + elWidth} ${startY + roundnessVal}`
            : ''
        }L ${startX + elWidth} ${
          index === lengthItems - 1
            ? startY + elHeight - roundnessVal
            : startY + elHeight
        }
        ${
          index === lengthItems - 1
            ? `C ${startX + elWidth} ${startY + elHeight - roundnessVal}, ${
                startX + elWidth
              } ${startY + elHeight}, ${startX + elWidth - roundnessVal} ${
                startY + elHeight
              }`
            : ''
        }
        L ${index === lengthItems - 1 ? startX + roundnessVal : startX} ${
          startY + elHeight
        }
        ${
          index === lengthItems - 1
            ? `C ${startX + roundnessVal} ${startY + elHeight}, ${startX} ${
                startY + elHeight
              }, ${startX} ${startY + elHeight - roundnessVal}`
            : ''
        }
        L ${startX} ${index === 0 ? startY + roundnessVal : startY}
        ${
          index === 0
            ? `C ${startX} ${startY + roundnessVal}, ${startX} ${startY}, ${
                startX + roundnessVal
              } ${startY}`
            : ''
        } z`,
      );
      path.setAttribute('fill', color);
      path.style.fillOpacity = `${transparency / 100}`;
      svg.appendChild(path);
    });
  }

  getTextContentWidth(textContent: string): number {
    const element = this.getElement();
    if (!textContent || !element) return 0;
    const span = document.createElement('span');
    span.textContent = textContent;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    element.appendChild(span);
    const styles = window.getComputedStyle(span);
    const width = parseFloat(
      styles.width.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    element.removeChild(span);
    return width;
  }

  setShapeEffect(shapeEffect: MoveableTextShapeEffect) {
    this.shapeEffect = shapeEffect;
  }

  setShapeNone() {
    const ul = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    ) as HTMLElement;
    const curveContainerId = `curve-effect-${this.id}`;
    const curveContainer = document.getElementById(curveContainerId);
    if (!curveContainer || !ul) return;
    curveContainer.parentElement?.removeChild(curveContainer);
    ul.style.visibility = 'unset';
    if (ul.parentElement) {
      ul.parentElement.style.position = 'unset';
    }
    document.removeEventListener(
      'mousedown',
      this.onClickOutsideCurveContainerElement.bind(this),
    );
  }

  onInput(e: Event) {
    const curveContainerId = `curve-effect-${this.id}`;
    const curveContainer = document.getElementById(curveContainerId);
    const ul = document.getElementById(
      `${TEXT_CONTAINER}${this.id}`,
    ) as HTMLElement;
    if (!curveContainer || !ul) return;
    const target = e.target as HTMLInputElement;
    const textContent = target.textContent?.trim() || '';
    ul.textContent = textContent;
    this.generateCurveElement();
  }

  onClickOutsideCurveContainerElement(e: Event) {
    const curveContainerId = `curve-effect-${this.id}`;
    const curveContainer = document.getElementById(curveContainerId);
    if (!curveContainer) return;
    const text = document.getElementById(
      `text-layer-${this.id}`,
    ) as HTMLElement;
    const target = e.target as HTMLElement;
    if (
      target !== curveContainer &&
      target?.parentElement !== curveContainer &&
      text !== e.target
    ) {
      curveContainer.style.opacity = '1';
      if (text) {
        text.removeEventListener('input', this.onInput.bind(this));
        document.body.removeChild(text);
      }
      document.removeEventListener(
        'mousedown',
        this.onClickOutsideCurveContainerElement.bind(this),
      );
    }
  }

  setCurveEffect(curve: number) {
    const element = this.getElement();
    if (!element) return false;
    document.removeEventListener(
      'mousedown',
      this.onClickOutsideCurveContainerElement.bind(this),
    );
    // Save state
    this.curve = curve;
    const elId = this.id;
    const ul = element.querySelector(
      `#${TEXT_CONTAINER}${elId}`,
    ) as HTMLElement;
    if (!ul) return false;
    element.style.position = 'relative';
    element.style.zIndex = '1';
    ul.style.visibility = 'hidden';
    this.generateCurveElement();
    const curveContainer = document.getElementById(
      `curve-effect-${elId}`,
    ) as HTMLElement;

    // Add event listener
    curveContainer?.addEventListener(
      'click',
      this.onClickToCurveContainerElement.bind(this),
    );
  }

  generateCurveElement() {
    const element = this.getElement();
    if (!element) return false;
    const elId = this.id;
    const ul = element.querySelector(
      `#${TEXT_CONTAINER}${elId}`,
    ) as HTMLElement;
    if (!ul) return false;
    let curveContainer = document.getElementById(`curve-effect-${elId}`);
    if (!curveContainer) {
      curveContainer = document.createElement('div');
      curveContainer.id = `curve-effect-${elId}`;
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
    const R = (3.2 * fontSize) / Math.sin((Math.PI * (this.curve ?? 50)) / 180);
    const dx = R - 3.2 * fontSize;
    const alpha = this.caculateAlphaCurve((180 * width) / (Math.PI * R));
    const delta = (180 * Wi) / (Math.PI * R);
    let nextAlpha = alpha;
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const span = document.createElement('span');
      span.innerText = letter;
      span.style.position = 'absolute';
      const { x, y } = this.caculateCurveTranslate(nextAlpha, R, dx);
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

  caculateAlphaCurve(deg: number) {
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
  caculateCurveTranslate(
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
  onClickToCurveContainerElement(e: Event) {
    const curveContainerId = `curve-effect-${this.id}`;
    const curveContainer = document.getElementById(curveContainerId);
    const element = this.getElement();
    const ul = document.getElementById(`${TEXT_CONTAINER}${this.id}`);
    if (!curveContainer || !element || !ul) return;
    const elementStyles = window.getComputedStyle(element);
    const { x, y } = element.getBoundingClientRect();
    let text = document.getElementById(`text-layer-${this.id}`) as HTMLElement;
    if (!text) {
      text = document.createElement('div');
      text.id = `text-layer-${this.id}`;
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
    document.addEventListener(
      'mousedown',
      this.onClickOutsideCurveContainerElement.bind(this),
    );
    text.addEventListener('input', this.onInput.bind(this));
  }
}
