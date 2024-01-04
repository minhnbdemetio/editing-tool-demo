import { Canvas, Point } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { getAngle, getEndPosition } from './line';

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
      const x1 = this.selectedLine.get('x1' as any);
      const y1 = this.selectedLine.get('y1' as any);
      let x2 = this.selectedLine.get('x2' as any);
      let y2 = this.selectedLine.get('y2' as any);

      if (this.selectedLine.data?.end) {
        const end = this.selectedLine.data.end as fabric.Triangle;

        x2 = end.oCoords?.mt.x;
        y2 = end.oCoords?.mt.y;
      }

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

      const centerLine = this.getVerticalCenterLine();

      this.selectedScaler.left = pointer.x - 5 + centerLine;
      this.selectedScaler.top = pointer.y - 5 + centerLine;
      this.selectedScaler.setCoords(true);

      const position = this.selectedScaler.data.position as 'left' | 'right';

      if (position === 'right') {
        let x2 = pointer.x;
        let y2 = pointer.y;

        this.moveAdornments();

        this.selectedLine.set({ x2, y2 } as any);
        this.selectedLine.setCoords(true);
      }
      if (position === 'left') {
        const x1 = pointer.x;
        const y1 = pointer.y;
        this.selectedLine.set({ x1, y1 } as any);
        this.selectedLine.setCoords(false);
      }

      this.canvas.renderAll();
    }
  }

  moveAdornments() {
    if (this.selectedLine) {
      const end = this.selectedLine.data?.end as fabric.Triangle | undefined;
      if (end && this.selectedLine) {
        const endPosition = getEndPosition(this.selectedLine as fabric.Line);
        end.left = endPosition.left;
        end.top = endPosition.top;
        end.angle = getAngle(this.selectedLine as fabric.Line);
        end.setCoords();
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

      this.moveAdornments();

      this.selectedLine.set({ x2, y2, x1, y1 } as any);
      this.selectedLine.setCoords(true);
      this.canvas.renderAll();
    }
  }
}
