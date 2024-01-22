import { useEffect, useState } from 'react';
import { MoveableObject } from '../lib/moveable/MoveableObject';
import { useCurrentPage } from './useCurrentPage';
import { isElementLocked } from '../utilities/moveable';
import { OBJECT_CONTAINER } from '../lib/moveable/constant/object';

export const useLoadMoveableObject = (object: MoveableObject) => {
  const [objectLoaded, setObjectLoaded] = useState(false);
  const { pageId } = useCurrentPage();
  useEffect(() => {
    (async () => {
      const container = document.getElementById(
        `${OBJECT_CONTAINER}-${object.id}`,
      );
      if (!container || objectLoaded) return;
      const defaultElement = object.getElement();
      if (object.htmlString) {
        const loadedElement = object.createElementFromHtml();
        if (loadedElement) {
          container.appendChild(loadedElement);
        }
        defaultElement?.remove();
      } else {
        defaultElement?.classList.remove('hidden');
      }
      object.setPageId(pageId);
      object.setIsLocked(isElementLocked(object.getElement()));

      await object.setupMoveable();

      setObjectLoaded(true);
    })();
  }, [object, objectLoaded, pageId]);

  return { objectLoaded };
};
