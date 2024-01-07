import { v4 as uuidv4 } from 'uuid';

export class LinePoint {
  id: string;
  x: number;
  y: number;
  private next: LinePoint | null;
  private prev: LinePoint | null;

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

  hasPrevCurve() {
    return !!this.getPrev()?.getPrev();
  }
  hasNextCurve() {
    return !!this.getNext()?.getNext();
  }
}
