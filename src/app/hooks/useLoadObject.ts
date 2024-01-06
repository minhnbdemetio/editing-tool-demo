import { RefObject, useEffect } from 'react';
import { MoveableObject } from '../factories/MoveableObject';

export const useLoadMoveableObject = (
  containerRef: RefObject<HTMLDivElement>,
  defaultElementRef: RefObject<HTMLElement>,
  object: MoveableObject,
) => {
  useEffect(() => {
    if (!containerRef.current || !defaultElementRef.current) return;
    if (object.htmlString) {
      const loadedElement = object.createElementFromHtmlString();
      if (loadedElement) {
        containerRef.current.appendChild(loadedElement);
      }
      defaultElementRef.current.remove();
    } else {
      defaultElementRef.current.classList.remove('hidden');
    }
    object.createMoveable(containerRef.current);
  }, [containerRef, defaultElementRef, object]);
};
