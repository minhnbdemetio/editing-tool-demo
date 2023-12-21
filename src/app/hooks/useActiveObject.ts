import {
  CLONE_OBJECT_OFFSET,
  INITIAL_ANGLE,
  ROTATE_ANGLE_OFFSET,
} from '@/app/constants/canvas-constants';
import { fabric } from 'fabric';
import { usePageCanvas } from './usePageCanvas';

export const useRotateActiveObject = (
  direction: 'clockwise' | 'counterclockwise',
) => {
  const [currentCanvas] = usePageCanvas();

  const handleRotateActiveObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (!activeObject) return 0;
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
  const [currentCanvas] = usePageCanvas();

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
  const [currentCanvas] = usePageCanvas();

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
