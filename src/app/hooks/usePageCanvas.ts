import { useEditablePages } from '@/app/store/editable-pages';
import { useCurrentPage } from './useCurrentPage';

export const useCurrentPageCanvas = () => {
  const currentPage = useCurrentPage();
  const { getPageCanvas, setPageCanvas } = useEditablePages();
  return [
    getPageCanvas(currentPage.pageId),
    (canvas: fabric.Canvas | null) => setPageCanvas(currentPage.pageId, canvas),
  ] as const;
};

export const usePageCanvasById = (pageId: string) => {
  const { getPageCanvas, setPageCanvas } = useEditablePages();
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

  return (canvasState: { version: string; objects: Object[] } | undefined) =>
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
