import { v4 as uuidv4 } from 'uuid';
import { findIdFromString } from '../utilities/dom';
import Moveable from 'moveable';

const MAX_FIND_ELEMENT_ATTEMPTS = 100;
export type ObjectType = 'rectangle' | 'text' | 'line';
export abstract class MoveableObject {
  id: string;
  type?: ObjectType;
  htmlString?: string;
  moveable?: Moveable;
  transformOrigin?: CSSStyleDeclaration['transformOrigin'];
  constructor(id?: string, htmlString?: string) {
    this.id = id || uuidv4();
    this.htmlString = htmlString;
  }

  setId(id: string) {
    this.id = id;
  }
  setHtmlString(htmlString: string) {
    this.htmlString = htmlString;
  }
  setType(type: ObjectType) {
    this.type = type;
  }
  copy() {}
  abstract clone(): MoveableObject;
  cloneData() {
    const outerHtml = this.exportHtmlString();
    const cloneObjectId = uuidv4();
    const clonedObjectHtml = outerHtml.replaceAll(this.id, cloneObjectId);
    return { cloneObjectId, clonedObjectHtml };
  }
  delete() {}
  getElement() {
    let attempt = 0;
    let element = null;
    while (attempt < MAX_FIND_ELEMENT_ATTEMPTS) {
      const elementById = document.getElementById(this.id);
      if (elementById) {
        element = elementById;
        break;
      } else {
        attempt++;
      }
    }

    return element;
  }
  createElementFromHtmlString() {
    if (!this.htmlString) return null;
    const elementIdFromString = findIdFromString(this.htmlString);
    if (elementIdFromString) {
      this.id = elementIdFromString;
    }

    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(this.htmlString, 'text/html');

    return parsedDocument.body.firstChild;
  }
  exportHtmlString() {
    const element = this.getElement();
    if (element) {
      this.htmlString = element.outerHTML;
      return element.outerHTML;
    }
    return '';
  }
  createMoveable(container: HTMLElement) {
    const element = this.getElement();
    const moveable = new Moveable(container, {
      target: element,
      draggable: true,
      scalable: true,
      keepRatio: true,
      rotatable: true,
      resizable: true,
    });
    moveable.on('drag', e => {
      e.target.style.transform = e.transform;
    });
    moveable.on('rotate', e => (e.target.style.transform = e.transform));
    moveable.on('resize', e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    moveable.on('scale', e => (e.target.style.transform = e.drag.transform));
    this.moveable = moveable;
  }
  destroy() {
    if (!this.moveable) return false;
    this.moveable.destroy();
    return true;
  }
  getCssProperty<T extends keyof CSSStyleDeclaration>(property: T) {
    const element = this.getElement();
    if (!element) return null;
    const cssProperties = window.getComputedStyle(element);
    return cssProperties[property];
  }
  changeTransformOrigin(
    transformOrigin?: CSSStyleDeclaration['transformOrigin'],
  ) {
    this.transformOrigin = transformOrigin;
    const element = this.getElement();
    if (!element || !this.moveable) return;
    element.style.transformOrigin = transformOrigin ?? 'bottom';
    this.moveable.transformOrigin = transformOrigin ?? 'bottom';
    this.moveable.updateRect();
  }
}
