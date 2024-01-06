import { useMemo } from 'react';
import { useDesignObjects } from '../store/design-objects';
import { MoveableObject } from '../factories/MoveableObject';
import { useCurrentPage } from './useCurrentPage';

export const useCurrentPageObject = () => {
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
