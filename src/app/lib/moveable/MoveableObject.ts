import { v4 as uuidv4 } from 'uuid';
import { findIdFromString } from '../../utilities/dom';
import { MOVEABLE_TARGET_CLASS } from '../../constants/moveable';
import { DATA_LOCKED, OBJECT_INNER_ELEMENTS } from './constant/object';
import { Importable } from './Importable';
import { ClipboardOperation } from './ClipboardOperation';
import { Exportable } from './Exportable';
import { Effect } from './effects/Effect';
import { GradientStop } from '@/app/utilities/color.type';
import { Editable } from './editable/Editable';
import { FlipDirection } from './editable/CanFlip';

export const MAX_FIND_ELEMENT_ATTEMPTS = 100;
export type ObjectType = 'rectangle' | 'text' | 'line' | 'photo' | 'shape';

export abstract class MoveableObject
  implements Exportable, Importable, ClipboardOperation, Editable
{
  id: string = uuidv4();
  type?: ObjectType;
  htmlString?: string;
  pageId: string | null = null;
  isLocked = false;
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  opacity = 100;
  flipDirection = { x: false, y: false };
  effect: Effect | undefined;
  color: string | undefined;
  gradient: GradientStop[] | undefined;

  constructor(options?: {
    id?: string;
    htmlString?: string;
    width?: number;
    height?: number;
  }) {
    this.id = options?.id || uuidv4();
    this.htmlString = options?.htmlString;

    this.width = options?.width || 100;
    this.height = options?.height || 100;
  }

  createElementFromJSON(jsonString: string) {
    return;
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
  setEffect(effect: Effect | undefined) {
    this.effect = effect;
  }
  getEffect() {
    return this.effect;
  }
  setColor(color: string | undefined) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }
  setGradient(gradientStops: GradientStop[] | undefined) {
    this.gradient = gradientStops;
  }
  getGradient() {
    return this.gradient;
  }
  copy() {}
  abstract clone(options?: { htmlString: string; id: string }): MoveableObject;
  cloneData() {
    const outerHtml = this.toHtmlString();
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
      x: this.flipDirection.x ? -1 : 1,
      y: this.flipDirection.y ? -1 : 1,
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
    if (flipElement) {
      flipElement.style.transform = this.getFlipTransform();
    }
    if (direction === FlipDirection.Horizontal) {
      this.flipDirection.x = !this.flipDirection.x;
    }
    if (direction === FlipDirection.Vertical) {
      this.flipDirection.y = !this.flipDirection.y;
    }
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      htmlString: this.htmlString,
      pageId: this.pageId,
      isLocked: this.isLocked,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      opacity: this.opacity,
      flipDirection: this.flipDirection,
    };
  }
  render() {}
}
