import { fabric } from 'fabric';

const DASHED_RATIO = {
  DOT: 1,
  MEDIUM: 3,
  LARGE: 5,
};

export const createSolidLine = (
  points: number[] | undefined = [],
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
    originY: 'center',
    centeredRotation: false,
    data: {
      x1: points[0],
      y1: points[1],
      x2: points[2],
      y2: points[3],
    },
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
  const x2 = line.data.x2;
  const y2 = line.data.y2;
  return {
    top: y2,
    left: x2,
  };
};

export const getStartPosition = (line: fabric.Line) => {
  const x1 = line.data.x1;
  const y1 = line.data.y1;

  return {
    top: y1,
    left: x1,
  };
};

export const getDisplayPoint = (line: number) => {};

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

export const widthEndTriangle = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const angle = getAngle(line, 'end');

  const triangle = new fabric.Triangle({
    ...position,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    fill: line.stroke,
    angle: angle,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    evented: false,
  });

  line.data.end = triangle;

  triangle.setCoords();

  canvas.add(triangle);

  return line;
};

export const widthStartTriangle = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);

  const angle = getAngle(line, 'start');

  const triangle = new fabric.Triangle({
    ...position,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    fill: line.stroke,
    angle: angle,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    evented: false,
  });

  line.data.start = triangle;

  triangle.setCoords();

  canvas.add(triangle);

  return line;
};

export const makeArrow = (line: fabric.Line, showPosition: 'start' | 'end') => {
  const strokeWidth = line.strokeWidth || 1;

  let position =
    showPosition === 'start' ? getStartPosition(line) : getEndPosition(line);

  const angle = getAngle(line, showPosition);
  const firstLine = new fabric.Line([0, 0, strokeWidth * 3, 0], {
    strokeWidth: line.strokeWidth,
    stroke: line.stroke,
    hasBorders: false,
    hasControls: false,
    evented: false,
    angle: 45,
    centeredRotation: false,
    strokeLineCap: 'round',
  });

  const secondLine = new fabric.Line([0, 0, strokeWidth * 3, 0], {
    strokeWidth: line.strokeWidth,
    stroke: line.stroke,
    hasBorders: false,
    hasControls: false,
    evented: false,
    angle: 135,
    originY: 'bottom',
    centeredRotation: false,
    strokeLineCap: 'round',
  });

  const group = new fabric.Group([firstLine, secondLine], {
    hasBorders: false,
    hasControls: false,
    evented: false,
    angle: angle,
    left: position.left,
    top: position.top,
    originX: 'center',
    originY: 'center',
  });

  return group;
};

export const withEndArrow = (line: fabric.Line, canvas: fabric.Canvas) => {
  const arrow = makeArrow(line, 'end');

  line.data.end = arrow;

  arrow.setCoords();

  canvas.add(arrow);

  return line;
};

export const withStartArrow = (line: fabric.Line, canvas: fabric.Canvas) => {
  const arrow = makeArrow(line, 'start');

  line.data.start = arrow;

  arrow.setCoords();

  canvas.add(arrow);

  return line;
};

export const withEndCircle = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const circle = new fabric.Circle({
    ...position,
    fill: line.stroke,
    radius: strokeWidth * 2,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    evented: false,
    name: 'circle',
  });

  line.data.end = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withStartCircle = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);

  const circle = new fabric.Circle({
    ...position,
    fill: line.stroke,
    radius: strokeWidth * 2,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    evented: false,
    name: 'circle',
  });

  line.data.start = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withEndOutlineCircle = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const circle = new fabric.Circle({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    radius: strokeWidth * 2,
    fill: 'transparent',
    hasBorders: false,
    hasControls: false,
    originX: 'left',
    originY: 'center',
    evented: false,
    name: 'circle',
  });

  line.data.end = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withStartOutlineCircle = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);

  const circle = new fabric.Circle({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    radius: strokeWidth * 2,
    hasBorders: false,
    fill: 'transparent',
    hasControls: false,

    originX: 'right',
    originY: 'center',
    evented: false,
    name: 'circle',
  });

  line.data.start = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withStartOutlineSquare = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);

  const circle = new fabric.Rect({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    width: strokeWidth * 2,
    height: strokeWidth * 2,
    hasBorders: false,
    fill: 'transparent',
    hasControls: false,

    originX: 'right',
    originY: 'center',
    evented: false,
    name: 'square',
  });

  line.data.start = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withEndOutlineSquare = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const circle = new fabric.Rect({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    width: strokeWidth * 2,
    height: strokeWidth * 2,
    hasBorders: false,
    fill: 'transparent',
    hasControls: false,

    originX: 'left',
    originY: 'center',
    evented: false,
    name: 'square',
  });

  line.data.end = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withStartSquare = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);

  const circle = new fabric.Rect({
    ...position,
    fill: line.stroke,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,

    originX: 'right',
    originY: 'center',
    evented: false,
    name: 'square',
  });

  line.data.start = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withEndSquare = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);

  const circle = new fabric.Rect({
    ...position,
    fill: line.stroke,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,

    originX: 'left',
    originY: 'center',
    evented: false,
    name: 'square',
  });

  line.data.end = circle;

  circle.setCoords();

  canvas.add(circle);
  return line;
};

