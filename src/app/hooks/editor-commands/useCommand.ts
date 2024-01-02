import { useCommandHistory } from '@/app/store/editor-command-history';
import {
  useLoadPageCanvasState,
  usePageCanvasJSONById,
} from '../usePageCanvas';
import { useCurrentPage } from '../useCurrentPage';
import { useCallback } from 'react';
import { useActivePageCanvasJSON } from '../useActivePage';
import { useActivePage } from '@/app/store/active-page';

export const useUndoCommand = () => {
  const { popCommand, commandHistory, pushUndoCommand } = useCommandHistory();
  const latestCommand = commandHistory[commandHistory.length - 1];

  const loadCanvas = useLoadPageCanvasState(latestCommand?.pageId || '');
  const currentStateJSON = usePageCanvasJSONById(latestCommand?.pageId || '');

  return useCallback(() => {
    if (!commandHistory.length) return;
    loadCanvas(latestCommand?.currentStateJSON);
    popCommand();
    pushUndoCommand({
      currentStateJSON,
      pageId: latestCommand?.pageId,
    });
  }, [
    commandHistory.length,
    currentStateJSON,
    latestCommand?.currentStateJSON,
    latestCommand?.pageId,
    loadCanvas,
    popCommand,
    pushUndoCommand,
  ]);
};

export const useRedoCommand = () => {
  const { popUndoCommand, undoneCommandHistory, pushCommand } =
    useCommandHistory();
  const latestUndoCommand =
    undoneCommandHistory[undoneCommandHistory.length - 1];
  const currentStateJSON = usePageCanvasJSONById(
    latestUndoCommand?.pageId || '',
  );

  const loadCanvas = useLoadPageCanvasState(latestUndoCommand?.pageId || '');

  return useCallback(() => {
    if (!undoneCommandHistory.length) return;
    loadCanvas(latestUndoCommand?.currentStateJSON);
    popUndoCommand();
    pushCommand({
      currentStateJSON,
      pageId: latestUndoCommand?.pageId,
    });
  }, [
    currentStateJSON,
    latestUndoCommand?.currentStateJSON,
    latestUndoCommand?.pageId,
    loadCanvas,
    popUndoCommand,
    pushCommand,
    undoneCommandHistory.length,
  ]);
};

export const useExecuteCommand = <T extends (...args: any) => any>(
  commandFunction: T,
) => {
  const currentStateJSON = useActivePageCanvasJSON();
  const { pageId } = useCurrentPage();
  const { activePage } = useActivePage();
  const { pushCommand } = useCommandHistory();

  return (...params: Parameters<T>) => {
    commandFunction(...params);
    pushCommand({
      currentStateJSON,
      pageId: pageId || activePage || undefined,
    });
  };
};
