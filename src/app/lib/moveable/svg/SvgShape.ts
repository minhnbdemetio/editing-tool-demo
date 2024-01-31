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
  protected fill: string = '#000';
  protected stroke: string = '#000';
  protected strokeWidth: number = 5;

  constructor(options: SvgShapeOptions) {
    this.width = options.width || 0;
    this.height = options.height || 0;
  }

  abstract getPath(fill?: string): string;

  public getWidth() {
    return this.width;
  }
  public setWidth(width: number) {
    this.width = width;
  }
  public getHeight() {
    return this.height;
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

  public getPadding() {
    return this.strokeWidth / 2;
  }
  public getRelativeWidth() {
    return this.getWidth() - this.strokeWidth / 2;
  }
  public getRelativeHeight() {
    return this.getHeight() - this.strokeWidth / 2;
  }

  public getCenterPoint() {
    return this.width / 2;
  }
  public getMiddlePoint() {
    return this.height / 2;
  }
}