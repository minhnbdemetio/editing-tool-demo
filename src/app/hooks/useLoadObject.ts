import { useEffect, useState } from 'react';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { useCurrentPage } from './useCurrentPage';

export const useLoadMoveableObject = (object: MoveableObject) => {
  const [objectLoaded, setObjectLoaded] = useState(false);
  const { pageId } = useCurrentPage();
  useEffect(() => {
    (async () => {
      object.setPageId(pageId);
      await object.setupMoveable();
      object.render();
      setObjectLoaded(true);
    })();
  }, [object, objectLoaded, pageId]);

  return { objectLoaded };
};
