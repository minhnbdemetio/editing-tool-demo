import { renderHook } from '@testing-library/react';
import { useEditablePages } from '../store/editable-pages';
import { useCurrentPage } from './useCurrentPage';
import { useCurrentPageCanvas, usePageCanvasById } from './usePageCanvas';

jest.mock('./useCurrentPage');
jest.mock('../store/editable-pages');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn().mockImplementation((callback: any) => callback),
  useMemo: jest.fn().mockImplementation((callback, deps) => callback()),
}));

describe('Test useCurrentPageCanvas', () => {
  test('Should return value', () => {
    const randomPageId = 'someId';
    (useCurrentPage as jest.Mock).mockReturnValueOnce({ pageId: randomPageId });
    const pageCanvasMockValue = 'someCanvas';
    const setPageCanvasMockValue = jest.fn();
    const useEditablePagesMockValue = {
      pages: { [randomPageId]: pageCanvasMockValue },
      setPageCanvas: setPageCanvasMockValue,
    };
    (useEditablePages as unknown as jest.Mock).mockReturnValueOnce(
      useEditablePagesMockValue,
    );
    const { result } = renderHook(() => useCurrentPageCanvas());
    expect(result.current[0]).toBe(pageCanvasMockValue);
    expect(typeof result.current[1]).toBe('function');
  });
});

describe('Test usePageCanvasJSON', () => {
  test('Should return value', async () => {
    const mockJSON = { version: '5.3.0', objects: [] };

    const { factory } = await import('./usePageCanvas');
    jest
      .spyOn(factory, 'useCurrentPageCanvas')
      .mockReturnValueOnce([{ toJSON: () => mockJSON }] as any);
    expect(factory.usePageCanvasJSON()).toEqual(mockJSON);
  });
});

describe('Test usePageCanvasById', () => {
  test('Should return value', () => {
    const randomPageId = 'someId';
    (useCurrentPage as jest.Mock).mockReturnValueOnce({ pageId: randomPageId });
    const pageCanvasMockValue = 'someCanvas';
    const setPageCanvasMockValue = jest.fn();
    const useEditablePagesMockValue = {
      pages: { [randomPageId]: pageCanvasMockValue },
      setPageCanvas: setPageCanvasMockValue,
    };
    (useEditablePages as unknown as jest.Mock).mockReturnValueOnce(
      useEditablePagesMockValue,
    );
    const { result } = renderHook(() => usePageCanvasById(randomPageId));
    console.log({ result });
    expect(result.current[0]).toBe(pageCanvasMockValue);
    expect(typeof result.current[1]).toBe('function');
  });

  test('Should return null if pageId is null', () => {
    const randomPageId = null;
    (useCurrentPage as jest.Mock).mockReturnValueOnce({ pageId: randomPageId });
    const pageCanvasMockValue = 'someCanvas';
    const setPageCanvasMockValue = jest.fn();
    const useEditablePagesMockValue = {
      pages: {},
      setPageCanvas: setPageCanvasMockValue,
    };
    (useEditablePages as unknown as jest.Mock).mockReturnValueOnce(
      useEditablePagesMockValue,
    );
    const { result } = renderHook(() => usePageCanvasById(randomPageId));
    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(null);
  });
});

describe('Test usePageCanvasJSONById', () => {
  test('Should return value', async () => {
    const mockJSON = { version: '5.3.0', objects: [] };

    const { factory } = await import('./usePageCanvas');
    jest
      .spyOn(factory, 'usePageCanvasById')
      .mockReturnValueOnce([{ toJSON: () => mockJSON }] as any);
    expect(factory.usePageCanvasJSONById('someId')).toEqual(mockJSON);
  });
});

describe('Test useLoadPageCanvasState', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Should return value', async () => {
    const { factory } = await import('./usePageCanvas');
    const mockLoadFromJSON = jest
      .fn()
      .mockImplementation((canvas: any, callback) => callback());
    const mockRenderAll = jest.fn();
    jest
      .spyOn(factory, 'usePageCanvasById')
      .mockReturnValueOnce([
        { loadFromJSON: mockLoadFromJSON, renderAll: mockRenderAll },
      ] as any);
    const loadPageCanvasFunction = factory.useLoadPageCanvasState('someId');
    const mockJSON = { version: '5.3.0', objects: [] };
    loadPageCanvasFunction(mockJSON);
    expect(mockLoadFromJSON).toHaveBeenCalled();
    expect(mockRenderAll).toHaveBeenCalled();
  });
});
