import Moveable from 'moveable';
import { MoveableObject } from './MoveableObject';
import { SvgLine, SvgLineAdornment } from '../utilities/svg-line';
import { LinePoint } from '../utilities/line-point';

export class MoveableLineObject extends MoveableObject {
  line?: SvgLine;
  dragStartPoint: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.line = new SvgLine();
    this.line?.setStartAdornment(SvgLineAdornment.Arrow);
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
    moveable.on('dragStart', e => {
      var matrix = new WebKitCSSMatrix(e.target.style.transform);
      this.dragStartPoint = {
        x: matrix.m41,
        y: matrix.m42,
      };
    });
    moveable.on('drag', e => {
      e.target.style.transform = e.transform;
    });
    moveable.on('dragEnd', e => {
      var matrix = new WebKitCSSMatrix(e.target.style.transform);
      const xChanged = matrix.m41 - this.dragStartPoint.x;
      const yChanged = matrix.m42 - this.dragStartPoint.y;

      this.line?.moveAllPoints({ x: xChanged, y: yChanged });
    });
    moveable.on('rotate', e => (e.target.style.transform = e.transform));
    moveable.on('resize', e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    });
    moveable.on('scale', e => (e.target.style.transform = e.drag.transform));
  }

  set({
    x1,
    y1,
    x2,
    y2,
  }: {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  }) {
    // if (typeof x1 !== 'undefined') this.x1 = x1;
    // if (typeof y1 !== 'undefined') this.y1 = y1;
    // if (typeof x2 !== 'undefined') this.x2 = x2;
    // if (typeof y2 !== 'undefined') this.y2 = y2;
  }

  toElbowedLine() {}
}
