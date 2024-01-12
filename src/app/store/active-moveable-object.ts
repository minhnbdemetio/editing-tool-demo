import { create } from 'zustand';
import { MoveableObject } from '../factories/MoveableObject';

interface ActiveMoveableObjectState {
  activeMoveableObject: MoveableObject | null;
  setActiveMoveableObject: (
    activeObject: MoveableObject | null | undefined,
  ) => any;
  getActiveMoveableObject: () => MoveableObject | null;
}

export const useActiveMoveableObject = create<ActiveMoveableObjectState>(
  (set, get) => ({
    activeMoveableObject: null,
    setActiveMoveableObject: (
      activeMoveableObject: MoveableObject | null | undefined,
    ) => set(() => ({ activeMoveableObject })),
    getActiveMoveableObject: () => get().activeMoveableObject,
  }),
);
