import {
  CLONE_OBJECT_OFFSET,
  INITIAL_ANGLE,
  ROTATE_ANGLE_OFFSET,
} from '@/app/constants/canvas-constants';
import { fabric } from 'fabric';
import { useActivePageCanvas } from './useActivePage';
import { useActiveObject } from '../store/active-object';
import { isIText } from '../utilities/canvas';
import { GradientStop } from '../utilities/color.type';
import { useCallback } from 'react';

export const useActiveITextObject = () => {
  const { activeObject } = useActiveObject();

  return isIText(activeObject) ? activeObject : null;
};

export const useRotateActiveObject = (
  direction: 'clockwise' | 'counterclockwise',
) => {
  const currentCanvas = useActivePageCanvas();

  const handleRotateActiveObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (!activeObject) return INITIAL_ANGLE;
    const currentAngle = activeObject.angle || INITIAL_ANGLE;
    const rotateAngle =
      direction === 'clockwise'
        ? currentAngle + ROTATE_ANGLE_OFFSET
        : currentAngle - ROTATE_ANGLE_OFFSET;

    activeObject.rotate(
      direction === 'clockwise'
        ? currentAngle + ROTATE_ANGLE_OFFSET
        : currentAngle - ROTATE_ANGLE_OFFSET,
    );
    currentCanvas?.renderAll();
    return rotateAngle;
  };

  return useCallback(handleRotateActiveObject, [currentCanvas, direction]);
};

export const useDeleteActiveObject = () => {
  const currentCanvas = useActivePageCanvas();

  const handleDeleteActiveObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (activeObject) {
      currentCanvas?.remove(activeObject);
      return true;
    }
    return false;
  };

  return useCallback(handleDeleteActiveObject, [currentCanvas]);
};

export const useCopyActiveObject = () => {
  const currentCanvas = useActivePageCanvas();

  const handleCopyObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (!activeObject) return false;

    const clonedObject = fabric.util.object.clone(activeObject);
    const activeObjectLeft = activeObject.getBoundingRect().left;
    const activeObjectTop = activeObject.getBoundingRect().top;

    clonedObject.set({
      left: activeObjectLeft + CLONE_OBJECT_OFFSET,
      top: activeObjectTop + CLONE_OBJECT_OFFSET,
    });
    currentCanvas?.add(clonedObject);
    currentCanvas?.discardActiveObject();
    currentCanvas?.setActiveObject(clonedObject);
    return true;
  };

  return useCallback(handleCopyObject, [currentCanvas]);
};

export const useChangeActiveObjectFontSize = () => {
  const activePageCanvas = useActivePageCanvas();

  const handleChangeFontSize = (fontSize: number, callback: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;
    activeObject?.set('fontSize', fontSize);
    activePageCanvas?.renderAll();
    callback();
    return true;
  };

  return useCallback(handleChangeFontSize, [activePageCanvas]);
};

export const useToggleBoldText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleBoldText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;
    const isBold = activeObject?.get('fontWeight') === 'bold';
    if (isBold) {
      activeObject.set('fontWeight', 'normal');
    } else {
      activeObject?.set('fontWeight', 'bold');
    }
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(toggleBoldText, [activePageCanvas]);
};

export const useToggleItalicText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleItalicText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;
    const isItalic = activeObject?.get('fontStyle') === 'italic';
    if (isItalic) {
      activeObject.set('fontStyle', 'normal');
    } else {
      activeObject?.set('fontStyle', 'italic');
    }
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(toggleItalicText, [activePageCanvas]);
};

export const useToggleUnderlineText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleUnderlineText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;
    const isUnderlined = activeObject?.get('underline');
    if (isUnderlined) {
      activeObject.set('underline', false);
    } else {
      activeObject?.set('underline', true);
    }
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(toggleUnderlineText, [activePageCanvas]);
};

export const useToggleStrokeText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleStrokeText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;

    const isStroke = activeObject?.get('linethrough');
    if (isStroke) {
      activeObject.set('linethrough', false);
    } else {
      activeObject?.set('linethrough', true);
    }
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(toggleStrokeText, [activePageCanvas]);
};

export const useToggleCapitalText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleStrokeText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    if (!isIText(activeObject)) return false;

    const isCapitalized = activeObject.get('styles');
    console.log({ isCapitalized });

    // if (isCapitalized) {
    //   activeObject.set('text', originalText);
    //   setOriginalText(originalText);
    // } else {
    //   activeObject?.set('text', capitalizedText);
    // }
    // activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(toggleStrokeText, [activePageCanvas]);
};

export const useChangeTextColor = () => {
  const activePageCanvas = useActivePageCanvas();

  const changeTextColor = (color: string, callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    activeObject?.set({ fill: color });
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(changeTextColor, [activePageCanvas]);
};

export const useChangeTextColorGradient = () => {
  const activePageCanvas = useActivePageCanvas();

  const changeTextColorGradient = (
    colorStops: GradientStop[],
    callback?: Function,
  ) => {
    const activeObject = activePageCanvas?.getActiveObject();
    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
      gradientUnits: 'percentage',
      colorStops,
    });
    activeObject?.set({ fill: gradient });
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return useCallback(changeTextColorGradient, [activePageCanvas]);
};
