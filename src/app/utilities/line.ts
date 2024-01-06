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
    strokeWidth: 1,
    scaleY: 1,
    borderColor: 'blue',
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

export const widthEndArrow = (line: fabric.Line) => {
  const y2 = line.get('y2');
  const triangle = new fabric.Triangle({
    width: 10,
    height: 15,
    fill: line.stroke,
    left: y2,
    top: y2,
    angle: 90,
  });

  const group = new fabric.Group([line, triangle], {
    name: 'line',
    hasBorders: false,
    hasControls: false,
    selectable: false,
  });

  return group;
};
