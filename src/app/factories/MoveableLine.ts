import Moveable from 'moveable';
import { MoveableObject } from './MoveableObject';
import { SvgLine } from '../utilities/svg-line';

export class MoveableLineObject extends MoveableObject {
  line?: SvgLine;
  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.line = new SvgLine();
    this.type = 'line';
  }
  createMoveable(container: HTMLElement): void {
    const element = this.getElement();
    const moveable = new Moveable(container, {
      target: element,
      draggable: true,
      scalable: false,
      keepRatio: true,
      rotatable: false,
      resizable: false,
      className: 'line-element',
    });
    const self = this;
    moveable.on('drag', function (e) {
      e.target.style.transform = e.transform;
    });
    moveable.on('rotate', e => (e.target.style.transform = e.transform));
    moveable.on('resize', e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    moveable.on('scale', e => (e.target.style.transform = e.drag.transform));
  }
}
