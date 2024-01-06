import Moveable from 'moveable';
import { MoveableObject } from './MoveableObject';

export class MoveableTextObject extends MoveableObject {
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.type = 'text';
  }
  createMoveable(container: HTMLElement): void {
    const element = this.getElement();
    const moveable = new Moveable(container, {
      target: element,
      draggable: true,
      scalable: true,
      keepRatio: true,
      rotatable: true,
      resizable: true,
      checkInput: true,
    });
    moveable.on('drag', e => (e.target.style.transform = e.transform));
    moveable.on('rotate', e => (e.target.style.transform = e.transform));
    moveable.on('resize', e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    moveable.on('scale', e => (e.target.style.transform = e.drag.transform));
  }
  clone(): MoveableTextObject {
    const clonedData = this.cloneData();
    return new MoveableTextObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
}
