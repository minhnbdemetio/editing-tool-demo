import { v4 as uuidv4 } from 'uuid';
import { findIdFromString } from '../../utilities/dom';
import { MOVEABLE_TARGET_CLASS } from '../../constants/moveable';
import { DATA_LOCKED, OBJECT_INNER_ELEMENTS } from './constant/object';
import { Importable } from './Importable';
import { ClipboardOperation } from './ClipboardOperation';
import { Exportable } from './Exportable';
import { Editable } from './editable/Editable';
import { FlipDirection, XYFlipped } from './editable/CanFlip';
import { isElementLocked } from '@/app/utilities/moveable';

export const MAX_FIND_ELEMENT_ATTEMPTS = 100;
export type ObjectType = 'rectangle' | 'text' | 'line' | 'photo' | 'shape';

export abstract class MoveableObject
  implements Exportable, Importable, ClipboardOperation, Editable
{
  id: string = uuidv4();
  type?: ObjectType;
  htmlString?: string;
  pageId: string | null;
  isLocked;
  x;
  y;
  width: number;
  height: number;
  opacity;
  flipXY;
  color: string | undefined;

  constructor(options?: Partial<MoveableObject>) {
    this.id = options?.id || uuidv4();
    this.htmlString = options?.htmlString;
    this.width = options?.width || 100;
    this.height = options?.height || 100;
    this.pageId = null;
    this.isLocked = false;
    this.x = 0;
    this.y = 0;
    this.opacity = 100;
    this.flipXY = { x: false, y: false };
  }

  setId(id: string) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  setHtmlString(htmlString?: string) {
    this.htmlString = htmlString;
  }
  getHtmlString() {
    return this.htmlString;
  }
  setType(type?: ObjectType) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
  setPageId(pageId: string | null) {
    this.pageId = pageId;
  }
  getPageId() {
    return this.pageId;
  }
  setIsLocked(isLocked: boolean) {
    this.isLocked = isLocked;
  }
  getIsLocked() {
    return this.isLocked;
  }
  getOpacity() {
    return this.opacity;
  }
  setOpacity(opacity: number) {
    const element = this.getElement();
    if (!element) return false;
    element.style.opacity = `${opacity / 100}`;
    this.opacity = opacity;
  }
  setHeight(height: number) {
    this.height = height;
  }
  getHeight() {
    return this.height;
  }
  setWidth(width: number) {
    this.width = width;
  }
  getWidth() {
    return this.width;
  }
  setX(x: number) {
    this.x = x;
  }
  getX() {
    return this.x;
  }
  setY(y: number) {
    this.y = y;
  }
  getY() {
    return this.y;
  }
  setColor(color: string | undefined) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }
  setFlipXY(flipXY: XYFlipped) {
    this.flipXY = flipXY;
  }
  getFlipXY() {
    return this.flipXY;
  }

  createElementFromHtml() {
    if (!this.htmlString) return null;
    const elementIdFromString = findIdFromString(this.htmlString);
    if (elementIdFromString) {
      this.id = elementIdFromString;
    }

    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(this.htmlString, 'text/html');

    return parsedDocument.body.firstChild;
  }
  toHtmlString() {
    const element = this.getElement();
    if (element) {
      this.setHtmlString(element.outerHTML);
      return element.outerHTML;
    }
    this.setHtmlString();
    return '';
  }

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

  async setupMoveable() {
    const element = this.getElement();
    if (!element?.classList.contains(MOVEABLE_TARGET_CLASS)) {
      element?.classList.add(MOVEABLE_TARGET_CLASS);
    }
  }
  getElementCss<T extends keyof CSSStyleDeclaration>(property: T) {
    const element = this.getElement();
    if (!element) return null;
    const cssProperties = window.getComputedStyle(element);
    return cssProperties[property];
  }
  toggleLock() {
    const toggleValue = !this.isLocked;
    const element = this.getElement();
    element?.setAttribute(DATA_LOCKED, toggleValue + '');
    this.setIsLocked(toggleValue);
  }

  public getFlipScaleRatio(): { x: number; y: number } {
    return {
      x: this.flipXY.x ? -1 : 1,
      y: this.flipXY.y ? -1 : 1,
    };
  }

  public getFlipTransform(): string {
    const { x, y } = this.getFlipScaleRatio();

    return `scale(${x},${y})`;
  }

  getFlipElement() {
    return document.getElementById(
      `${OBJECT_INNER_ELEMENTS.FLIPPER}-${this.id}`,
    );
  }

  flip(direction: FlipDirection) {
    const flipElement = this.getFlipElement();

    if (direction === FlipDirection.Horizontal) {
      this.flipXY.x = !this.flipXY.x;
    }
    if (direction === FlipDirection.Vertical) {
      this.flipXY.y = !this.flipXY.y;
    }

    if (flipElement) {
      flipElement.style.transform = this.getFlipTransform();
    }
  }

  toJSON() {
    const attributes: Record<string, any> = {};

    for (const key in this) {
      if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
        attributes[key] = this[key];
      }
    }

    const superClass = Object.getPrototypeOf(this);
    if (
      superClass &&
      superClass.getAttributes &&
      typeof superClass.getAttributes === 'function'
    ) {
      const superAttributes = superClass.getAttributes.call(this);
      Object.assign(attributes, superAttributes);
    }

    return attributes;
  }
  createElementFromJSON(jsonString: string) {}
  loadFromJSON(jsonString: string) {
    const attributes = JSON.parse(jsonString) as Record<string, any>;
    for (const key in this) {
      if (attributes.hasOwnProperty(key)) {
        this[key] = attributes[key];
      }
    }
  }

  copy() {
    navigator.clipboard.writeText(this.id);
  }
  abstract clone(options?: Partial<MoveableObject>): MoveableObject;
  delete() {}
  render() {
    this.setIsLocked(isElementLocked(this.getElement()));
  }
}
