import { RefObject } from 'react';
import {
  DEFAULT_TOOLBAR_POSITION,
  TOOLBAR_VERTICAL_OFFSET,
} from '../constants/canvas-constants';

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
