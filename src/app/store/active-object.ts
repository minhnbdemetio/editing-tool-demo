import { create } from 'zustand';

interface ActiveObjectState {
  activeObject: fabric.Object | null | undefined;
  setActiveObject: (activeObject: fabric.Object | null | undefined) => any;
}

export const useActiveObject = create<ActiveObjectState>(set => ({
  activeObject: null,
  setActiveObject: (activeObject: fabric.Object | null | undefined) =>
    set(() => ({ activeObject })),
}));
