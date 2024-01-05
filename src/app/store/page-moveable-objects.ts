import { RefObject } from 'react';
import { create } from 'zustand';

interface PageMoveableObjects {
  pageObjects: Record<string, RefObject<HTMLDivElement>[]>;
  setPageObjects: (pageId: string, objects: RefObject<HTMLDivElement>[]) => any;
}

export const usePageMoveableObjects = create<PageMoveableObjects>(set => ({
  pageObjects: {},
  setPageObjects: (pageId: string, objects: RefObject<HTMLDivElement>[]) =>
    set(state => ({
      pageObjects: { ...state.pageObjects, [pageId]: objects },
    })),
}));
