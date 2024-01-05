import { MoveableObject } from './MoveableObject';

export class MoveableTextObject extends MoveableObject {
  constructor() {
    super();
    this.type = 'text';
  }
  createElement(text: string) {
    const container = document.createElement('div');
    const span = document.createElement('span');
    span.innerHTML = text;
    container.id = this.id;

    container.style.width = '80px';
    container.style.position = 'absolute';

    container.appendChild(span);

    return container;
  }
}
