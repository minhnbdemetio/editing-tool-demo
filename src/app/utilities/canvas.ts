import { RefObject } from 'react';
import {
  DEFAULT_TOOLBAR_POSITION,
  FABRIC_OBJECT_TYPE,
  TOOLBAR_VERTICAL_OFFSET,
} from '../constants/canvas-constants';
// @ts-ignore
import ColorThief from 'colorthief';
import { rgbToHex } from './color';
import { CustomizableIText } from '../factories/text-element';
import { get } from 'lodash';

export const getToolBarHorizontalCenterPosition = (
  targetObject: fabric.Object,
  toolbarEl: HTMLDivElement,
) => {
  const targetBoundingRect = targetObject.getBoundingRect();
  const left = targetBoundingRect.left;
  const targetWidth = targetBoundingRect.width;

  const toolbarWidth = toolbarEl.clientWidth;

  return left + targetWidth / 2 - toolbarWidth / 2;
};

export const getToolBarVerticalPosition = (
  targetObject: fabric.Object,
  toolbarEl: HTMLDivElement,
  position: 'top' | 'bottom',
) => {
  const targetBoundingRect = targetObject.getBoundingRect();
  const top = targetBoundingRect.top;
  const targetHeight = targetBoundingRect.height;

  const toolbarHeight = toolbarEl.clientHeight;

  return position === 'top'
    ? top - toolbarHeight - TOOLBAR_VERTICAL_OFFSET
    : top + targetHeight + TOOLBAR_VERTICAL_OFFSET;
};

export const getEventTarget = (event: fabric.IEvent<MouseEvent>) => {
  return event.selected ? event.selected[0] : event.target;
};

export const calculateToolbarPosition = (
  target: fabric.Object | undefined,
  toolbarEl: RefObject<HTMLDivElement | null>,
  rotatorEl: RefObject<HTMLDivElement | null>,
) => {
  if (!target || !toolbarEl.current || !rotatorEl.current)
    return {
      toolbarLeft: DEFAULT_TOOLBAR_POSITION,
      toolbarTop: DEFAULT_TOOLBAR_POSITION,
      rotatorLeft: DEFAULT_TOOLBAR_POSITION,
      rotatorTop: DEFAULT_TOOLBAR_POSITION,
    };

  const toolbarLeft = getToolBarHorizontalCenterPosition(
    target,
    toolbarEl.current,
  );
  const toolbarTop = getToolBarVerticalPosition(
    target,
    toolbarEl.current,
    'top',
  );

  const rotatorLeft = getToolBarHorizontalCenterPosition(
    target,
    rotatorEl.current,
  );
  const rotatorTop = getToolBarVerticalPosition(
    target,
    toolbarEl.current,
    'bottom',
  );

  return { toolbarLeft, toolbarTop, rotatorLeft, rotatorTop };
};

export function isIText(
  fabricObject: fabric.Object | null | undefined,
): fabricObject is fabric.IText {
  return fabricObject?.type === FABRIC_OBJECT_TYPE.ITEXT;
}

export function isILine(
  fabricObject: fabric.Object | null | undefined,
): fabricObject is fabric.IText {
  return fabricObject?.name === 'line';
}

export function isCustomizableText(
  fabricObject: fabric.Object | null | undefined,
): fabricObject is CustomizableIText {
  return (
    fabricObject?.type === FABRIC_OBJECT_TYPE.ITEXT &&
    Boolean(get(fabricObject, 'customizable'))
  );
}

const MAX_PALETTE_COLORS = 15;

export const getCanvasPalette = async (
  canvas: fabric.Canvas | null,
): Promise<Array<string>> => {
  if (!canvas) return [];

  const canvasImgSrc = canvas.toDataURL();
  const canvasImgEl = document.createElement('img');
  canvasImgEl.src = canvasImgSrc;

  const colorThief = new ColorThief();
  let palette: number[][] = [];
  if (canvasImgEl.complete) {
    palette = await colorThief.getPalette(canvasImgEl, MAX_PALETTE_COLORS);
  } else {
    palette = await new Promise(res => {
      canvasImgEl.addEventListener('load', function () {
        res(colorThief.getPalette(canvasImgEl, MAX_PALETTE_COLORS));
      });
    });
  }

  return Array.from(
    new Set(
      palette.map((color: number[]) => rgbToHex(color[0], color[1], color[2])),
    ),
  );
};
