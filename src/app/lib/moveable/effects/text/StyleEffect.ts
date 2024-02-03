import { hexToRgba } from '@/app/utilities/color';
import { TextEffect, TextEffectOptions } from './TextEffect';
import {
  BACKGROUND_EFFECT_CONTAINER,
  CURVE_BACKGROUND_EFFECT_CONTAINER,
  GLITCH_EFFECT_CONTAINER,
  GRADIENT_BACKGROUND_CSS_VARIABLE,
  GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE,
  OUTLINE_EFFECT_CONTAINER,
  TEXT_BACKGROUND_DEFAULT_VALUE,
  TEXT_ECHO_DEFAULT_VALUE,
  TEXT_ECHO_EFFECT_CSS_VARIABLES,
  TEXT_GLITCH_DEFAULT_VALUE,
  TEXT_GLITCH_EFFECT_CSS_VARIABLES,
  TEXT_HOLLOW_DEFAULT_VALUE,
  TEXT_INNER_ELEMENTS,
  TEXT_LIFT_DEFAULT_VALUE,
  TEXT_LIFT_EFFECT_CSS_VARIABLES,
  TEXT_NEON_DEFAULT_VALUE,
  TEXT_NEON_EFFECT_CSS_VARIABLES,
  TEXT_OUTLINE_DEFAULT_VALUE,
  TEXT_PREVIOUS_COLOR_CSS_VARIABLE,
  TEXT_SHADOW_DEFAULT_VALUE,
  TEXT_SHADOW_EFFECT_CSS_VARIABLES,
  TEXT_SPLICE_DEFAULT_VALUE,
  TEXT_SPLICE_EFFECT_CSS_VARIABLES,
} from '../../constant/text';

export enum TextStyleEffect {
  NONE = 'none',
  SHADOW = 'shadow',
  LIFT = 'lift',
  HOLLOW = 'hollow',
  SPLICE = 'splice',
  OUTLINE = 'outline',
  ECHO = 'echo',
  GLITCH = 'glitch',
  NEON = 'neon',
  BACKGROUND = 'background',
}

export class StyleEffect extends TextEffect {
  constructor(option?: TextEffectOptions) {
    super(option);
  }
}

export class TextShadowEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_SHADOW_DEFAULT_VALUE) {
    super({
      color: option.color,
      offset: option.offset,
      direction: option.direction,
      blur: option.blur,
      transparency: option.transparency,
      ...option,
    });
    this.variant = TextStyleEffect.SHADOW;
  }
  apply(element: HTMLElement): void {
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_VALUE = parseFloat(matches?.[1] ?? '0') * 0.166;
    const {
      direction = TEXT_SHADOW_DEFAULT_VALUE.direction,
      blur = TEXT_SHADOW_DEFAULT_VALUE.blur,
      color = TEXT_SHADOW_DEFAULT_VALUE.color,
      transparency = TEXT_SHADOW_DEFAULT_VALUE.transparency,
      offset = TEXT_SHADOW_DEFAULT_VALUE.offset,
    } = this.options;

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
    element.style.setProperty(TEXT_SHADOW_EFFECT_CSS_VARIABLES, shadow);

    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-shadow-effect\)/g, '')
      .trim();

    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_SHADOW_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_SHADOW_EFFECT_CSS_VARIABLES})`;
  }

  reset(el: HTMLElement): void {
    el.style.removeProperty(TEXT_SHADOW_EFFECT_CSS_VARIABLES);
    el.style.textShadow = el.style.textShadow.replace(
      /(,.+|.+|)var\(--text-shadow-effect\)/g,
      '',
    );
  }
}

export class TextLiftEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_LIFT_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.LIFT;
  }
  apply(element: HTMLElement): void {
    const { offset = TEXT_LIFT_DEFAULT_VALUE.offset } = this.options;
    const transparency = ((60 - 5) / 100) * offset + 5;
    const blur = ((34.5 - 4.6) / 100) * offset + 4.6;
    const shadow = `${hexToRgba(
      '#000',
      transparency / 100,
    )} 0px 4.6px ${blur}px `;
    element.style.setProperty(TEXT_LIFT_EFFECT_CSS_VARIABLES, shadow);
    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-lift-effect\)/g, '')
      .trim();
    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_LIFT_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_LIFT_EFFECT_CSS_VARIABLES})`;
  }

  reset(el: HTMLElement): void {
    el.style.removeProperty(TEXT_LIFT_EFFECT_CSS_VARIABLES);
    el.style.textShadow = el.style.textShadow.replace(
      /(,.+|.+|)var\(--text-lift-effect\)/g,
      '',
    );
  }
}

