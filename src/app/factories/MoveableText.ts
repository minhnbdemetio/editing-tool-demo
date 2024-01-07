import Moveable from 'moveable';
import { MoveableObject, ObjectType } from './MoveableObject';

export class MoveableTextObject extends MoveableObject {
  constructor(
    id?: string,
    htmlString?: string,
 ) {
    super(id, htmlString);
    this.type = 'text';
    this.transformOrigin = 'bottom';
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
    const fontSizeString = this.getCssProperty('fontSize')
    const matches = fontSizeString?.match(/^(\d+(\.\d+)?)px/);

    if (matches && matches[1]) {
      return parseFloat(matches[1]);
    } 
    return undefined
  }
  setFontSize(fontSize: number | null) {
    const element = this.getElement()
    if(!element) return false
    element.style.fontSize = fontSize + 'px'
  }
  set
}
