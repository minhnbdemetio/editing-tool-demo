import { SvgShape } from './SvgShape';

export class Triangle extends SvgShape {
  getPath(fill: string = 'currentColor'): string {
    const centerPoint = this.getCenterPoint();

    return `<path d="M0,${
      this.height
    } L${centerPoint},0 L${this.getWidth()},${this.getHeight()} z" fill=${fill}  isInit="true"></path>`;
  }
}
