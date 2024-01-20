import { create } from 'zustand';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import Moveable from 'react-moveable';

const DEFAULT_PAGE_SCALE = 1;

interface DesignProperties {
  designObjects: Record<string, { objects: MoveableObject[] }>;
  setDesignObjects: (
    designObjects: Record<string, { objects: MoveableObject[] }>,
  ) => any;
  getDesignObjects: () => Record<string, { objects: MoveableObject[] }>;
  setPageObjects: (pageId: string, objects: MoveableObject[]) => any;
  moveableTargets: Array<HTMLElement | SVGElement>;
  getMoveableTargets: () => Array<HTMLElement | SVGElement>;
  setMoveableTargets: (targets: Array<HTMLElement | SVGElement>) => any;
  moveable: Moveable | null;
  setMovable: (moveable: Moveable | null) => any;
  getAllObjects: () => MoveableObject[];
  getPageObjects: (pageId: string) => MoveableObject[];
  scale: number;
  setScale: (scale: number) => any;
}

export const useDesign = create<DesignProperties>((set, get) => ({
  moveableTargets: [],
  setMoveableTargets: (targets: Array<HTMLElement | SVGElement>) =>
    set(() => ({ moveableTargets: targets })),
  getMoveableTargets() {
    return get().moveableTargets;
  },
  designObjects: {},
  setDesignObjects(designObjects) {
    set({ designObjects });
  },
  getDesignObjects() {
    return get().designObjects;
  },
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
  scale: DEFAULT_PAGE_SCALE,
  setScale(scale) {
    set({ scale });
  },
}));
