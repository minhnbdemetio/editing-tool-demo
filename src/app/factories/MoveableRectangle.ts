import { MoveableObject } from './MoveableObject';

export class MoveableRectangleObject extends MoveableObject {
  constructor() {
    super();
    this.type = 'rectangle';
  }
  createElement() {
    const rectangle = document.createElement('div');
    rectangle.id = this.id;
    rectangle.style.width = '60px';
    rectangle.style.height = '60px';
    rectangle.style.backgroundColor = 'blue';
    rectangle.style.position = 'absolute';

    return rectangle;
  }
}
