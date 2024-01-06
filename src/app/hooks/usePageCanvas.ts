import { useEditablePages } from '@/app/store/editable-pages';
import { CanvasData } from '../types';
import { useCurrentPage } from './useCurrentPage';
import { useCallback, useMemo } from 'react';

export const useCurrentPageCanvas = () => {
  const currentPage = useCurrentPage();
  const { setPageCanvas, pages } = useEditablePages();
  return [
    pages[currentPage.pageId],
    (canvas: fabric.Canvas | null) => setPageCanvas(currentPage.pageId, canvas),
  ] as const;
};

export const usePageCanvasJSON = () => {
  const [currentPage] = factory.useCurrentPageCanvas();

  return useMemo(() => currentPage?.toJSON(), [currentPage]);
};

export const usePageCanvasById = (pageId: string | null) => {
  const { pages, setPageCanvas } = useEditablePages();

  if (!pageId) return [null, null];

  return [
    pages[pageId],
    (canvas: fabric.Canvas | null) => setPageCanvas(pageId, canvas),
  ] as const;
};

export const usePageCanvasJSONById = (pageId: string) => {
  const [currentPageCanvas] = factory.usePageCanvasById(pageId);

  return currentPageCanvas?.toJSON();
};

export const useLoadPageCanvasState = (pageId: string) => {
  const [currentPage] = factory.usePageCanvasById(pageId);

  return (canvasState: CanvasData | undefined) =>
    currentPage?.loadFromJSON(canvasState, () => {
      currentPage.renderAll();
    });
};

export const factory = {
  usePageCanvasJSON,
  useCurrentPageCanvas,
  usePageCanvasById,
  usePageCanvasJSONById,
  useLoadPageCanvasState,
};
