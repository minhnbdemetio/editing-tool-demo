import { create } from 'zustand';

interface States {
  isEnabledSelectMultiple: boolean;
  activePages: string[];
  setIsEnabledSelectMultiple: (state: boolean) => void;
  setActivePages: (pages: string[]) => void;
}

export const useSelectMultiplePages = create<States>(set => ({
  isEnabledSelectMultiple: false,
  activePages: [],
  setIsEnabledSelectMultiple: (state: boolean) =>
    set(() => ({ isEnabledSelectMultiple: state })),
  setActivePages: (pages: string[]) => set(() => ({ activePages: pages })),
}));
