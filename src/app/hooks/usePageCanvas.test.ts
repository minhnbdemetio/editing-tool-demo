import { renderHook } from '@testing-library/react';
import { useEditablePages } from '../store/editable-pages';
import { useCurrentPage } from './useCurrentPage';
import { useCurrentPageCanvas } from './usePageCanvas';

jest.mock('./useCurrentPage');
jest.mock('../store/editable-pages');

describe('Test usePageCanvas', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Should return value', () => {
    const randomPageId = 'someId';
    (useCurrentPage as jest.Mock).mockReturnValueOnce({ pageId: randomPageId });
    const pageCanvasMockValue = 'someCanvas';
    const setPageCanvasMockValue = jest.fn();
    const useEditablePagesMockValue = {
      getPageCanvas: () => pageCanvasMockValue,
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