export class TextHollowEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_HOLLOW_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.HOLLOW;
  }

  apply(element: HTMLElement): void {
    const radius = 0.0916;
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const {
      thickness = TEXT_HOLLOW_DEFAULT_VALUE.thickness,
      color = styles.color,
    } = this.options;
    const MAX_THICKNESS = parseFloat(matches?.[1] ?? '0') * radius;
    element.style.caretColor = color;
    element.style.webkitTextStrokeWidth = `${
      (thickness - 1) * (MAX_THICKNESS / 99)
    }px`;
    element.style.webkitTextStrokeColor = color;
    element.style.webkitTextFillColor = 'transparent';
  }

  reset(element: HTMLElement): void {
    element.style.caretColor = 'auto'; // initial value is 'auto'
    element.style.webkitTextStrokeWidth = '0'; // initial value is '0'
    element.style.webkitTextStrokeColor = 'transparent'; // initial value is 'transparent'
    element.style.webkitTextFillColor = ''; // initial value is 'black'
  }
}

export class TextSpliceEffect extends TextHollowEffect {
  constructor(option: TextEffectOptions = TEXT_SPLICE_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.SPLICE;
  }

  apply(element: HTMLElement): void {
    super.apply(element);
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.166;

    const {
      offset = TEXT_SPLICE_DEFAULT_VALUE.offset,
      direction = TEXT_SPLICE_DEFAULT_VALUE.direction,
      color = TEXT_SPLICE_DEFAULT_VALUE.color,
    } = this.options;

    const offsetVal = (offset / 100) * MAX_SHADOW;
    const hShadow = (
      -offsetVal * Math.sin((direction * Math.PI) / 180)
    ).toFixed(4);
    const vShadow = (offsetVal * Math.cos((direction * Math.PI) / 180)).toFixed(
      4,
    );
    const shadow = `${color} ${hShadow}px ${vShadow}px 0px`;

    element.style.setProperty(TEXT_SPLICE_EFFECT_CSS_VARIABLES, shadow);
    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-splice-effect\)/g, '')
      .trim();
    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_SPLICE_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_SPLICE_EFFECT_CSS_VARIABLES})`;

    element.style.webkitTextStrokeColor = styles.color;
    element.style.caretColor = styles.color;
  }

  reset(element: HTMLElement): void {
    element.style.removeProperty(TEXT_SPLICE_EFFECT_CSS_VARIABLES);
    element.style.textShadow = element.style.textShadow.replace(
      /(,.+|.+|)var\(--text-splice-effect\)/g,
      '',
    );
    super.reset(element);
  }
}

export class TextOutlineEffect extends TextHollowEffect {
  constructor(option: TextEffectOptions = TEXT_OUTLINE_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.OUTLINE;
  }

  apply(element: HTMLElement): void {
    const clonedElementId = `${OUTLINE_EFFECT_CONTAINER}-${this.id}`;
    let clonedElement = document.getElementById(clonedElementId);

    if (!clonedElement) {
      clonedElement = element.cloneNode(true) as HTMLElement;
      element.style.position = 'relative';
      clonedElement.id = clonedElementId;
      clonedElement.style.transform = 'initial';
      clonedElement.style.webkitTextFillColor = 'unset';
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '0';
      clonedElement.style.left = '0';
      clonedElement.style.zIndex = '-1';

      element.appendChild(clonedElement);
    }

    const curveBackgroundContainer = clonedElement.querySelector(
      `#${CURVE_BACKGROUND_EFFECT_CONTAINER}-${this.id}`,
    );

    if (curveBackgroundContainer) {
      curveBackgroundContainer.remove();
    }

    super.apply(clonedElement);
  }

  reset(el: HTMLElement): void {
    super.reset(el);
    const clonedElementId = `${OUTLINE_EFFECT_CONTAINER}-${this.id}`;
    const clonedElement = document.getElementById(clonedElementId);
    if (clonedElement) {
      clonedElement.remove();
    }
  }
}

