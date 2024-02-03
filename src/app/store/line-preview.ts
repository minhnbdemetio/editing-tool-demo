import { create } from 'zustand';

interface LinePreviewState {
  lineEnabled: boolean;
  setLineEnabled: (value: boolean) => any;
}

export const useLineEnabled = create<LinePreviewState>(set => ({
  lineEnabled: false,
  setLineEnabled: (value: boolean) => set(() => ({ lineEnabled: value })),
}));
