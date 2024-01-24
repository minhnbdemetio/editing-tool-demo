import { SvgShape } from './SvgShape';

export class Square extends SvgShape {
  getPath(): string {
    return `<path d="M0,0V${this.getHeight()}H${this.getWidth()}V0Z" fill="currentColor"  isInit="true"></path>`;
  }
}
