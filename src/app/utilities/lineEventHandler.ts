import { Canvas, Point } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import {
  getAngle,
  getAngleByPoint,
  getEndPosition,
  getStartPosition,
} from './line';

export class LineEventHandler {
  canvas: Canvas;
  selectedLine: fabric.Object | null;
  selectedScaler: fabric.Object | null;
  mouseDownPointer: fabric.Point | null;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.selectedLine = null;
    this.selectedScaler = null;
    this.mouseDownPointer = null;
    this.setup();
  }

  setup() {
    this.canvas.on('mouse:down', event => {
      if (event.target?.name === 'line') {
        if (event.pointer) {
          this.mouseDownPointer = event.pointer;
        }

        this.selectedLine = event.target;
        this.canvas.selection = false;
        this.clearScaler();
      } else if (event.target?.name === 'line-scaler') {
        if (event.pointer) {
          this.mouseDownPointer = event.pointer;
        }

        this.selectedScaler = event.target;
      } else {
        if (this.selectedLine) this.selectedLine = null;
        if (this.selectedScaler) this.selectedScaler = null;
        this.clearScaler();
      }
    });

    this.canvas.on('mouse:move', event => {
      if (this.selectedScaler && this.selectedLine) {
        this.handleScaling(event.pointer as Point);
      }

      if (!this.selectedScaler && this.selectedLine) {
        this.handleLineMoving(event.pointer as Point);
      }
    });

    this.canvas.on('mouse:up', event => {
      if (this.selectedScaler) this.selectedScaler = null;
      this.mouseDownPointer = null;
      if (this.selectedLine) {
        this.clearScaler();
        this.createScalers();
      }
    });
  }

  clearScaler() {
    const objects = this.canvas.getObjects('circle');
    const scalers = objects.filter(obj => obj.name === 'line-scaler');

    scalers.forEach(scaler => {
      this.canvas.remove(scaler);
    });
    this.canvas.renderAll();
  }

  makeScaler(left: number, top: number, position: 'left' | 'right') {
    const c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 1,
      radius: 5,
      fill: '#fff',
      stroke: '#d8d8d8',
      data: {
        line: this.selectedLine,
        position,
      },
      name: 'line-scaler',
      selectable: false,
      hasBorders: false,
      hasControls: true,
      originX: 'center',
      originY: 'center',
    });

    return c;
  }

  createScalers() {
    if (this.selectedLine) {
      const x1 = this.selectedLine.oCoords?.ml.x || 0;
      const y1 = this.selectedLine.oCoords?.ml.y || 0;
      const x2 = this.selectedLine.oCoords?.mr.x || 0;
      const y2 = this.selectedLine.oCoords?.mr.y || 0;

      console.debug(x1, y1);

      this.canvas.add(this.makeScaler(x1, y1, 'left'));
      this.canvas.add(this.makeScaler(x2, y2, 'right'));
    }
  }

  getVerticalCenterLine() {
    const strokeWidth = this.selectedLine?.strokeWidth || 0;
    return strokeWidth / 2;
  }

  handleScaling(pointer: Point) {
    if (this.selectedScaler && this.selectedLine) {
      this.clearScaler();

      const line = this.selectedLine as fabric.Group;
      const lineChild = line.getObjects().shift();
      line.remove(lineChild as any);

      const centerLine = this.getVerticalCenterLine();

      this.selectedScaler.left = pointer.x - 5 + centerLine;
      this.selectedScaler.top = pointer.y - 5 + centerLine;
      this.selectedScaler.setCoords(true);

      const position = this.selectedScaler.data.position as 'left' | 'right';

      if (position === 'right') {
        const x1 = (this.selectedLine as fabric.Line).data.x1;
        const y1 = (this.selectedLine as fabric.Line).data.y1;
        let x2 = pointer.x;
        let y2 = pointer.y;

        const angle = getAngleByPoint(x1, y1, x2, y2, 'end');

        const vertical = x2 - x1;
        const horizontal = y2 - y1;

        let lineWidth = Math.sqrt(
          Math.pow(vertical, 2) + Math.pow(horizontal, 2),
        );

        this.selectedLine.set({ x2: x1 + lineWidth } as any);
        this.selectedLine.centeredRotation = false;
        this.selectedLine.rotate(angle - 90);
        this.selectedLine.data.x2 = x2;
        this.selectedLine.data.y2 = y2;

        this.selectedLine.setCoords(false);
      }
      if (position === 'left') {
        const x1 = pointer.x;
        const y1 = pointer.y;
        const x2 = (this.selectedLine as fabric.Line).data.x2;
        const y2 = (this.selectedLine as fabric.Line).data.y2;
        const angle = getAngleByPoint(x1, y1, x2, y2, 'end');

        const vertical = x2 - x1;
        const horizontal = y2 - y1;

        const lineWidth = Math.sqrt(
          Math.pow(vertical, 2) + Math.pow(horizontal, 2),
        );

        this.selectedLine.set({ x1, y1, y2: y1, x2: x1 + lineWidth } as any);
        this.selectedLine.centeredRotation = false;
        this.selectedLine.rotate(angle - 90);
        this.selectedLine.data.x1 = x1;
        this.selectedLine.data.y1 = y1;

        this.selectedLine.setCoords(false);
      }

      this.moveAdornments();

      this.canvas.renderAll();
    }
  }

  moveAdornments() {
    if (this.selectedLine) {
      const end = this.selectedLine.data?.end as fabric.Triangle | undefined;
      const start = this.selectedLine.data?.start as
        | fabric.Triangle
        | undefined;
      if (end && this.selectedLine) {
        const endPosition = getEndPosition(this.selectedLine as fabric.Line);
        end.left = endPosition.left;
        end.top = endPosition.top;
        end.angle = getAngle(this.selectedLine as fabric.Line, 'end');

        if (
          end.name === 'circle' ||
          end.name === 'square' ||
          end.name === 'rhombus' ||
          end.name === 'line'
        ) {
          end.angle -= 90;
        }

        end.setCoords();
      }

      if (start && this.selectedLine) {
        const startPosition = getStartPosition(
          this.selectedLine as fabric.Line,
        );
        start.left = startPosition.left;
        start.top = startPosition.top;
        start.angle = getAngle(this.selectedLine as fabric.Line, 'start');
        if (
          start.name === 'circle' ||
          start.name === 'square' ||
          start.name === 'rhombus' ||
          start.name === 'line'
        ) {
          start.angle += 90;
        }

        start.setCoords();
      }
    }
  }

  handleLineMoving(pointer: Point) {
    if (this.mouseDownPointer && this.selectedLine) {
      this.clearScaler();

      const xChanged = pointer.x - this.mouseDownPointer.x;
      const yChanged = pointer.y - this.mouseDownPointer.y;

      this.mouseDownPointer = pointer;

      const x1 = this.selectedLine.get('x1' as any) + xChanged;
      const y1 = this.selectedLine.get('y1' as any) + yChanged;
      const x2 = this.selectedLine.get('x2' as any) + xChanged;
      const y2 = this.selectedLine.get('y2' as any) + yChanged;

      this.selectedLine.set({ x2, y2, x1, y1 } as any);

      this.selectedLine.data.x1 += +xChanged;
      this.selectedLine.data.x2 += +xChanged;
      this.selectedLine.data.y2 += yChanged;
      this.selectedLine.data.y1 += yChanged;

      this.selectedLine.setCoords(true);

      this.moveAdornments();

      this.canvas.renderAll();
    }
  }
}
