import { useEffect, useState } from 'react';
import { MoveableObject } from '../factories/MoveableObject';
import { useCurrentPage } from './useCurrentPage';
import { isElementLocked } from '../utilities/moveable';
import { OBJECT_CONTAINER } from '../constants/moveable';

export const useLoadMoveableObject = (object: MoveableObject) => {
  const [objectLoaded, setObjectLoaded] = useState(false);
  const { pageId } = useCurrentPage();
  useEffect(() => {
    const container = document.getElementById(
      `${OBJECT_CONTAINER}-${object.id}`,
    );
    if (!container || objectLoaded) return;
    const defaultElement = object.getElement();
    if (object.htmlString) {
      const loadedElement = object.createElementFromHtmlString();
      if (loadedElement) {
        container.appendChild(loadedElement);
      }
      defaultElement?.remove();
    } else {
      defaultElement?.classList.remove('hidden');
    }
    object.setupMoveable();
    object.setPageId(pageId);
    object.setIsLocked(isElementLocked(object.getElement()));
    setObjectLoaded(true);
  }, [object, objectLoaded, pageId]);

  return { objectLoaded };
};
