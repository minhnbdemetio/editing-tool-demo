import { create } from 'zustand';

interface PagesState {
  pages: Record<string, fabric.Canvas | null>;
  setPages: (pages: Record<string, fabric.Canvas | null>) => any;
  addBlankPage: (pageId: string) => any;
  setPageCanvas: (pageId: string, canvas: fabric.Canvas | null) => any;
  getPageCanvas: (pageId: string) => fabric.Canvas | null;
}

export const usePages = create<PagesState>((set, get) => ({
  pages: {},
  setPages: (pages: Record<string, fabric.Canvas | null>) =>
    set(() => ({ pages })),
  addBlankPage: (pageId: string) =>
    set(state => ({ pages: { ...state.pages, [pageId]: null } })),
  setPageCanvas: (pageId: string, canvas: fabric.Canvas | null) =>
    set(state => ({ pages: { ...state.pages, [pageId]: canvas } })),
  getPageCanvas: pageId => get().pages[pageId],
}));
