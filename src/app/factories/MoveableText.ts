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
      edgeDraggable: true,
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

export class MoveableHeadingText extends MoveableTextObject {
  constructor(id?: string, content?: string, options?: any) {
    const defaultOptions = {
      width: options?.width || 200,
      height: options?.height || 50,
      className: options?.className || '',
    };
    const htmlString = `<div class="w-[${defaultOptions.width}px] w-[${defaultOptions.height}px] ${defaultOptions.className}" 
        style="writing-mode: horizontal-tb;" contenteditable="true" id="${id}">
          <ul><li>${content}</li>
          </ul>
      </div>`;
    super(id, htmlString);
    this.type = 'text';
  }
}
