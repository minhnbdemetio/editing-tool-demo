import { useCallback, useEffect } from 'react';
import { useCurrentCanvas } from '../hooks/contexts/useCurrentCanvas';

export const CanvasKeyboardEventHandler = () => {
  const { currentCanvas } = useCurrentCanvas();

  const deleteEventHandler = useCallback(() => {
    const activeObject = currentCanvas?.getActiveObject();
    if (activeObject) {
      currentCanvas?.remove(activeObject);
    }
  }, [currentCanvas]);

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        deleteEventHandler();
      }
    });
  }, [deleteEventHandler]);

  return null;
};
