import { fabric } from 'fabric';
import { MoveableLineObject } from '../lib/moveable/MoveableLine';

export const getAngleByPoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  position: 'start' | 'end',
) => {
  const verticalHeight = Math.abs(y2 - y1);
  const horizontalWidth = Math.abs(x2 - x1);

  const tanRatio = verticalHeight / horizontalWidth;

  const basicAngle = Math.atan(tanRatio) * (180 / Math.PI) - 90;

  let angle = -basicAngle;

  if (y2 > y1 && x2 > x1) {
    angle = 180 - angle;
  }

  if (y2 > y1 && x1 > x2) {
    angle += 180;
  }

  if (x2 < x1 && y2 < y1) {
    angle = -angle;
  }

  if (position === 'start') return 180 + angle;

  return angle;
};

export const getAngle = (line: fabric.Line, position: 'start' | 'end') => {
  const x1 = line.data.x1;
  const y1 = line.data.y1;
  const y2 = line.data.y2;
  const x2 = line.data.x2;
  const verticalHeight = Math.abs(y2 - y1);
  const horizontalWidth = Math.abs(x2 - x1);
  const tanRatio = verticalHeight / horizontalWidth;

  const basicAngle = Math.atan(tanRatio) * (180 / Math.PI) - 90;

  let angle = -basicAngle;

  if (y2 > y1 && x2 > x1) {
    angle = 180 - angle;
  }

  if (y2 > y1 && x1 > x2) {
    angle += 180;
  }

  if (x2 < x1 && y2 < y1) {
    angle = -angle;
  }

  if (position === 'start') return 180 + angle;

  return angle;
};
