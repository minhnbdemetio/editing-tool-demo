import { Svg, SvgOptions } from '../../Svg';
import { AdornmentDirection, IAdornment } from './Adornment.interfaces';

interface AdornmentOptions extends SvgOptions {
  length?: number;
  outline?: boolean;
  x?: number;
  y?: number;
  direction?: AdornmentDirection;
}

export abstract class Adornment extends Svg implements IAdornment {
  length: number;
  outline: boolean;
  x: number;
  y: number;
  direction: AdornmentDirection;

  constructor(options: AdornmentOptions = {}) {
    super(options);

    this.length = options.length || 0;
    this.outline = options.outline || false;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.direction = options.direction || 'up';
  }

  toPath(): string {
    const adornments = this.getAdornments();

    const option = { fill: this.outline ? 'none' : this.getStrokeColor() };

    return this.addPath(adornments[this.direction], option);
  }

  abstract getAdornments(): {
    up: string;
    left: string;
    down: string;
    right: string;
  };

  setLength(length: number) {
    this.length = length;
  }

  getLength(): number {
    return this.length;
  }

  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }
  setX(x: number) {
    this.x = x;
  }
  setY(y: number): void {
    this.y = y;
  }

  setOutline(outline: boolean) {
    this.outline = outline;
  }

  getOutline() {
    return this.outline;
  }

  setDirection(direction: AdornmentDirection) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  abstract getPadding(): number;
}
