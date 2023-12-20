import { useEditablePages } from '@/app/store/editable-pages';
import { useCurrentPage } from './useCurrentPage';

export const usePageCanvas = () => {
  const currentPage = useCurrentPage();
  const { getPageCanvas, setPageCanvas } = useEditablePages();
  return [
    getPageCanvas(currentPage.pageId),
    (canvas: fabric.Canvas | null) => setPageCanvas(currentPage.pageId, canvas),
  ] as const;
};
