import { create } from 'zustand';
import { MoveableObject } from '../factories/MoveableObject';

interface ForceReloadLineController {
  _count: number;
  reload: () => void;
}

export const useForceReloadLineController = create<ForceReloadLineController>(
  (set, get) => ({
    _count: 0,
    reload: () => set(prev => ({ ...prev, _count: prev._count + 1 })),
  }),
);
