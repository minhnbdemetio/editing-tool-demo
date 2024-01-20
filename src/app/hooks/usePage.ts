import { useCallback, useMemo } from 'react';
import { useDesign } from '../store/design-objects';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { v4 } from 'uuid';

export const usePages = () => {
  const design = useDesign();
  return useMemo(
    () => Object.keys(design.designObjects),
    [design.designObjects],
  );
};

export const useAddPage = () => {
  const { getDesignObjects, setDesignObjects } = useDesign();
  return useCallback(
    (pageObjects: MoveableObject[]) => {
      const pageId = v4();
      const designObjects = getDesignObjects();
      setDesignObjects({
        ...designObjects,
        [pageId]: { objects: pageObjects },
      });
    },
    [getDesignObjects, setDesignObjects],
  );
};

export const useClonePage = () => {
  const addPage = useAddPage();
  const { getPageObjects } = useDesign();

  return useCallback(
    (pageId: string | null) => {
      if (!pageId) return;
      const currentPageObjects = getPageObjects(pageId).map(pageObject =>
        pageObject.clone(),
      );
      addPage(currentPageObjects);
    },
    [addPage, getPageObjects],
  );
};
