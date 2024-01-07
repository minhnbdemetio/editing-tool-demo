import { create } from 'zustand';
import { MoveableObject } from '../factories/MoveableObject';

interface ActiveMoveableObjectState {
  activeMoveableObject: MoveableObject | null;
  setActiveMoveableObject: (
    activeObject: MoveableObject | null | undefined,
  ) => any;
}

export const useActiveMoveableObject = create<ActiveMoveableObjectState>(
  set => ({
    activeMoveableObject: null,
    setActiveMoveableObject: (
      activeMoveableObject: MoveableObject | null | undefined,
    ) => set(() => ({ activeMoveableObject })),
  }),
);
