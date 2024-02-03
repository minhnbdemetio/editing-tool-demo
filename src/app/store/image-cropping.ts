import { create } from 'zustand';

interface imageCropping {
  isCropping: boolean;
  setCropping: (isCropping: boolean) => void;
}

export const useImageCropping = create<imageCropping>(set => ({
  isCropping: false,
  setCropping(isCropping) {
    set({ isCropping });
  },
}));
