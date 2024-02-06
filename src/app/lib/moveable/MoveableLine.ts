import { MoveableObject } from './MoveableObject';
import { SvgLine, SvgLineOptions } from '../../utilities/line/Line';
import { Point } from '../../utilities/line/Point';
import { v4 } from 'uuid';
import { StraightLine } from '@/app/utilities/line/StraightLine';
import { ElbowedLine } from '@/app/utilities/line/ElbowedLine';

export class MoveableLineObject extends MoveableObject {
  line: SvgLine;
  private dragging = false;
  dragStartPoint: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  constructor(
    options?: Partial<MoveableLineObject> & { svgLineOptions?: SvgLineOptions },
  ) {
    super(options);
    this.line = new ElbowedLine(options?.svgLineOptions);
    this.type = 'line';
  }

  public setDragging(dragging: boolean) {
    this.dragging = dragging;
  }
  public isDragging(): boolean {
    return this.dragging;
  }

  public updateUI() {
    const anchorRef = this.getElement();

    if (anchorRef) {
      const { x, y } = this.line.getDisplayPosition();

      anchorRef.innerHTML = this.line.toSvg() || '';
      anchorRef.style.transform = `translate(${x - this.line.padding}px, ${
        y - this.line.padding
      }px) rotate(${this.line.getRotateAngle()}deg)`;
    }
  }

  public updatePointerControllerUI({
    hide,
    exceptId,
  }: { hide?: boolean; exceptId?: string } = {}) {
    let point: Point | undefined | null = this.line.points.getHead();

    while (point) {
      const next = point.getNext();

      if (next) {
        const id = point.id + ',' + next.id;

        if (id === exceptId) {
          point = point.getNext();
          continue;
        }

        const element = document.getElementById(id);

        if (hide && element) {
          element.style.display = 'none';
          point = point.getNext();
          continue;
        }

        if (point.hasNextCurve() || point.hasPrevCurve()) {
          if (element) {
            element.style.left = (point.x + next.x) / 2 + 'px';
            element.style.top = (point.y + next.y) / 2 + 'px';

            element.style.display = 'block';
          }
        } else {
          if (element) {
            element.style.display = 'none';
          }
        }
      }

      point = point.getNext();
    }
  }

  public updateHeadControl(hide?: boolean) {
    const start = this.line.points.getHead();
    const end = this.line.points.getEnd();

    if (start && end) {
      const startElement = document.getElementById(start.id);
      const endElement = document.getElementById(end.id);

      if (hide) {
        if (startElement) startElement.style.display = `none`;

        if (endElement) endElement.style.display = `none`;
        return;
      }

      if (startElement) {
        startElement.style.display = `block`;
        startElement.style.left = start.x + 'px';
        startElement.style.top = start.y + 'px';
      }

      if (endElement) {
        endElement.style.display = `block`;
        endElement.style.left = end.x + 'px';
        endElement.style.top = end.y + 'px';
      }
    }
  }

  clone(
    options?: Partial<MoveableLineObject> & { svgLineOptions?: SvgLineOptions },
  ): MoveableLineObject {
    return new MoveableLineObject(
      options ? options : { ...this.toJSON(), id: v4() },
    );
  }
}
