import { MoveableObject } from './MoveableObject';
import { SvgLine, SvgLineAdornment } from '../utilities/svg-line';
import { LinePoint } from '../utilities/line-point';

export class MoveableLineObject extends MoveableObject {
  clone(options?: { htmlString: string; id: string }): MoveableLineObject {
    if (options) {
      return new MoveableLineObject(options.id, options.htmlString);
    }
    const clonedData = this.cloneData();
    return new MoveableLineObject(
      clonedData.cloneObjectId,
      clonedData.clonedObjectHtml,
    );
  }
  line: SvgLine;
  private dragging = false;
  dragStartPoint: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  constructor(id?: string, htmlString?: string) {
    super(id, htmlString);
    this.line = new SvgLine();
    this.line.setStartAdornment(SvgLineAdornment.OutlinedTriangle);
    this.line.setEndAdornment(SvgLineAdornment.Triangle);
    // this.line.toElbowed();
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
      anchorRef.style.transform = `translate(${x}px, ${y}px) rotate(${this.line.getRotateAngle()}deg)`;
    }
  }

  public updatePointerControllerUI(hide?: boolean) {
    let point: LinePoint | undefined | null = this.line.points;

    while (point) {
      const next = point.getNext();

      if (next) {
        const id = point.id + next.id;
        const element = document.getElementById(id);

        if (hide && element) {
          element.style.display = 'none';
          point = point.getNext();
          continue;
        }

        if (point.hasNextCurve() || point.hasPrevCurve()) {
          if (element) {
            element.style.transform = `translate(${(point.x + next.x) / 2}px, ${
              (point.y + next.y) / 2
            }px)`;
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
}
