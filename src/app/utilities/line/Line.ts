import {
  BoundingRectPosition,
  ILine,
  SvgAlignment,
  SvgFlip,
  SvgLineType,
} from './Interface.Line';
import { LinePoint } from './Point';
import { v4 as uuidV4 } from 'uuid';
import { AdornmentDirection } from './adornment/Adornment.interfaces';
import { SvgStrokeType } from '../Svg.interfaces';
import { Svg, SvgOptions } from '../Svg';
import { Adornment } from './adornment/Adornment';

export type SvgLineOptions = {
  length?: number;
  stroke?: string;
  startAdornment?: Adornment;
  endAdornment?: Adornment;
  type?: SvgLineType.Elbowed | SvgLineType.Straight;
  cornerRounding?: number;
  shadowDirection?: number;
  shadowOpacity?: number;
  shadowDistance?: number;
  shadowBlur?: number;
  opacity?: number;
} & SvgOptions;

export abstract class SvgLine extends Svg implements ILine {
  length: number;
  startAdornment: Adornment | undefined;
  endAdornment: Adornment | undefined;
  padding: number = 6;
  type: SvgLineType;
  cornerRounding: number;
  points: LinePoint;
  endPoint: LinePoint;
  toleranceNumber = 0.5;

  public shadowDirection: number = 0;
  public shadowOpacity: number = 0;
  public shadowDistance: number = 0;
  public shadowBlur: number = 0;

  shadowSvgId = uuidV4();
  gradientId = uuidV4();

  constructor(options: SvgLineOptions = {}) {
    super(options);

    this.startAdornment = options.startAdornment;
    this.endAdornment = options.endAdornment;
    this.length = options.length || 50;
    this.type = options.type || SvgLineType.Straight;
    this.cornerRounding = options.cornerRounding || 10;

    this.padding = 50;

    this.setShadow(
      options || {
        shadowBlur: 0,
        shadowDirection: 0,
        shadowDistance: 0,
        shadowOpacity: 100,
      },
    );

    const end = new LinePoint(200, 0, null, null);
    const start = new LinePoint(0, 0, null, end);

    end.setPrev(start);

    this.points = start;
    this.endPoint = end;
  }

  getCenterPoint(): number {
    const { height } = this.getDimensions();
    return height / 2;
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
    return this.startAdornment;
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

  public getStrokeDashArray() {
    return this.strokeDashArray;
  }
  public getStrokeDashArraySize() {
    return this.strokeDashArraySize;
  }

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
      setStartPadding(startAdornmentPos, -this.strokeWidth / 2);
    } else {
      setStartPadding(startAdornmentPos, this.startAdornment.getPadding());
    }
    if (!this.endAdornment) {
      setEndPadding(endAdornmentPos, -this.strokeWidth / 2);
    } else {
      setEndPadding(endAdornmentPos, this.endAdornment.getPadding());
    }

