import { v4 as uuidv4 } from 'uuid';
import { findIdFromString } from '../utilities/dom';
import { DATA_LOCKED, MOVEABLE_TARGET_CLASS } from '../constants/moveable';
import { EDITOR_CONTAINER } from '../organisms/Editor';

export const MAX_FIND_ELEMENT_ATTEMPTS = 100;
export type ObjectType = 'rectangle' | 'text' | 'line' | 'photo';
export abstract class MoveableObject {
  id: string;
  type?: ObjectType;
  htmlString?: string;
  pageId: string | null;
  isLocked: boolean;
  constructor(id?: string, htmlString?: string) {
    this.id = id || uuidv4();
    this.htmlString = htmlString;
    this.pageId = null;
    this.isLocked = false;
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
  setPageId(pageId: string | null) {
    this.pageId = pageId;
  }
  setIsLocked(isLocked: boolean) {
    this.isLocked = isLocked;
  }
  copy() {}
  abstract clone(options?: { htmlString: string; id: string }): MoveableObject;
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
  setupMoveable() {
    const element = this.getElement();
    if (!element?.classList.contains(MOVEABLE_TARGET_CLASS)) {
      element?.classList.add(MOVEABLE_TARGET_CLASS);
    }
  }
  getCssProperty<T extends keyof CSSStyleDeclaration>(property: T) {
    const element = this.getElement();
    if (!element) return null;
    const cssProperties = window.getComputedStyle(element);
    return cssProperties[property];
  }
  getContainer() {
    return document.getElementById(EDITOR_CONTAINER);
  }
  toggleLock() {
    const toggleValue = !this.isLocked;
    const element = this.getElement();
    element?.setAttribute(DATA_LOCKED, toggleValue + '');
    this.setIsLocked(toggleValue);
  }
  setOpacity(opacity: number) {
    const element = this.getElement();
    if (!element) return false;
    element.style.opacity = `${opacity / 100}`;
  }
}
