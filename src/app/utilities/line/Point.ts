import { v4 as uuidv4 } from 'uuid';

export class LinePoint {
  id: string;
  x: number;
  y: number;
  private next: LinePoint | null;
  private prev: LinePoint | null;
  private toleranceNumber = 0.5;

  constructor(
    x: number,
    y: number,
    prev: LinePoint | null,
    next: LinePoint | null,
  ) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.next = next;
  }

  setNext(next: LinePoint | null) {
    this.next = next;
  }
  getNext() {
    return this.next;
  }
  setPrev(prev: LinePoint | null) {
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

  isEqual(p1: number, p2: number) {
    return Math.abs(p1 - p2) <= this.toleranceNumber;
  }
  isNotEqual(p1: number, p2: number) {
    return Math.abs(p1 - p2) > this.toleranceNumber;
  }

  hasPrevCurve() {
    const point = this.getPrev();
    const secondPoint = point?.getNext();
    const thirdPoint = secondPoint?.getNext();

    if (!point || !secondPoint || !thirdPoint) return false;

    const isYCurve =
      this.isEqual(point.x, secondPoint.x) &&
      this.isNotEqual(secondPoint.x, thirdPoint.x) &&
      this.isNotEqual(point.y, secondPoint.y) &&
      this.isEqual(secondPoint.y, thirdPoint.y);

    const isXCurve =
      this.isEqual(point.y, secondPoint.y) &&
      this.isNotEqual(secondPoint.y, thirdPoint.y) &&
      this.isNotEqual(point.x, secondPoint.x) &&
      this.isEqual(secondPoint.x, thirdPoint.x);

    return isXCurve || isYCurve;
  }
  hasNextCurve() {
    const point = this;
    const secondPoint = point?.getNext();
    const thirdPoint = secondPoint?.getNext();

    if (!point || !secondPoint || !thirdPoint) return false;

    const isYCurve =
      this.isEqual(point.x, secondPoint.x) &&
      this.isNotEqual(secondPoint.x, thirdPoint.x) &&
      this.isNotEqual(point.y, secondPoint.y) &&
      this.isEqual(secondPoint.y, thirdPoint.y);

    const isXCurve =
      this.isEqual(point.y, secondPoint.y) &&
      this.isNotEqual(secondPoint.y, thirdPoint.y) &&
      this.isNotEqual(point.x, secondPoint.x) &&
      this.isEqual(secondPoint.x, thirdPoint.x);

    return isXCurve || isYCurve;
  }
}
