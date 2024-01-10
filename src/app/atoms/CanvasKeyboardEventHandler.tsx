import { useEffect } from 'react';
import { EDITOR_CONTAINER_ID } from '../organisms/Editor';

export const CanvasKeyboardEventHandler = () => {
  useEffect(() => {
    const editorContainer = document.getElementById(EDITOR_CONTAINER_ID);

    if (editorContainer) {
      editorContainer.addEventListener('keydown', function (event) {
        const isCmdOrCtrlPressed = event.metaKey || event.ctrlKey;
        if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault();
        }

        if (isCmdOrCtrlPressed && event.key === 'ArrowLeft') {
          event.preventDefault();
        }

        if (isCmdOrCtrlPressed && event.key === 'ArrowRight') {
          event.preventDefault();
        }
      });

      return () => document.removeEventListener('keydown', () => {});
    }
  }, []);

  return null;
};
