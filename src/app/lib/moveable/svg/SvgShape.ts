export declare type SvgShapeOptions = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

export abstract class SvgShape {
  protected width: number;
  protected height: number;
  protected fill: string | undefined;
  protected stroke: string | undefined;
  protected strokeWidth: number | undefined;

  constructor(options: SvgShapeOptions) {
    this.width = options.width || 0;
    this.height = options.height || 0;
  }

  abstract getPath(): string;

  public getWidth() {
    return this.width;
  }
  public setWidth(width: number) {
    this.width = width;
  }
  public getHeight() {
    return this.width;
  }
  public setHeight(height: number) {
    this.height = height;
  }
  public getFill() {
    return this.fill;
  }
  public setFill(fill: string) {
    this.fill = fill;
  }
  public getStroke() {
    return this.setStroke;
  }
  public setStroke(stroke: string) {
    this.stroke = stroke;
  }
  public getStrokeWidth() {
    return this.strokeWidth;
  }
  public setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }

  public getCenterPoint() {
    return this.width / 2;
  }
  public getMiddlePoint() {
    return this.height / 2;
  }
}
