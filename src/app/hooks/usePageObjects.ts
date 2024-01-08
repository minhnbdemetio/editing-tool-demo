import { useMemo } from 'react';
import { useDesignObjects } from '../store/design-objects';
import { MoveableObject } from '../factories/MoveableObject';
import { useCurrentPage } from './useCurrentPage';

export const useCurrentPageObjects = () => {
  const { pageId } = useCurrentPage();
  const { designObjects, setDesignObjects } = useDesignObjects();

  return useMemo(
    () =>
      [
        designObjects[pageId]?.objects || [],
        (objects: MoveableObject[]) => setDesignObjects(pageId, objects),
      ] as const,
    [pageId, designObjects[pageId], setDesignObjects],
  );
};

export const usePageObjectsById = (pageId: string | null) => {
  const { designObjects, setDesignObjects } = useDesignObjects();

  return useMemo(() => {
    if (!pageId) {
      return [null, null];
    }
    return [
      designObjects[pageId]?.objects || [],
      (objects: MoveableObject[]) => setDesignObjects(pageId, objects),
    ] as const;
  }, [designObjects, pageId, setDesignObjects]);
};
