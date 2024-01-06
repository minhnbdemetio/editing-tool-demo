import { RefObject } from 'react';
import { create } from 'zustand';
import { MoveableObject } from '../factories/MoveableObject';

interface DesignObjects {
  designObjects: Record<string, { objects: MoveableObject[] }>;
  setDesignObjects: (pageId: string, objects: MoveableObject[]) => any;
}

export const useDesignObjects = create<DesignObjects>(set => ({
  designObjects: {},
  setDesignObjects: (pageId: string, objects: MoveableObject[]) =>
    set(state => ({
      designObjects: { ...state.designObjects, [pageId]: { objects } },
    })),
}));
