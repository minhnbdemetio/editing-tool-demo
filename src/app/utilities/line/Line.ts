import {
  BoundingRectPosition,
  ILine,
  SvgAlignment,
  SvgLineType,
} from './Interface.Line';
import { ListPoints, Point } from './Point';
import { AdornmentDirection } from './adornment/Adornment.interfaces';
import { StrokeLineCap } from '../Svg.interfaces';
import { Svg, SvgOptions } from '../Svg';
import { Adornment } from './adornment/Adornment';

export type SvgLineOptions = {
  length?: number;
  startAdornment?: Adornment | undefined;
  endAdornment?: Adornment | undefined;
  type?: SvgLineType.Elbowed | SvgLineType.Straight;
  cornerRounding?: number;
  points?: ListPoints;
} & SvgOptions;

export abstract class SvgLine extends Svg implements ILine {
  length: number;
  startAdornment: Adornment | undefined;
  endAdornment: Adornment | undefined;
  padding: number = 6;
  type: SvgLineType;
  cornerRounding: number;
  points: ListPoints;
  toleranceNumber = 0.5;

  constructor(options: SvgLineOptions = {}) {
    super(options);

    this.startAdornment = options.startAdornment;
    this.endAdornment = options.endAdornment;
    this.length = options.length || 50;
    this.type = options.type || SvgLineType.Straight;
    this.cornerRounding = options.cornerRounding || 10;

    this.padding = 50;

    if (options.points) {
      this.points = options.points;
    } else {
      const end = new Point(200, 0, null, null);
      const head = new Point(0, 0, null, end);
      this.points = new ListPoints({ head, end, toleranceNumber: 0.5 });
    }
  }

