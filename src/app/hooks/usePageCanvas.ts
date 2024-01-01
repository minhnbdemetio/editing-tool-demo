import { useEditablePages } from '@/app/store/editable-pages';
import { useCurrentPage } from './useCurrentPage';
import { CanvasData } from '../types';

export const useCurrentPageCanvas = () => {
  const currentPage = useCurrentPage();
  const { getPageCanvas, setPageCanvas } = useEditablePages();
  return [
    getPageCanvas(currentPage.pageId),
    (canvas: fabric.Canvas | null) => setPageCanvas(currentPage.pageId, canvas),
  ] as const;
};

export const usePageCanvasById = (pageId: string | null) => {
  const { getPageCanvas, setPageCanvas } = useEditablePages();
  if (!pageId) return [null, null];
  return [
    getPageCanvas(pageId),
    (canvas: fabric.Canvas | null) => setPageCanvas(pageId, canvas),
  ] as const;
};

export const usePageCanvasJSON = () => {
  const [currentPage] = factory.useCurrentPageCanvas();

  return currentPage?.toJSON();
};

export const usePageCanvasJSONById = (pageId: string) => {
  const [currentPage] = factory.usePageCanvasById(pageId);

  return currentPage?.toJSON();
};

export const useLoadPageCanvasState = (pageId: string) => {
  const [currentPage] = factory.usePageCanvasById(pageId);

  return (canvasState: CanvasData | undefined) =>
    currentPage?.loadFromJSON(canvasState, () => {
      currentPage.renderAll();
    });
};

export const factory = {
  useCurrentPageCanvas,
  usePageCanvasJSON,
  usePageCanvasById,
  usePageCanvasJSONById,
  useLoadPageCanvasState,
};
