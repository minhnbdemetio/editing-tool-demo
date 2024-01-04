import { create } from 'zustand';

interface ActivePageState {
  activePage: string | null;
  setActivePage: (pageId: string | null) => any;
}

export const useActivePage = create<ActivePageState>(set => ({
  activePage: null,
  setActivePage: (pageId: string | null) => set(() => ({ activePage: pageId })),
}));
