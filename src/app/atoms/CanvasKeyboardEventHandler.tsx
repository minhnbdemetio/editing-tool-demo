import { useEffect } from 'react';
import {
  useDeleteActiveObject,
  useRotateActiveObject,
} from '../hooks/useActiveObject';
import { EDITOR_CONTAINER_ID } from '../organisms/Editor';

export const CanvasKeyboardEventHandler = () => {
  const deleteEventHandler = useDeleteActiveObject();
  const rotateClockwiseEventHandler = useRotateActiveObject('clockwise');
  const rotateCounterclockwiseEventHandler =
    useRotateActiveObject('counterclockwise');

  useEffect(() => {
    const editorContainer = document.getElementById(EDITOR_CONTAINER_ID);

    if (editorContainer) {
      editorContainer.addEventListener('keydown', function (event) {
        const isCmdOrCtrlPressed = event.metaKey || event.ctrlKey;
        if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault();
          deleteEventHandler();
        }

        if (isCmdOrCtrlPressed && event.key === 'ArrowLeft') {
          event.preventDefault();
          rotateClockwiseEventHandler();
        }

        if (isCmdOrCtrlPressed && event.key === 'ArrowRight') {
          event.preventDefault();
          rotateCounterclockwiseEventHandler();
        }
      });

      return () => document.removeEventListener('keydown', () => {});
    }
  }, [
    deleteEventHandler,
    rotateClockwiseEventHandler,
    rotateCounterclockwiseEventHandler,
  ]);

  return null;
};
