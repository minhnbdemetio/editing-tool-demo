import { v4 as uuidv4 } from 'uuid';
import { BoundingRectPosition, SvgFlip } from './Interface.Line';

export class Point {
  id: string;
  x: number;
  y: number;
  private next: Point | null;
  private prev: Point | null;
  private toleranceNumber = 0.5;

  constructor(x: number, y: number, prev: Point | null, next: Point | null) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.next = next;
  }

  setNext(next: Point | null) {
    this.next = next;
  }
  getNext() {
    return this.next;
  }
  setPrev(prev: Point | null) {
    this.prev = prev;
  }
  getPrev() {
    return this.prev;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getDX() {
    const next = this.getNext();
    if (!next) return 0;

    return next.x - this.x;
  }

  getDY() {
    const next = this.getNext();
    if (!next) return 0;

    return next.y - this.y;
  }

  isEqualX(referencePoint: Point) {
    return Math.abs(this.x - referencePoint.x) <= this.toleranceNumber;
  }
  isEqualY(referencePoint: Point) {
    return Math.abs(this.y - referencePoint.y) <= this.toleranceNumber;
  }

  hasPrevCurve() {
    const point = this.getPrev();
    const secondPoint = point?.getNext();
    const thirdPoint = secondPoint?.getNext();

    if (!point || !secondPoint || !thirdPoint) return false;

    const isYCurve =
      point.isEqualX(secondPoint) &&
      !secondPoint.isEqualX(thirdPoint) &&
      !point.isEqualY(secondPoint) &&
      secondPoint.isEqualY(secondPoint);

    const isXCurve =
      point.isEqualY(secondPoint) &&
      !secondPoint.isEqualY(thirdPoint) &&
      !point.isEqualX(secondPoint) &&
      secondPoint.isEqualX(thirdPoint);

    return isXCurve || isYCurve;
  }
  hasNextCurve() {
    const point = this;
    const secondPoint = point?.getNext();
    const thirdPoint = secondPoint?.getNext();

    if (!point || !secondPoint || !thirdPoint) return false;

    const isYCurve =
      point.isEqualX(secondPoint) &&
      !secondPoint.isEqualX(thirdPoint) &&
      !point.isEqualY(secondPoint) &&
      secondPoint.isEqualY(thirdPoint);

    const isXCurve =
      point.isEqualY(secondPoint) &&
      !secondPoint.isEqualY(thirdPoint) &&
      !point.isEqualX(secondPoint) &&
      secondPoint.isEqualX(thirdPoint);

    return isXCurve || isYCurve;
  }

  isHead() {
    return !this.getPrev();
  }

  isEnd() {
    return !this.getNext();
  }

  toObject() {
    return {
      x: this.x,
      y: this.y,
      id: this.id,
    };
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }
}

interface IListPoints {
  head: Point;
  end: Point;

  getHead(): Point;
  getEnd(): Point;
  setHead(point: Point): void;
  setEnd(point: Point): void;
  addAfter(point: Point, newPoint: Point): void;
  addBefore(point: Point, newPoint: Point): void;

  remove(point: Point): void;

  moveAll(change: { x: number; y: number }): void;
  toData(): { id: string; x: number; y: number }[];
  toArray(): Point[];
  findById(id: string): Point | null;

  getClosestPoint(reference: number, vector: 'x' | 'y'): Point;
  flip(direction: SvgFlip): void;

  getBoundingPosition(): BoundingRectPosition;
}

export class ListPoints implements IListPoints {
  head: Point;
  end: Point;
  toleranceNumber: number;

  constructor({
    end,
    head,
    toleranceNumber,
  }: {
    head: Point;
    end: Point;
    toleranceNumber?: number;
  }) {
    this.head = head;
    this.end = end;

    this.head.setNext(end);
    this.end.setPrev(head);

    this.toleranceNumber = toleranceNumber || 0;
  }

  getHead(): Point {
    return this.head;
  }
  getEnd(): Point {
    return this.end;
  }
  setHead(point: Point) {
    if (this.head) point.setNext(this.head);

    this.head.setPrev(point);
    this.head = point;
  }
  setEnd(point: Point) {
    if (this.end) {
      this.end.setNext(point);
    }
    point.setPrev(this.end);

    this.end = point;
    this.end.setNext(null);

    console.debug({ setEnd: this.end });
  }
  remove(point: Point): void {
    if (point) {
      if (!point.isHead()) {
        if (!point.isEnd()) {
          const prev = point.getPrev();
          const next = point.getNext();
          prev?.setNext(next);
          next?.setPrev(prev);
        } else {
          const prev = point.getPrev();
          prev?.setNext(null);
          this.end = prev as Point;
        }
      } else {
        this.head = this.head.getNext() as Point;
        this.head.setPrev(null);
      }
    }
  }
  addAfter(point: Point, newPoint: Point): void {
    if (point.isEnd()) this.setEnd(newPoint);
    else {
      newPoint.setNext(point.getNext());
      point.setNext(newPoint);
      newPoint.setPrev(point);
      point.getNext()?.setPrev(newPoint);
    }
  }
  addBefore(point: Point, newPoint: Point): void {
    const currentPrev = point.getPrev();

    if (currentPrev) {
      currentPrev.setNext(newPoint);
      newPoint.setNext(point);

      newPoint.setPrev(currentPrev);
      point.setPrev(newPoint);
    } else {
      this.setHead(newPoint);
    }
  }

  moveAll(change: { x: number; y: number }): void {
    let point: Point | null = this.head;

    while (point) {
      point.x += change.x;
      point.y += change.y;

      point = point.getNext();
    }
  }

  toData(): { id: string; x: number; y: number }[] {
    return this.toArray().map(o => o.toObject());
  }

  toArray(): Point[] {
    let points: Point[] = [];
    let point: Point | null = this.head;

    while (point) {
      points.push(point);
      point = point.getNext();
    }

    return points;
  }

  findById(id: string): Point | null {
    let targetPoint: Point | null = null;
    let point: Point | null = this.head;

    while (targetPoint == null && point) {
      if (id === point.id) {
        targetPoint = point;
      }

      point = point.getNext();
    }

    return targetPoint;
  }

  public getBoundingPosition(): BoundingRectPosition {
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

    let point: null | Point = this.head;

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

  public getClosestPoint(reference: number, vector: 'x' | 'y'): Point {
    let closestLeftPoint = this.head;
    let smallestDifference = 100000;

    let point: null | Point = this.head;

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

  flip(direction: SvgFlip): void {
    const { x2, x1, y4, y2 } = this.getBoundingPosition();
    let point: null | Point = this.head;

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
