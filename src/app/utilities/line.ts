import { fabric } from 'fabric';

const DASHED_RATIO = {
  DOT: 1,
  MEDIUM: 3,
  LARGE: 5,
};

export const createSolidLine = (
  points?: number[] | undefined,
  objObjects: fabric.ILineOptions | undefined = {},
) => {
  return new fabric.Line(points, {
    ...objObjects,
    strokeWidth: 5,
    scaleY: 1,
    borderColor: 'blue',
    angle: 0,
    name: 'line',
    hasBorders: false,
    selectable: false,
    hasControls: false,
  });
};

export const createDashedLine = (
  points?: number[] | undefined,
  objObjects: fabric.ILineOptions | undefined = {},
) => {
  return withDashed(createSolidLine(points, objObjects), DASHED_RATIO.LARGE);
};

export const createDotsLine = (
  points?: number[] | undefined,
  objObjects: fabric.ILineOptions | undefined = {},
) => {
  return withDashed(createSolidLine(points, objObjects), DASHED_RATIO.DOT);
};

export const withDashed = (line: fabric.Line, rate: number) => {
  const strokeWidth = line.strokeWidth || 1;
  line.strokeDashArray = [strokeWidth * rate, strokeWidth];
  return line;
};

export const withColor = (line: fabric.Line, color: string) => {
  line.stroke = color;
  return line;
};

export const widthEnd = (line: fabric.Line) => {
  return line;
};

export const getEndPosition = (line: fabric.Line) => {
  const x2 = line.get('y2') || 0;
  const y2 = line.get('x2') || 0;
  const strokeWidth = line.strokeWidth || 1;
  return {
    top: x2 + strokeWidth / 2,
    left: y2 + strokeWidth / 2,
  };
};

export const getAngle = (line: fabric.Line) => {
  const x1 = line.get('x1') || 0;
  const y1 = line.get('y1') || 0;
  const y2 = line.get('y2') || 0;
  const x2 = line.get('x2') || 0;
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

  return angle;
};

export const widthEndArrow = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const angle = getAngle(line);

  const triangle = new fabric.Triangle({
    ...position,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    fill: line.stroke,
    angle: angle,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'start',
    evented: false,
  });

  if (!line.data) line.data = {};
  line.data.end = triangle;

  triangle.setCoords();

  canvas.add(triangle);

  return line;
};