export class TextEchoEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_ECHO_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.ECHO;
  }

  apply(element: HTMLElement): void {
    const styles = window.getComputedStyle(element);
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.166;
    const {
      offset = TEXT_ECHO_DEFAULT_VALUE.offset,
      direction = TEXT_ECHO_DEFAULT_VALUE.direction,
      color = TEXT_ECHO_DEFAULT_VALUE.color,
    } = this.options;

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

    element.style.setProperty(TEXT_ECHO_EFFECT_CSS_VARIABLES, shadow);
    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-echo-effect\)/g, '')
      .trim();
    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_ECHO_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_ECHO_EFFECT_CSS_VARIABLES})`;
  }

  reset(element: HTMLElement): void {
    element.style.removeProperty(TEXT_ECHO_EFFECT_CSS_VARIABLES);
    element.style.textShadow = element.style.textShadow.replace(
      /(,.+|.+|)var\(--text-echo-effect\)/g,
      '',
    );
  }
}

export class TextGlitchEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_GLITCH_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.GLITCH;
  }

  apply(element: HTMLElement): void {
    const styles = window.getComputedStyle(element);
    const isBlueRedColor = this.options.color === 'blue-red';
    const firstColor = 'rgb(0, 255, 255)';
    const secondColor = isBlueRedColor ? 'rgb(255, 0, 255)' : 'rgb(255, 0, 0)';
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_SHADOW = parseFloat(matches?.[1] ?? '0') * 0.0833;
    let glitchContainer = document.getElementById(
      `${GLITCH_EFFECT_CONTAINER}-${this.id}`,
    );
    if (!glitchContainer) {
      const textContainer = this.getTextContainer();
      glitchContainer = textContainer?.cloneNode(true) as HTMLElement | null;
      if (glitchContainer && textContainer) {
        glitchContainer.id = `${GLITCH_EFFECT_CONTAINER}-${this.id}`;
        glitchContainer.style.background = `var(${GRADIENT_BACKGROUND_CSS_VARIABLE})`;
        glitchContainer.style.backgroundClip = 'text';
        glitchContainer.style.webkitTextFillColor = `var(${GRADIENT_WEBKIT_TEXT_FILL_CSS_VARIABLE})`;
        glitchContainer.style.position = 'absolute';
        glitchContainer.style.top = '0';
        glitchContainer.style.zIndex = '10';
        glitchContainer.style.textShadow = 'none';
        element.appendChild(glitchContainer);
      }
    }

    const {
      offset = TEXT_GLITCH_DEFAULT_VALUE.offset,
      direction = TEXT_GLITCH_DEFAULT_VALUE.direction,
    } = this.options;
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

    element.style.setProperty(TEXT_GLITCH_EFFECT_CSS_VARIABLES, shadow);
    const textShadow = element.style.textShadow
      .replace(/(,.+|.+|)var\(--text-glitch-effect\)/g, '')
      .trim();
    element.style.textShadow =
      textShadow === ''
        ? `var(${TEXT_GLITCH_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_GLITCH_EFFECT_CSS_VARIABLES})`;
  }

  reset(element: HTMLElement): void {
    const glitchContainer = document.getElementById(
      `${GLITCH_EFFECT_CONTAINER}-${this.id}`,
    );
    if (glitchContainer) {
      element.removeChild(glitchContainer);
    }
    element.style.removeProperty(TEXT_GLITCH_EFFECT_CSS_VARIABLES);
    element.style.textShadow = element.style.textShadow.replace(
      /(,.+|.+|)var\(--text-glitch-effect\)/g,
      '',
    );
  }
}

export class TextNeonEffect extends StyleEffect {
  constructor(option: TextEffectOptions = TEXT_NEON_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.NEON;
  }

  apply(element: HTMLElement): void {
    const styles = window.getComputedStyle(element);
    const color =
      element.style.getPropertyValue(TEXT_PREVIOUS_COLOR_CSS_VARIABLE) ||
      styles.color;
    const matches = styles.fontSize?.match(/^(\d+(\.\d+)?)px/);
    const MAX_THICKNESS = parseFloat(matches?.[1] ?? '0') * 0.0166;
    const { thickness = TEXT_NEON_DEFAULT_VALUE.thickness } = this.options;
    const baseVal = (0.061 * thickness + 1.6) * MAX_THICKNESS;
    const filter = `drop-shadow(0px 0px ${baseVal}px ${hexToRgba(
      color,
      0.95,
    )}) drop-shadow(0px 0px ${baseVal * 5}px ${hexToRgba(
      color,
      0.75,
    )}) drop-shadow(0px 0px ${baseVal * 5 * 3}px ${hexToRgba(color, 0.44)})`;

    element.style.setProperty(TEXT_NEON_EFFECT_CSS_VARIABLES, filter);
    const filterStyle = element.style.filter
      .replace(/(,.+|.+|)var\(--text-neon-effect\)/g, '')
      .trim();
    element.style.filter =
      filterStyle === ''
        ? `var(${TEXT_NEON_EFFECT_CSS_VARIABLES})`
        : `, var(${TEXT_NEON_EFFECT_CSS_VARIABLES})`;
    element.style.setProperty(TEXT_PREVIOUS_COLOR_CSS_VARIABLE, color);
    element.style.color = hexToRgba(color, (thickness * 0.55 + 34.45) / 100);
  }

  reset(element: HTMLElement): void {
    element.style.removeProperty(TEXT_NEON_EFFECT_CSS_VARIABLES);
    element.style.filter = element.style.filter.replace(
      /(,.+|.+|)var\(--text-neon-effect\)/g,
      '',
    );
    element.style.color =
      element.style.getPropertyValue(TEXT_PREVIOUS_COLOR_CSS_VARIABLE) ||
      'initial';
    element.style.removeProperty(TEXT_PREVIOUS_COLOR_CSS_VARIABLE);
  }
}

export class TextBackgroundEffect extends StyleEffect {
  isRegisterEventListener: boolean = false;
  boundOnInput: (this: HTMLElement, ev: Event) => void = () => {};
  constructor(option: TextEffectOptions = TEXT_BACKGROUND_DEFAULT_VALUE) {
    super(option);
    this.variant = TextStyleEffect.BACKGROUND;
  }

  apply(element: HTMLElement): void {
    const bgEffectId = `${BACKGROUND_EFFECT_CONTAINER}-${this.id}`;
    const {
      color = TEXT_BACKGROUND_DEFAULT_VALUE.color,
      spread = TEXT_BACKGROUND_DEFAULT_VALUE.spread,
      roundness = TEXT_BACKGROUND_DEFAULT_VALUE.roundness,
      transparency = TEXT_BACKGROUND_DEFAULT_VALUE.transparency,
    } = this.options;
    const textContainer = this.getTextContainer();
    const firstTextChild = textContainer?.firstElementChild;
    if (!textContainer || !firstTextChild) return;
    const textChildStyles = window.getComputedStyle(firstTextChild);
    const elHeight = parseFloat(
      textChildStyles.height.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
    );
    const textContainerHeight = parseFloat(
      window
        .getComputedStyle(textContainer)
        .height.match(/^(\d+(\.\d+)?)px/)?.[1] ?? '0',
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
    svg.style.width = `calc(100% + ${2 * spreadVal}px)`;
    svg.style.zIndex = '-1';
    svg.style.height = `${textContainerHeight}px`;
    element.appendChild(svg);
    let prevPathWidth = 0;
    const lengthItems = textContainer.childNodes.length;
    textContainer.childNodes.forEach((el, index) => {
      let elWidth = 0;
      if (!el.textContent) {
        elWidth = prevPathWidth;
      } else {
        elWidth =
          this.getTextContentWidth(el.textContent, element) + 2 * spreadVal;
      }

      const nextEl = textContainer.childNodes[index + 1];
      const nextPathWidth =
        nextEl && nextEl.textContent
          ? this.getTextContentWidth(nextEl.textContent, element) +
            2 * spreadVal
          : prevPathWidth || elWidth;
      const isRadiusTop = index === 0 || elWidth > prevPathWidth;
      const isRadiusBottom =
        index === lengthItems - 1 || elWidth > nextPathWidth;
      prevPathWidth = elWidth;
      const startX = 0;
      const startY = elHeight * index;
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      ) as SVGPathElement;
      path.setAttribute(
        'd',
        `M ${startX} ${startY} L ${
          isRadiusTop ? startX + elWidth - roundnessVal : startX + elWidth
        } ${startY} ${
          isRadiusTop
            ? `C ${startX + elWidth - roundnessVal} ${startY}, ${
                startX + elWidth
              } ${startY}, ${startX + elWidth} ${startY + roundnessVal}`
            : ''
        }L ${startX + elWidth} ${
          isRadiusBottom ? startY + elHeight - roundnessVal : startY + elHeight
        }
        ${
          isRadiusBottom
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
    if (!this.isRegisterEventListener) {
      this.boundOnInput = this.onInput.bind(this, element);
      element.addEventListener('input', this.boundOnInput);
      this.isRegisterEventListener = true;
    }
  }

  reset(el: HTMLElement): void {
    el.removeEventListener('input', this.boundOnInput);
    this.isRegisterEventListener = false;
    const backgroundElement = document.getElementById(
      `${BACKGROUND_EFFECT_CONTAINER}-${this.id}`,
    );
    if (backgroundElement) {
      el.removeChild(backgroundElement);
    }
  }

  getTextContentWidth(textContent: string, element: HTMLElement): number {
    if (!textContent) return 0;
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

  onInput(element: HTMLElement) {
    this.apply(element);
  }
}
