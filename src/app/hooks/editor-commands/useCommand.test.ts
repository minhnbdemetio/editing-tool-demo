import { useCommandHistory } from '@/app/store/editor-command-history';
import {
  useLoadPageCanvasState,
  usePageCanvasJSONById,
} from '../usePageCanvas';
import {
  useExecuteCommand,
  useRedoCommand,
  useUndoCommand,
} from './useCommand';
import { useCurrentPage } from '../useCurrentPage';
import { useActivePageCanvasJSON } from '../useActivePage';
import { useActivePage } from '@/app/store/active-page';

jest.mock('../../store/editor-command-history');
jest.mock('../usePageCanvas');
jest.mock('../useCurrentPage');
jest.mock('../useActivePage');
jest.mock('../../store/active-page');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn().mockImplementation((callback: any) => callback),
  useRef: jest.fn().mockImplementation((value: any) => value),
}));

describe('Test useUndoCommand', () => {
  test('Should run if there are executed commands', () => {
    const popCommandMock = jest.fn();
    const pushUndoCommandMock = jest.fn();
    (useCommandHistory as unknown as jest.Mock).mockReturnValueOnce({
      commandHistory: [
        {
          pageId: 'someId',
          currentStateJSON: { version: '5.3.0', objects: [] },
        },
      ],
      popCommand: popCommandMock,
      pushUndoCommand: pushUndoCommandMock,
    });
    const loadCanvasMock = jest.fn();

    (useLoadPageCanvasState as jest.Mock).mockReturnValueOnce(loadCanvasMock);
    (usePageCanvasJSONById as jest.Mock).mockReturnValueOnce(jest.fn());

    const undoFunction = useUndoCommand();
    undoFunction();
    expect(loadCanvasMock).toHaveBeenCalled();
    expect(popCommandMock).toHaveBeenCalled();
    expect(pushUndoCommandMock).toHaveBeenCalled();
  });

  test('Should not run if there are no executed commands', () => {
    const popCommandMock = jest.fn();
    const pushUndoCommandMock = jest.fn();
    (useCommandHistory as unknown as jest.Mock).mockReturnValueOnce({
      commandHistory: [],
      popCommand: popCommandMock,
      pushUndoCommand: pushUndoCommandMock,
    });
    const loadCanvasMock = jest.fn();

    (useLoadPageCanvasState as jest.Mock).mockReturnValueOnce(loadCanvasMock);
    (usePageCanvasJSONById as jest.Mock).mockReturnValueOnce(jest.fn());

    const undoFunction = useUndoCommand();
    undoFunction();
    expect(loadCanvasMock).toHaveBeenCalledTimes(0);
    expect(popCommandMock).toHaveBeenCalledTimes(0);
    expect(pushUndoCommandMock).toHaveBeenCalledTimes(0);
  });
});

describe('Test useRedoCommand', () => {
  test('Should run if there are executed commands', () => {
    const popUndoCommandMock = jest.fn();
    const pushCommandMock = jest.fn();
    (useCommandHistory as unknown as jest.Mock).mockReturnValueOnce({
      undoneCommandHistory: [
        {
          pageId: 'someId',
          currentStateJSON: { version: '5.3.0', objects: [] },
        },
      ],
      popUndoCommand: popUndoCommandMock,
      pushCommand: pushCommandMock,
    });
    const loadCanvasMock = jest.fn();

    (useLoadPageCanvasState as jest.Mock).mockReturnValueOnce(loadCanvasMock);

    const redoFunction = useRedoCommand();
    redoFunction();
    expect(loadCanvasMock).toHaveBeenCalled();
    expect(popUndoCommandMock).toHaveBeenCalled();
    expect(pushCommandMock).toHaveBeenCalled();
  });

  test('Should not run if there are no executed commands', () => {
    const popUndoCommandMock = jest.fn();
    const pushCommandMock = jest.fn();
    (useCommandHistory as unknown as jest.Mock).mockReturnValueOnce({
      undoneCommandHistory: [],
      popUndoCommand: popUndoCommandMock,
      pushCommand: pushCommandMock,
    });
    const loadCanvasMock = jest.fn();

    (useLoadPageCanvasState as jest.Mock).mockReturnValueOnce(loadCanvasMock);

    const redoFunction = useRedoCommand();
    redoFunction();
    expect(loadCanvasMock).toHaveBeenCalledTimes(0);
    expect(popUndoCommandMock).toHaveBeenCalledTimes(0);
    expect(pushCommandMock).toHaveBeenCalledTimes(0);
  });
});

describe('Test useExecuteCommand', () => {
  test('Should run command function and push a new command tot command history', () => {
    const pushCommandMock = jest.fn();
    (useCommandHistory as unknown as jest.Mock).mockReturnValueOnce({
      pushCommand: pushCommandMock,
    });
    const loadCanvasMock = jest.fn();

    (useActivePageCanvasJSON as jest.Mock).mockReturnValueOnce(loadCanvasMock);
    (useCurrentPage as jest.Mock).mockReturnValueOnce({ pageId: 'someId' });
    (useActivePage as unknown as jest.Mock).mockReturnValueOnce({
      activePage: 'someId',
    });
    const commandFunction = jest.fn();

    const executeCommandFunction = useExecuteCommand(commandFunction);
    executeCommandFunction();
    expect(commandFunction).toHaveBeenCalled();
    expect(pushCommandMock).toHaveBeenCalled();
  });
});
