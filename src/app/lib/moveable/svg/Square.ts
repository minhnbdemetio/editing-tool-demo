import { SvgShape, SvgShapeOptions } from './SvgShape';

export class Square extends SvgShape {
  protected reverseRounded: boolean = false;
  protected rounded: number = 0;

  constructor(
    options: SvgShapeOptions & { reverseRounded?: boolean; rounded?: number },
  ) {
    super(options);

    this.rounded = options.rounded || 0;
    this.reverseRounded = options.reverseRounded || false;
    if (this.reverseRounded) this.rounded = 20;
  }

  getPath(): string {
    const straightWidth =
      (this.rounded ? this.width - this.rounded : this.width) -
      this.strokeWidth / 2;
    const straightHeight =
      (this.rounded ? this.height - this.rounded : this.height) -
      this.strokeWidth / 2;
    const padding = this.strokeWidth / 2;

    const actions: string[] = [];

    actions.push(`V${straightHeight}`);

    if (this.rounded) {
      if (this.reverseRounded) {
        actions.push(`q${this.rounded},0,${this.rounded},${this.rounded}`);
      } else {
        actions.push(`q0,${this.rounded},${this.rounded},${this.rounded}`);
      }
    }

    actions.push(`H${straightWidth}`);

    if (this.rounded) {
      if (this.reverseRounded) {
        actions.push(`q0,-${this.rounded},${this.rounded},-${this.rounded}`);
      } else {
        actions.push(`q${this.rounded},0,${this.rounded},-${this.rounded}`);
      }
    }

    actions.push(`V${padding + this.rounded}`);

    if (this.rounded) {
      if (this.reverseRounded) {
        actions.push(`q-${this.rounded},0,-${this.rounded},-${this.rounded}`);
      } else {
        actions.push(`q0,-${this.rounded},-${this.rounded},-${this.rounded}`);
      }
    }

    actions.push(`H${padding + this.rounded}`);

    if (this.rounded) {
      if (this.reverseRounded) {
        actions.push(`q0,${this.rounded},-${this.rounded},${this.rounded}`);
      } else {
        actions.push(`q-${this.rounded},0,-${this.rounded},${this.rounded}`);
      }
    }

    return `<path stroke-width="${this.strokeWidth}" stroke="${
      this.stroke
    }" d="M${padding},${padding + this.rounded} ${actions.join(
      ' ',
    )} Z" fill="currentColor"  isInit="true"></path>`;
  }
}