    return adornmentPadding;
  }

  private getDimensions: () => { length: number; height: number } = () => {
    const bounding = this.getBoundingPosition();

    const width = Math.abs(bounding.x2 - bounding.x1);
    const height = Math.abs(bounding.y3 - bounding.y1);

    return {
      length: width + this.padding * 2,
      height: height + this.padding * 2,
    };
  };

  public setCornerRounding(cornerRounding: number): void {
    this.cornerRounding = cornerRounding;
  }

  public setType(type: SvgLineType): void {
    this.type = type;
  }

  public toElbowed() {
    if (this.type === SvgLineType.Straight) {
      this.type = SvgLineType.Elbowed;
      this.convertPointsToElbowed();
    }
  }

  public toStraight() {
    if (this.type === SvgLineType.Elbowed) {
      this.type = SvgLineType.Straight;

      this.points.setNext(this.endPoint);
      this.endPoint.setPrev(this.points);
    }
  }

  private convertPointsToElbowed() {
    let point: LinePoint | null = this.points;

    while (point) {
      const nextPosition = point.getNext()?.getPosition();

      if (nextPosition) {
        let pointPosition = point.getPosition();
        const isVerticalStraightLine = pointPosition.x === nextPosition.x;
        const isHorizontalStraightLine = pointPosition.y === nextPosition.y;

        if (!isHorizontalStraightLine && !isVerticalStraightLine) {
          const middle = new LinePoint(
            pointPosition.x,
            nextPosition.y,
            point,
            point.getNext(),
          );
          point.getNext()?.setPrev(middle);
          point.setNext(middle);
        }
      }

      point = point.getNext();
    }
  }

  public getType(): SvgLineType {
    return this.type;
  }

  public toSvg(): string {
    const { length, height } = this.getDimensions();

    this.syncStartAdornmentSvgProperties();
    this.syncEndAdornmentSvgProperties();

    return `
        <svg  height="${height}" width="${length}">
            <defs>
              ${this.getSvgShadow()}
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

  public toObject(): {
    strokeWidth: number;
    length: number;
    stroke: SvgStrokeType;
    type: SvgLineType;
    points: LinePoint;
  } {
    return {
      stroke: this.stroke,
      length: this.length,
      strokeWidth: this.strokeWidth,
      type: this.type,
      points: this.points,
    };
  }

  public moveAllPoints(change: { x: number; y: number }) {
    let point: LinePoint | null = this.points;

    while (point) {
      point.x += change.x;
      point.y += change.y;

      point = point.getNext();
    }
  }

  public getPoints() {
    let points: { id: string; x: number; y: number }[] = [];
    let point: LinePoint | null = this.points;

    while (point) {
      points.push({ id: point.id, x: point.x, y: point.y });
      point = point.getNext();
    }

    return points;
  }

  public getPointById = (id: string) => {
    let targetPoint: LinePoint | null = null;
    let point: LinePoint | null = this.points;

    while (targetPoint == null && point) {
      if (id === point.id) {
        targetPoint = point;
      }

      point = point.getNext();
    }

    return targetPoint;
  };

  public updatePoint(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point) {
      point.x = x;
      point.y = y;
    }
  }

  abstract getDisplayPosition(): { x: number; y: number };

  abstract getRotateAngle(): number;

  public getBoundingPosition(relative?: boolean): BoundingRectPosition {
    let bounding: BoundingRectPosition = {
      x1: 1000000,
      y1: 1000000,
      x2: -100000,
      y2: 100000,
      x3: 100000,
      y3: -100000,
      x4: -100000,
      y4: -100000,
    };

    let point: null | LinePoint = this.points;

    while (point !== null) {
      const { x, y } = point.getPosition();

      if (x < bounding.x1) bounding.x1 = x;
      if (y < bounding.y1) bounding.y1 = y;

      if (x > bounding.x2) bounding.x2 = x;
      if (y < bounding.y2) bounding.y2 = y;

      if (x < bounding.x3) bounding.x3 = x;
      if (y > bounding.y3) bounding.y3 = y;

      if (x > bounding.x4) bounding.x4 = x;
      if (y > bounding.y4) bounding.y4 = y;
      point = point.getNext();
    }

    return bounding;
  }

  public getElbowedLinePositions() {
    if (this.type !== SvgLineType.Elbowed) return [];

    const positions: {
      x1: number;
      y1: number;
      startId: string;
      endId: string;
      y2: number;
      x2: number;
    }[] = [];

    let point: null | LinePoint = this.points;

    while (point) {
      const next = point.getNext();

      if (next) {
        positions.push({
          startId: point.id,
          x1: point.x,
          y1: point.y,
          endId: next.id,
          x2: next.x,
          y2: next.y,
        });
      }

      point = point.getNext();
    }

    return positions;
  }

  public updateElbowedPoints(
    startId: string,
    endId: string,
    point: { x?: number; y?: number },
  ) {
    if (this.getType() === SvgLineType.Elbowed && startId && endId) {
      const start = this.getPointById(startId);
      const end = start?.getNext();
      if (start && end) {
        if (point.y) {
          start.y = point.y;
          end.y = point.y;
        }
        if (point.x) {
          start.x = point.x;
          end.x = point.x;
        }
      }
    }
  }

  public createPrevFor(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point && !point.getPrev()) {
      const newHead = new LinePoint(x, y, null, this.points);
      this.points.setPrev(newHead);
      this.points = newHead;
    }
  }

  public createNewEnd(id: string, x: number, y: number) {
    const point = this.getPointById(id);

    if (point && !point.getNext()) {
      const newPoint = new LinePoint(x, y, point, point.getNext());
      point.setNext(newPoint);

      if (!newPoint.getNext()) this.endPoint = newPoint;
    }
  }

  public removePoint(id: string) {
    const point = this.getPointById(id);

    if (point) {
      if (point.getPrev()) {
        if (point.getNext()) {
          const prev = point.getPrev();
          const next = point.getNext();
          prev?.setNext(next);
          next?.setPrev(prev);
        } else {
          const prev = point.getPrev();
          prev?.setNext(null);
          this.endPoint = prev as LinePoint;
        }
      } else {
        this.points = this.points.getNext() as LinePoint;
        this.points.setPrev(null);
      }
    }
  }

  public mergeStraightLine() {
    if (this.getType() === SvgLineType.Elbowed) {
      let point: null | LinePoint = this.points;

      while (point) {
        const next = point.getNext();
        const prev = point.getPrev();

        if (next && prev) {
          if (
            (Math.abs(next.x - point.x) <= this.toleranceNumber &&
              Math.abs(prev.x - point.x) <= this.toleranceNumber) ||
            (Math.abs(next.y - point.y) <= this.toleranceNumber &&
              Math.abs(prev.y - point.y) <= this.toleranceNumber)
          ) {
            this.removePoint(point.id);
          }
        }

        point = next;
      }
    }
  }

  public setShadow(options: {
    shadowDirection?: number;
    shadowOpacity?: number;
    shadowDistance?: number;
    shadowBlur?: number;
  }) {
    if (options.shadowBlur) this.shadowBlur = options.shadowBlur || 0;
    if (options.shadowOpacity)
      this.shadowOpacity = options.shadowOpacity || 100;
    if (options.shadowDistance)
      this.shadowDistance = options.shadowDistance || 0;
    if (options.shadowDirection)
      this.shadowDirection = options.shadowDirection || 0;
  }
  public getShadowPosition(): { dx: number; dy: number } {
    const distance = (this.shadowDistance / 100) * this.strokeWidth;
    let angle = this.shadowDirection;

    const isLeft = angle >= 45 && angle < 135;
    const isTop = angle >= 135 && angle < 225;
    const isRight = angle >= 225 && angle < 315;

    const getPosition = (_angle: number) => {
      let result: number;
      angle -= 45;

      result = Math.sin((_angle * Math.PI) / 180) * distance;

      return result;
    };

    if (isLeft) {
      return { dx: -distance, dy: -getPosition(angle - 90) };
    }
    if (isTop) {
      return { dy: -distance, dx: getPosition(angle - 180) };
    }
    if (isRight) {
      return { dx: distance, dy: getPosition(angle - 270) };
    }

    return { dy: distance, dx: -getPosition(angle) };
  }

  public getSvgShadow() {
    const { dx, dy } = this.getShadowPosition();

    const blur = (this.shadowBlur / 100) * 4;
    const opacity = this.shadowOpacity / 100;

    if (this.shadowDistance === 0) return ``;

    return `
   
      <filter  id="${this.shadowSvgId}" x="-40%" y="-40%" width="200%" height="200%">
        <feDropShadow  dx="${dx}" dy="${dy}"  flood-opacity="${opacity}"  in="offOut"  stdDeviation="${blur}"  />
      </filter>
      
    `;
  }

  public getClosest(reference: number, vector: 'x' | 'y'): LinePoint {
    let closestLeftPoint = this.points;
    let smallestDifference = 100000;

    let point: null | LinePoint = this.points;

    while (point) {
      const differ = Math.abs(reference - point[vector]);

      if (differ < smallestDifference) {
        closestLeftPoint = point;
        smallestDifference = differ;
      }

      point = point.getNext();
    }

    return closestLeftPoint;
  }

  public align(
    alignment: SvgAlignment,
    setting?: { width?: number; height?: number },
  ) {
    const halfStrokeWidth = this.strokeWidth / 2;

    switch (alignment) {
      case SvgAlignment.LEFT: {
        let closestLeftPoint = this.getClosest(0, 'x');
        this.moveAllPoints({ x: -closestLeftPoint.x + halfStrokeWidth, y: 0 });

        return;
      }
      case SvgAlignment.TOP: {
        let closestLeftTop = this.getClosest(0, 'y');

        this.moveAllPoints({ y: -closestLeftTop.y + halfStrokeWidth, x: 0 });
        return;
      }
      case SvgAlignment.RIGHT: {
        if (!setting?.width) throw new Error('Width is required!');
        let closestLeftRight = this.getClosest(setting.width, 'x');

        this.moveAllPoints({
          x: setting.width - closestLeftRight.x - halfStrokeWidth,
          y: 0,
        });
        return;
      }
      case SvgAlignment.BOTTOM: {
        if (!setting?.height) throw new Error('Height is required!');
        let closestLeftRight = this.getClosest(setting.height, 'x');

        this.moveAllPoints({
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
          this.moveAllPoints({ x: difference, y: 0 });
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
          this.moveAllPoints({ y: difference, x: 0 });
        }

        return;
      }
    }
  }

  public flip(direction: SvgFlip) {
    const { x2, x1, y4, y2 } = this.getBoundingPosition(true);
    let point: null | LinePoint = this.points;

    while (point) {
      if (direction === SvgFlip.HORIZONTAL) {
        point.x = x2 - point.x + x1;
      }
      if (direction === SvgFlip.VERTICAL) {
        point.y = y4 - point.y + y2;
      }

      point = point.getNext();
    }
  }
}
//
