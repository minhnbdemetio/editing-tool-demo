import { useCallback, useMemo } from 'react';
import { useDesign } from '../store/design-objects';
import { MoveableObject } from '../factories/MoveableObject';
import { useCurrentPage } from './useCurrentPage';
import { useActivePage } from '../store/active-page';

export const useCurrentPageObjects = () => {
  const { pageId } = useCurrentPage();
  const { designObjects, setPageObjects: setDesignObjects } = useDesign();

  return useMemo(
    () =>
      [
        designObjects[pageId]?.objects || [],
        (objects: MoveableObject[]) => setDesignObjects(pageId, objects),
      ] as const,
    [designObjects, pageId, setDesignObjects],
  );
};

export const useAddObjectToCurrentPage = (object: MoveableObject) => {
  const [pageObjects, setPageObjects] = useCurrentPageObjects();

  return useCallback(() => {
    setPageObjects([...pageObjects, object]);
  }, [object, pageObjects, setPageObjects]);
};

export const usePageObjectsById = (pageId: string | null) => {
  const { designObjects, setPageObjects: setDesignObjects } = useDesign();

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

export const useAddObjectToPage = (pageId: string | null) => {
  const [pageObjects, setPageObjects] = usePageObjectsById(pageId);

  return useCallback(
    (object: MoveableObject) => {
      if (!pageObjects || !setPageObjects) return;
      setPageObjects([...pageObjects, object]);
    },
    [pageObjects, setPageObjects],
  );
};

export const useAddObjectToActivePage = () => {
  const { activePage } = useActivePage();
  const addObjectToPageFunc = useAddObjectToPage(activePage);

  return useCallback(
    (object: MoveableObject) => addObjectToPageFunc(object),
    [addObjectToPageFunc],
  );
};
