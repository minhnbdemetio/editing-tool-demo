import {
  CLONE_OBJECT_OFFSET,
  INITIAL_ANGLE,
  ROTATE_ANGLE_OFFSET,
} from '@/app/constants/canvas-constants';
import { fabric } from 'fabric';
import { useActivePageCanvas } from './useActivePage';

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

  return handleRotateActiveObject;
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

  return handleDeleteActiveObject;
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

  return handleCopyObject;
};

export const useChangeActiveObjectFontSize = () => {
  const activePageCanvas = useActivePageCanvas();

  const handleChangeFontSize = (fontSize: number, callback: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    activeObject?.set('fontSize', fontSize);
    activePageCanvas?.renderAll();
    callback();
    return true;
  };

  return handleChangeFontSize;
};

export const useToggleBoldText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleBoldText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
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

  return toggleBoldText;
};

export const useToggleItalicText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleItalicText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
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

  return toggleItalicText;
};

export const useToggleUnderlineText = () => {
  const activePageCanvas = useActivePageCanvas();

  const toggleUnderlineText = (callback?: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    const isUnderlined = activeObject?.get('textDecoration') === 'underline';
    if (isUnderlined) {
      activeObject.set('textDecoration', '');
    } else {
      activeObject?.set('textDecoration', 'underline');
    }
    activePageCanvas?.renderAll();
    callback && callback();
    return true;
  };

  return toggleUnderlineText;
};

export const useChangeTextColor = () => {
  const activePageCanvas = useActivePageCanvas();

  const changeTextColor = (color: string, callback: Function) => {
    const activeObject = activePageCanvas?.getActiveObject();
    activeObject?.set({ fill: color });
    activePageCanvas?.renderAll();
    callback();
    return true;
  };

  return changeTextColor;
};
