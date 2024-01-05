import { useEditablePages } from '@/app/store/editable-pages';
import { CanvasData } from '../types';
import { useCurrentPage } from './useCurrentPage';
import { useCallback, useMemo } from 'react';

export const useCurrentPageCanvas = () => {
  const currentPage = useCurrentPage();
  const { setPageCanvas, pages } = useEditablePages();
  return useMemo(
    () =>
      [
        pages[currentPage.pageId],
        (canvas: fabric.Canvas | null) =>
          setPageCanvas(currentPage.pageId, canvas),
      ] as const,
    [currentPage.pageId, pages, setPageCanvas],
  );
};

export const usePageCanvasJSON = () => {
  const [currentPage] = factory.useCurrentPageCanvas();

  return useMemo(() => currentPage?.toJSON(), [currentPage]);
};

export const usePageCanvasById = (pageId: string | null) => {
  const { getPageCanvas, setPageCanvas } = useEditablePages();
  return useMemo(() => {
    if (!pageId) return [null, null];

    return [
      getPageCanvas(pageId),
      (canvas: fabric.Canvas | null) => setPageCanvas(pageId, canvas),
    ] as const;
  }, [getPageCanvas, pageId, setPageCanvas]);
};

export const usePageCanvasJSONById = (pageId: string) => {
  const [currentPageCanvas] = factory.usePageCanvasById(pageId);

  return useMemo(() => currentPageCanvas?.toJSON(), [currentPageCanvas]);
};

export const useLoadPageCanvasState = (pageId: string) => {
  const [currentPage] = factory.usePageCanvasById(pageId);

  return useCallback(
    (canvasState: CanvasData | undefined) =>
      currentPage?.loadFromJSON(canvasState, () => {
        currentPage.renderAll();
      }),
    [currentPage],
  );
};

export const factory = {
  usePageCanvasJSON,
  useCurrentPageCanvas,
  usePageCanvasById,
  usePageCanvasJSONById,
  useLoadPageCanvasState,
};
