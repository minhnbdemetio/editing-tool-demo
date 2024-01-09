import Moveable from 'moveable';
import { MAX_FIND_ELEMENT_ATTEMPTS, MoveableObject } from './MoveableObject';
import { GradientStop } from '../utilities/color.type';

export type MoveableTextVariant = 'normal' | 'heading' | 'subheading' | 'body';

export class MoveableTextObject extends MoveableObject {
  variant?: MoveableTextVariant;
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'text';
    this.transformOrigin = 'bottom';
    this.variant = 'normal';
  }
  createMoveable(container: HTMLElement): void {
    const element = this.getElement();
    if (!element) return;
    const moveable = new Moveable(container, {
      target: element,
      draggable: true,
      scalable: true,
      keepRatio: true,
      rotatable: true,
      resizable: true,
      checkInput: true,
      edgeDraggable: true,
      useResizeObserver: true,
      transformOrigin: this.transformOrigin,
    });
    moveable.on('drag', e => (e.target.style.transform = e.transform));
    moveable.on('rotate', e => (e.target.style.transform = e.transform));
    moveable.on('resize', e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    moveable.on('scale', e => (e.target.style.transform = e.drag.transform));
    this.moveable = moveable;
    element.style.transformOrigin = this.transformOrigin ?? 'bottom';
  }
  clone(): MoveableTextObject {
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
    textElement.setAttribute('x', '0');
    textElement.setAttribute('y', '50%');
    textElement.setAttribute('dominant-baseline', 'middle');
    textElement.setAttribute('text-anchor', 'middle');
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
}
