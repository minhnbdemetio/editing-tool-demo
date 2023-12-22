import { create } from 'zustand';

export interface Command {
  currentStateJSON: { version: string; objects: Object[] } | undefined;
  pageId: string | undefined;
}

interface CommandHistoryState {
  commandHistory: Command[];
  undoneCommandHistory: Command[];
  pushCommand: (command: Command) => void;
  pushUndoCommand: (command: Command) => void;
  popCommand: () => void;
  popUndoCommand: () => void;
}

export const useCommandHistory = create<CommandHistoryState>((set, get) => ({
  commandHistory: [],
  undoneCommandHistory: [],
  pushUndoCommand: (command: Command) =>
    set(state => ({
      undoneCommandHistory: [...state.undoneCommandHistory, command],
    })),
  pushCommand: (command: Command) =>
    set(state => ({ commandHistory: [...state.commandHistory, command] })),
  popCommand: () => {
    const { commandHistory, pushUndoCommand } = get();
    const latestCommand = commandHistory[commandHistory.length - 1];
    set(state => ({
      commandHistory: state.commandHistory.slice(
        0,
        state.commandHistory.length - 1,
      ),
    }));
    if (latestCommand) {
      pushUndoCommand(latestCommand);
    }
  },
  popUndoCommand: () => {
    const { pushCommand, undoneCommandHistory } = get();
    const latestUndoCommand =
      undoneCommandHistory[undoneCommandHistory.length - 1];
    set(state => ({
      undoneCommandHistory: state.undoneCommandHistory.slice(
        0,
        state.undoneCommandHistory.length - 1,
      ),
    }));
    if (latestUndoCommand) {
      pushCommand(latestUndoCommand);
    }
  },
}));
