import { useCommandHistory } from '@/app/store/editor-command-history';
import { useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { Command } from '@/app/factories/command/Command';

export const useUndoCommand = () => {
  const { popCommand, commandHistory, pushUndoCommand } = useCommandHistory();
  const latestCommand = commandHistory[commandHistory.length - 1];

  return useCallback(() => {
    if (!commandHistory.length) return;
    latestCommand.performUndo();
    pushUndoCommand(latestCommand);
    popCommand();
  }, [commandHistory.length, latestCommand, popCommand, pushUndoCommand]);
};

export const useRedoCommand = () => {
  const { popUndoCommand, undoneCommandHistory, pushCommand } =
    useCommandHistory();
  const latestUndoCommand =
    undoneCommandHistory[undoneCommandHistory.length - 1];

  return useCallback(() => {
    if (!undoneCommandHistory.length) return;
    latestUndoCommand.performRedo();
    pushCommand(latestUndoCommand);
    popUndoCommand();
  }, [
    latestUndoCommand,
    popUndoCommand,
    pushCommand,
    undoneCommandHistory.length,
  ]);
};

const DEFAULT_DEBOUNCE_WAIT = 300; //ms

export const useExecuteCommand = <T extends (...args: any) => any>(
  command: Command,
  options?: {
    debounce?: boolean;
    debounceWait?: number;
  },
) => {
  const { pushCommand } = useCommandHistory();
  const debouncedPushCommand = useRef(
    debounce(pushCommand, options?.debounceWait || DEFAULT_DEBOUNCE_WAIT),
  );

  return useCallback(
    (...params: Parameters<T>) => {
      command.performCommand(...params);
      options?.debounce
        ? debouncedPushCommand.current(command)
        : pushCommand(command);
    },
    [command, options?.debounce, pushCommand],
  );
};
