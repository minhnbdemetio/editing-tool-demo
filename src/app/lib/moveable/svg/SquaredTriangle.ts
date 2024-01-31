import { SvgShape } from './SvgShape';

export class SquaredTriangle extends SvgShape {
  getPath(): string {
    return `<path d="M0,0 v${this.getHeight()} h${this.getWidth()} z" fill="currentColor"  isInit="true"></path>`;
  }
}