  getVerticalLine(
    dy: number,
    options: {
      hasNextCurve?: boolean;
      hasPrevCurve?: boolean;
      isFirst?: boolean;
      isLast?: boolean;
      nextDx?: number;
    },
  ) {
    const paths: string[] = [];
    const nextDx = options.nextDx;

    const isFirst = options.isFirst;
    const isEnd = options.isLast;

    const { startBottom, startTop, endTop, endBottom } =
      this.getLineAdornmentPadding();

    if (dy >= this.toleranceNumber) {
      if (options.hasNextCurve) dy -= this.cornerRounding;
      if (options.hasPrevCurve) dy -= this.cornerRounding;

      if (isFirst) {
        dy -= startTop + startBottom;
        paths.push(`m 0 ${startBottom + startTop}`);
      }

      if (isEnd) {
        dy -= endTop + endBottom;
      }

      if (nextDx && nextDx > this.toleranceNumber) {
        if (isFirst && startTop) {
        }
        paths.push(` v ${dy}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q 0,${this.cornerRounding} ${this.cornerRounding},${this.cornerRounding}`,
          );
        }
      } else {
        paths.push(` v ${dy}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q 0,${this.cornerRounding} ${-this.cornerRounding},${
              this.cornerRounding
            }`,
          );
        }
      }
    } else {
      if (options.hasNextCurve) dy += this.cornerRounding;
      if (options.hasPrevCurve) dy += this.cornerRounding;

      if (isFirst) {
        dy += startTop + startBottom;
        paths.push(`m 0 ${-startBottom - startTop}`);
      }

      if (isEnd) {
        dy += endTop + endBottom;
      }

      if (nextDx && nextDx > this.toleranceNumber) {
        paths.push(` v ${dy}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q 0,${-this.cornerRounding} ${this.cornerRounding},${-this
              .cornerRounding}`,
          );
        }
      } else {
        paths.push(` v ${dy}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q 0,${-this.cornerRounding} ${-this.cornerRounding},${-this
              .cornerRounding}`,
          );
        }
      }
    }

    return paths.join(' ');
  }

  getHorizontalLine(
    dx: number,
    options: {
      hasNextCurve?: boolean;
      hasPrevCurve?: boolean;
      isFirst?: boolean;
      isLast?: boolean;
      nextDy?: number;
    },
  ) {
    const paths: string[] = [];

    const isFirst = Boolean(options.isFirst);
    const isEnd = Boolean(options.isLast);

    const { startLeft, startRight, endLeft, endRight } =
      this.getLineAdornmentPadding();

    const nextDy = options.nextDy || 0;

    const leftToRight = dx >= 0;

    if (leftToRight) {
      if (options.hasNextCurve) dx -= this.cornerRounding;
      if (options.hasPrevCurve) dx -= this.cornerRounding;

      if (isEnd) {
        dx -= endLeft + endRight;
      }

      if (isFirst) {
        dx -= startLeft + startRight;

        paths.push(`m ${startLeft + startRight} 0`);
      }

      if (nextDy && nextDy >= 0) {
        paths.push(` h ${dx}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q ${this.cornerRounding},0 ${this.cornerRounding},${this.cornerRounding}`,
          );
        }
      } else {
        paths.push(` h ${dx}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q ${this.cornerRounding},0 ${this.cornerRounding},${-this
              .cornerRounding}`,
          );
        }
      }
    } else {
      if (options.hasNextCurve) dx += this.cornerRounding;
      if (options.hasPrevCurve) {
        dx += this.cornerRounding;
      }

      if (isFirst) {
        dx += startLeft + startRight;
        paths.push(`m ${-(startLeft + startRight)} 0`);
      }
      if (isEnd) {
        dx += endLeft + endRight;
      }

      if (nextDy && nextDy >= 0) {
        paths.push(` h ${dx}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q ${-this.cornerRounding},0 ${-this.cornerRounding},${
              this.cornerRounding
            }`,
          );
        }
      } else {
        paths.push(` h ${dx}`);

        if (!!options.hasNextCurve) {
          paths.push(
            ` q ${-this.cornerRounding},0 ${-this.cornerRounding},${-this
              .cornerRounding}`,
          );
        }
      }
    }

    return paths.join(' ');
  }

  setStartAdornment(adornment: Adornment | undefined): void {
    this.startAdornment = adornment;
  }

  setEndAdornment(adornment: Adornment | undefined): void {
    this.endAdornment = adornment;
  }

  getStartAdornment(): Adornment | undefined {
    return this.startAdornment;
  }
  getEndAdornment(): Adornment | undefined {
    return this.endAdornment;
  }

  syncEndAdornmentSvgProperties(): void {
    const direction = this.getEndAdornmentDirection();

    const { x, y } = this.getEndAdornmentPosition();

    this.endAdornment?.setDirection(direction);
    this.endAdornment?.setLength(this.getAdornmentLength());
    this.endAdornment?.setStroke(this.stroke);
    this.endAdornment?.setStrokeWidth(this.strokeWidth);
    this.endAdornment?.setStrokeDashArray(this.strokeDashArraySize);
    this.endAdornment?.setStrokeLineCap(this.strokeLineCap);
    this.endAdornment?.setX(x);
    this.endAdornment?.setY(y);
  }

  syncStartAdornmentSvgProperties(): void {
    const direction = this.getStartAdornmentDirection();

    const { x, y } = this.getStartAdornmentPosition();

    this.startAdornment?.setDirection(direction);
    this.startAdornment?.setLength(this.getAdornmentLength());
    this.startAdornment?.setStroke(this.stroke);
    this.startAdornment?.setStrokeWidth(this.strokeWidth);
    this.startAdornment?.setStrokeDashArray(this.strokeDashArraySize);
    this.startAdornment?.setStrokeLineCap(this.strokeLineCap);
    this.startAdornment?.setX(x);
    this.startAdornment?.setY(y);
  }

  getEndAdornmentPath(): string {
    return this.endAdornment?.toPath() || '';
  }

  getStartAdornmentPath(): string {
    return this.startAdornment?.toPath() || '';
  }
  abstract getStartAdornmentPosition(): { x: number; y: number };
  abstract getEndAdornmentPosition(): { x: number; y: number };

  abstract getLine(): string;

  abstract getStartAdornmentDirection(): AdornmentDirection;

  abstract getEndAdornmentDirection(): AdornmentDirection;

  getAdornmentLength(): number {
    return this.strokeWidth * 3 - this.strokeWidth / 2;
  }

  private getLineAdornmentPadding(): {
    startLeft: number;
    startRight: number;
    startTop: number;
    startBottom: number;
    endLeft: number;
    endRight: number;
    endTop: number;
    endBottom: number;
  } {
    const adornmentPadding: {
      startLeft: number;
      startRight: number;
      startTop: number;
      startBottom: number;
      endLeft: number;
      endRight: number;
      endTop: number;
      endBottom: number;
    } = {
      startLeft: 0,
      startRight: 0,
      startTop: 0,
      startBottom: 0,
      endLeft: 0,
      endRight: 0,
      endTop: 0,
      endBottom: 0,
    };

    const startAdornmentPos = this.getStartAdornmentDirection();
    const endAdornmentPos = this.getEndAdornmentDirection();

    const setStartPadding = (
      direction: 'left' | 'up' | 'down' | 'right',
      padding: number,
    ) => {
      adornmentPadding.startBottom = 0;
      adornmentPadding.startRight = 0;
      adornmentPadding.startLeft = 0;
      adornmentPadding.startTop = 0;

      switch (direction) {
        case 'left':
          adornmentPadding.startLeft = padding;
          break;
        case 'right':
          adornmentPadding.startRight = padding;
          break;
        case 'up':
          adornmentPadding.startTop = padding;
          break;
        case 'down':
          adornmentPadding.startBottom = padding;
          break;
      }
    };

    const setEndPadding = (
      direction: 'left' | 'up' | 'down' | 'right',
      padding: number,
    ) => {
      adornmentPadding.endBottom = 0;
      adornmentPadding.endLeft = 0;
      adornmentPadding.endRight = 0;
      adornmentPadding.endTop = 0;

      switch (direction) {
        case 'left':
          adornmentPadding.endLeft = padding;
          break;
        case 'right':
          adornmentPadding.endRight = padding;
          break;
        case 'up':
          adornmentPadding.endTop = padding;
          break;
        case 'down':
          adornmentPadding.endBottom = padding;
          break;
      }
    };

    if (!this.startAdornment) {
      setStartPadding(
        startAdornmentPos,
        this.strokeLineCap === StrokeLineCap.Butt ? -this.strokeWidth / 2 : 0,
      );
    } else {
      setStartPadding(startAdornmentPos, this.startAdornment.getPadding());
    }
    if (!this.endAdornment) {
      setEndPadding(
        endAdornmentPos,
        this.strokeLineCap === StrokeLineCap.Butt ? -this.strokeWidth / 2 : 0,
      );
    } else {
      setEndPadding(endAdornmentPos, this.endAdornment.getPadding());
    }

    return adornmentPadding;
  }

  getDimensions: () => { width: number; height: number } = () => {
    const bounding = this.getBoundingPosition();

    const width = Math.abs(bounding.x2 - bounding.x1);
    const height = Math.abs(bounding.y3 - bounding.y1);

    return {
      width: width + this.padding * 2,
      height: height + this.padding * 2,
    };
  };

  public setCornerRounding(cornerRounding: number): void {
    this.cornerRounding = cornerRounding;
  }

  public setType(type: SvgLineType): void {
    this.type = type;
  }

  public getType(): SvgLineType {
    return this.type;
  }

  setPadding() {
    const {
      endBottom,
      endLeft,
      endRight,
      endTop,
      startBottom,
      startLeft,
      startRight,
      startTop,
    } = this.getLineAdornmentPadding();

    this.padding =
      (Math.max(
        endBottom,
        endLeft,
        endRight,
        endTop,
        startBottom,
        startLeft,
        startRight,
        startTop,
        100,
      ) *
        3) /
      2;
  }

  public toSvg(): string {
    this.setPadding();

    const { width: length, height } = this.getDimensions();

    this.syncStartAdornmentSvgProperties();
    this.syncEndAdornmentSvgProperties();

    return `
        <svg  height="${height}" width="${length}">
            <defs>
              ${this.getShadowFilter()}
              ${this.getLinearGradient()}
            </defs>
            <g stroke-location="inside"  opacity="${
              this.opacity / 100
            }" stroke-linejoin="${this.strokeLineCap}" stroke-linecap="${
              this.strokeLineCap
            }" filter="url(#${
              this.shadowSvgId
            })" fill="${this.getStrokeColor()}" stroke="${this.getStrokeColor()}"  stroke-width="${
              this.strokeWidth
            }" >
                ${this.getStartAdornmentPath()}
                ${this.getLine()}
                ${this.getEndAdornmentPath()}
            </g>
        </svg>
    `;
  }

  public toObject() {
    return {
      ...super.toObject(),

      length: this.length,
      startAdornment: this.startAdornment,
      endAdornment: this.endAdornment,
      padding: this.padding,
      type: this.type,
      cornerRounding: this.cornerRounding,
      points: this.points,
      toleranceNumber: this.toleranceNumber,
    };
  }

  public updatePoint(id: string, x: number, y: number) {
    const point = this.points.findById(id);

    if (point) {
      point.x = x;
      point.y = y;
    }
  }

  abstract getDisplayPosition(): { x: number; y: number };

  abstract getRotateAngle(): number;

  public getBoundingPosition(relative?: boolean): BoundingRectPosition {
    return this.points.getBoundingPosition();
  }

  public align(
    alignment: SvgAlignment,
    setting?: { width?: number; height?: number },
  ) {
    const halfStrokeWidth = this.strokeWidth / 2;

    switch (alignment) {
      case SvgAlignment.LEFT: {
        let closestLeftPoint = this.points.getClosestPoint(0, 'x');
        this.points.moveAll({ x: -closestLeftPoint.x + halfStrokeWidth, y: 0 });

        return;
      }
      case SvgAlignment.TOP: {
        let closestLeftTop = this.points.getClosestPoint(0, 'y');

        this.points.moveAll({ y: -closestLeftTop.y + halfStrokeWidth, x: 0 });
        return;
      }
      case SvgAlignment.RIGHT: {
        if (!setting?.width) throw new Error('Width is required!');
        let closestLeftRight = this.points.getClosestPoint(setting.width, 'x');

        this.points.moveAll({
          x: setting.width - closestLeftRight.x - halfStrokeWidth,
          y: 0,
        });
        return;
      }
      case SvgAlignment.BOTTOM: {
        if (!setting?.height) throw new Error('Height is required!');
        let closestLeftRight = this.points.getClosestPoint(setting.height, 'x');

        this.points.moveAll({
          y: setting.height - closestLeftRight.y - halfStrokeWidth,
          x: 0,
        });
        return;
      }
      case SvgAlignment.CENTER: {
        if (!setting?.width) throw new Error('Width is required!');

        const pageCenter = setting.width / 2;
        const { x1, x2 } = this.getBoundingPosition(true);
        const elementCenter = (x1 + x2) / 2;

        const difference = pageCenter - elementCenter;

        if (Math.abs(difference) > 1) {
          this.points.moveAll({ x: difference, y: 0 });
        }
        return;
      }
      case SvgAlignment.MIDDLE: {
        if (!setting?.height) throw new Error('Height is required!');

        const pageCenter = setting.height / 2;

        const { y2, y4 } = this.getBoundingPosition(true);
        const elementCenter = (y2 + y4) / 2;

        const difference = pageCenter - elementCenter;

        if (Math.abs(difference) > 1) {
          this.points.moveAll({ y: difference, x: 0 });
        }

        return;
      }
    }
  }
}
