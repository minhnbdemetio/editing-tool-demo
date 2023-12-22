import { useCommandHistory } from '@/app/store/editor-command-history';
import { useLoadPageCanvasState, usePageCanvasJSON } from '../usePageCanvas';
import { useCurrentPage } from '../useCurrentPage';
import { useCallback } from 'react';

export const useUndoCommand = () => {
  const { popCommand, commandHistory } = useCommandHistory();
  const latestCommand = commandHistory[commandHistory.length - 1];

  const loadCanvas = useLoadPageCanvasState(latestCommand?.pageId || '');

  return useCallback(() => {
    popCommand();
    loadCanvas(latestCommand?.currentStateJSON);
  }, [latestCommand?.currentStateJSON, loadCanvas, popCommand]);
};

export const useRedoCommand = () => {
  const { popUndoCommand, undoneCommandHistory } = useCommandHistory();
  const latestUndoCommand =
    undoneCommandHistory[undoneCommandHistory.length - 1];

  const loadCanvas = useLoadPageCanvasState(latestUndoCommand?.pageId || '');

  return useCallback(() => {
    popUndoCommand();
    loadCanvas(latestUndoCommand?.currentStateJSON);
  }, [latestUndoCommand?.currentStateJSON, loadCanvas, popUndoCommand]);
};

export const useExecuteCommand = (commandFunction: () => any) => {
  const currentStateJSON = usePageCanvasJSON();
  const { pageId } = useCurrentPage();
  const { pushCommand: push } = useCommandHistory();

  return () => {
    commandFunction();
    push({
      currentStateJSON,
      pageId,
    });
  };
};
