import { create } from 'zustand';
import { MoveableObject } from '../factories/MoveableObject';
import Moveable from 'react-moveable';
interface DesignProperties {
  designObjects: Record<string, { objects: MoveableObject[] }>;
  setPageObjects: (pageId: string, objects: MoveableObject[]) => any;
  moveableTargets: Array<HTMLElement | SVGElement>;
  getMoveableTargets: () => Array<HTMLElement | SVGElement>;
  setMoveableTargets: (targets: Array<HTMLElement | SVGElement>) => any;
  moveable: Moveable | null;
  setMovable: (moveable: Moveable | null) => any;
  getAllObjects: () => MoveableObject[];
  getPageObjects: (pageId: string) => MoveableObject[];
}

export const useDesign = create<DesignProperties>((set, get) => ({
  moveableTargets: [],
  setMoveableTargets: (targets: Array<HTMLElement | SVGElement>) =>
    set(() => ({ moveableTargets: targets })),
  getMoveableTargets() {
    return get().moveableTargets;
  },
  designObjects: {},
  setPageObjects: (pageId: string, objects: MoveableObject[]) => {
    set(state => ({
      designObjects: { ...state.designObjects, [pageId]: { objects } },
    }));
  },
  getPageObjects: (pageId: string) => {
    return get().designObjects[pageId]?.objects || [];
  },
  moveable: null,
  setMovable(moveable) {
    set({ moveable });
  },
  getAllObjects: () => {
    const pageObjects = Object.values(get().designObjects);
    let allObjects: MoveableObject[] = [];
    pageObjects.forEach(page => {
      allObjects = [...allObjects, ...page.objects];
    });
    return allObjects;
  },
}));
