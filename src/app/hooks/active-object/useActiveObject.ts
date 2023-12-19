import {
  CLONE_OBJECT_OFFSET,
  INITIAL_ANGLE,
  ROTATE_ANGLE_OFFSET,
} from '@/app/constants/canvas-constants';
import { fabric } from 'fabric';
import { useCurrentCanvas } from '../contexts/useCurrentCanvas';

export const useRotateActiveObject = (
  direction: 'clockwise' | 'counterclockwise',
) => {
  const { currentCanvas } = useCurrentCanvas();

  const handleRotateActiveObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (!activeObject) return;
    const currentAngle = activeObject.angle || INITIAL_ANGLE;
    activeObject.rotate(
      direction === 'clockwise'
        ? currentAngle + ROTATE_ANGLE_OFFSET
        : currentAngle - ROTATE_ANGLE_OFFSET,
    );
    currentCanvas?.renderAll();
  };

  return handleRotateActiveObject;
};

export const useDeleteActiveObject = () => {
  const { currentCanvas } = useCurrentCanvas();

  const handleDeleteActiveObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (activeObject) {
      currentCanvas?.remove(activeObject);
    }
  };

  return handleDeleteActiveObject;
};

export const useCopyActiveObject = () => {
  const { currentCanvas } = useCurrentCanvas();

  const handleCopyObject = () => {
    const activeObject = currentCanvas?.getActiveObject();
    if (!activeObject) return;

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
  };

  return handleCopyObject;
};
