import { useActivePage } from '../store/active-page';
import { usePageCanvasById } from './usePageCanvas';

export const useActivePageCanvas = () => {
  const { activePage } = useActivePage();

  const [pageCanvas] = usePageCanvasById(activePage);

  return pageCanvas;
};
