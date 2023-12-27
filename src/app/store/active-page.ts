import { create } from 'zustand';

interface ActivePageState {
  activePage: Record<string, fabric.Canvas | null | string>;
  setActivePage: (canvas: fabric.Canvas | null, activePageId: string) => any;
}

export const useActivePage = create<ActivePageState>(set => ({
  activePage: {},
  setActivePage: (canvas: fabric.Canvas | null, activePageId: string) =>
    set(() => ({ activePage: { canvas: canvas, id: activePageId } })),
}));
