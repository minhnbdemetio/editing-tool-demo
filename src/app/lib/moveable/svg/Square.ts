import { SvgShape, SvgShapeOptions } from './SvgShape';

export enum CornerType {
  Cut,
  InvertedRound,
  Rounded,
}
export declare type Corner = {
  size: number;
  type: CornerType;
};
export class Square extends SvgShape {
  protected corners: {
    tl?: Corner;
    tr?: Corner;
    bl?: Corner;
    br?: Corner;
    all?: Corner;
  };

  constructor(
    options: SvgShapeOptions & {
      corners?: {
        tl?: Corner;
        tr?: Corner;
        bl?: Corner;
        br?: Corner;
        all?: Corner;
      };
    },
  ) {
    super(options);

    this.corners = {
      bl: options.corners?.bl,
      tr: options.corners?.tr,
      tl: options.corners?.tl,
      br: options.corners?.br,
      all: options.corners?.all,
    };
  }

  getCornerSize(corner?: Corner) {
    return this.corners.all?.size || corner?.size || 0;
  }

  getCorner(_corner?: Corner) {
    return this.corners.all || _corner || null;
  }

  createBottomLeftCorner(): string {
    const corner = this.getCorner(this.corners.bl);
    if (!corner) return '';

    switch (corner.type) {
      case CornerType.Rounded:
        return `q0,${corner.size},${corner.size},${corner.size}`;
      case CornerType.Cut:
        return `l ${corner.size},${corner.size}`;
      case CornerType.InvertedRound:
        return `q${corner.size},0,${corner.size},${corner.size}`;
      default:
        return '';
    }
  }

  createBottomRightCorner(): string {
    const corner = this.getCorner(this.corners.br);
    if (!corner) return '';

    switch (corner.type) {
      case CornerType.Rounded:
        return `q${corner.size},0,${corner.size},-${corner.size}`;
      case CornerType.Cut:
        return `l ${corner.size},-${corner.size}`;
      case CornerType.InvertedRound:
        return `q0,${-corner.size},${corner.size},-${corner.size}`;
      default:
        return '';
    }
  }

  createTopRightCorner(): string {
    const corner = this.getCorner(this.corners.tr);
    if (!corner) return '';

    switch (corner.type) {
      case CornerType.Rounded:
        return `q0,-${corner.size},-${corner.size},-${corner.size}`;
      case CornerType.Cut:
        return `l -${corner.size},-${corner.size}`;
      case CornerType.InvertedRound:
        return `q-${corner.size},0,-${corner.size},-${corner.size}`;
      default:
        return '';
    }
  }

  createTopLeftCorner(): string {
    const corner = this.getCorner(this.corners.tl);
    if (!corner) return '';
    switch (corner.type) {
      case CornerType.Rounded:
        return `q-${corner.size},0,-${corner.size},${corner.size}`;
      case CornerType.Cut:
        return `l -${corner.size},${corner.size}`;
      case CornerType.InvertedRound:
        return `q0,${corner.size},-${corner.size},${corner.size}`;
      default:
        return '';
    }
  }

  createLine(
    direction: 'v' | 'h',
    from: number,
    to: number,
    prevCornerSize: number,
    nextCornerSize: number,
  ): string {
    const change = to - from;
    const length =
      (Math.abs(change) - prevCornerSize - nextCornerSize - this.strokeWidth) *
      (change / Math.abs(change));

    return `${direction} ${length} `;
  }

  getPath(): string {
    const padding = this.strokeWidth / 2;

    const topLeftCornerSize = this.getCornerSize(this.corners.tl);
    const bottomLeftCornerSize = this.getCornerSize(this.corners.bl);
    const bottomRightCornerSize = this.getCornerSize(this.corners.br);
    const topRightCornerSize = this.getCornerSize(this.corners.tr);
    const beginY = padding + topLeftCornerSize;

    return `<path stroke-width="${this.strokeWidth}" stroke="${
      this.stroke
    }" d="M${padding},${beginY}
     ${this.createLine(
       'v',
       0,
       this.height,
       topLeftCornerSize,
       bottomLeftCornerSize,
     )}${this.createBottomLeftCorner()}
      ${this.createLine(
        'h',
        0,
        this.width,
        bottomLeftCornerSize,
        bottomRightCornerSize,
      )}  
      ${this.createBottomRightCorner()}
       ${this.createLine(
         'v',
         this.height,
         0,
         topRightCornerSize,
         bottomRightCornerSize,
       )} 
  ${this.createTopRightCorner()}
        ${this.createLine(
          'h',
          this.width,
          0,
          topRightCornerSize,
          topLeftCornerSize,
        )} 
     ${this.createTopLeftCorner()}
    Z" fill="currentColor"  isInit="true"></path>`;
  }
}
