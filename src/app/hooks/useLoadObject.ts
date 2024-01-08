import { RefObject, useEffect, useState } from 'react';
import { MoveableObject } from '../factories/MoveableObject';

export const useLoadMoveableObject = (
  containerRef: RefObject<HTMLDivElement>,
  object: MoveableObject,
) => {
  const [objectLoaded, setObjectLoaded] = useState(false);
  useEffect(() => {
    if (!containerRef.current || objectLoaded) return;
    const defaultElement = object.getElement();
    if (object.htmlString) {
      const loadedElement = object.createElementFromHtmlString();
      if (loadedElement) {
        containerRef.current.appendChild(loadedElement);
      }
      defaultElement?.remove();
    } else {
      defaultElement?.classList.remove('hidden');
    }
    object.createMoveable(containerRef.current);
    setObjectLoaded(true);
  }, [containerRef, object, objectLoaded]);

  return { objectLoaded };
};