export const withEndRhombus = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);
  const angle = getAngle(line, 'end');

  const rect = new fabric.Rect({
    ...position,
    fill: line.stroke,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,

    evented: false,
    name: 'square',
    centeredRotation: true,
    angle: 45,
  });

  const group = new fabric.Group([rect], {
    hasBorders: false,
    hasControls: false,
    originX: 'right',
    originY: 'center',
    name: 'rhombus',
    angle,
    evented: false,
  });

  line.data.start = group;

  group.setCoords();

  canvas.add(group);
  return line;
};

export const withStartRhombus = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);
  const angle = getAngle(line, 'start');

  const rect = new fabric.Rect({
    ...position,
    fill: line.stroke,
    width: strokeWidth * 3,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,

    evented: false,
    name: 'square',
    centeredRotation: true,
    angle: 45,
  });

  const group = new fabric.Group([rect], {
    hasBorders: false,
    hasControls: false,
    originX: 'left',
    originY: 'center',
    evented: false,
    centeredRotation: false,
    name: 'rhombus',
    angle,
  });

  line.data.end = group;

  group.setCoords();

  canvas.add(group);
  return line;
};

export const withEndOutlineRhombus = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);
  const angle = getAngle(line, 'end');

  const rect = new fabric.Rect({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    width: strokeWidth * 2,
    height: strokeWidth * 2,
    hasBorders: false,
    hasControls: false,
    fill: 'transparent',
    evented: false,
    name: 'square',
    centeredRotation: true,
    angle: 45,
  });

  const group = new fabric.Group([rect], {
    hasBorders: false,
    hasControls: false,
    originX: 'right',
    originY: 'center',
    evented: false,
    name: 'rhombus',
    angle,
  });

  line.data.start = group;

  group.setCoords();

  canvas.add(group);
  return line;
};

export const withStartOutlineRhombus = (
  line: fabric.Line,
  canvas: fabric.Canvas,
) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);
  const angle = getAngle(line, 'start');

  const rect = new fabric.Rect({
    ...position,
    stroke: line.stroke,
    strokeWidth: strokeWidth,
    width: strokeWidth * 2,
    height: strokeWidth * 2,
    hasBorders: false,
    hasControls: false,
    fill: 'transparent',
    evented: false,
    name: 'square',
    centeredRotation: true,
    angle: 45,
  });

  const group = new fabric.Group([rect], {
    hasBorders: false,
    hasControls: false,
    originX: 'left',
    originY: 'center',
    evented: false,
    centeredRotation: false,
    name: 'rhombus',
    angle,
  });

  line.data.end = group;

  group.setCoords();

  canvas.add(group);
  return line;
};

export const withEndLine = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getEndPosition(line);
  const angle = getAngle(line, 'end');

  const rect = new fabric.Rect({
    width: strokeWidth,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,
    fill: line.stroke,
    evented: false,
    name: 'square',
    centeredRotation: true,
  });

  const group = new fabric.Group([rect], {
    ...position,
    hasBorders: false,
    hasControls: false,
    originX: 'right',
    originY: 'center',
    evented: false,
    name: 'line',
    angle: angle - 90,
  });

  line.data.start = group;

  group.setCoords();

  canvas.add(group);
  return line;
};

export const withStartLine = (line: fabric.Line, canvas: fabric.Canvas) => {
  const strokeWidth = line.strokeWidth || 1;

  const position = getStartPosition(line);
  const angle = getAngle(line, 'start');

  const rect = new fabric.Rect({
    width: strokeWidth,
    height: strokeWidth * 3,
    hasBorders: false,
    hasControls: false,
    fill: line.stroke,
    evented: false,
    name: 'square',
    centeredRotation: true,
  });

  const group = new fabric.Group([rect], {
    ...position,
    hasBorders: false,
    hasControls: false,
    originX: 'left',
    originY: 'center',
    evented: false,
    centeredRotation: true,
    name: 'line',
    angle: angle + 90,
  });

  line.data.end = group;

  group.setCoords();

  canvas.add(group);
  return line;
};
