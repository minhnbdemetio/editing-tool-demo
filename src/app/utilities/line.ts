import { fabric } from 'fabric';

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
    hasBorders: true,
    selectable: false,
    hasControls: false,
  });
};

export const createDashedLine = (
  points?: number[] | undefined,
  objObjects: fabric.ILineOptions | undefined = {},
) => {
  const strokeWidth = objObjects.strokeWidth || 1;
  console.debug('stroke width', strokeWidth);
  return new fabric.Line(points, {
    ...objObjects,
    scaleY: 1,
    strokeDashArray: [strokeWidth * 5, strokeWidth],
    borderColor: 'blue',
    name: 'line',
    hasBorders: true,
    selectable: false,
    hasControls: false,
  });
};

export const createDotsLine = (
  points?: number[] | undefined,
  objObjects: fabric.ILineOptions | undefined = {},
) => {
  const strokeWidth = objObjects.strokeWidth || 1;
  return new fabric.Line(points, {
    ...objObjects,
    scaleY: 1,
    strokeDashArray: [strokeWidth, strokeWidth],
    borderColor: 'blue',
    name: 'line',
    hasBorders: true,
    selectable: false,
    hasControls: false,
  });
};
