import { MoveableObject } from '@/app/lib/moveable/MoveableObject';
import { useActivePage } from '@/app/store/active-page';
import {
  calculateActualHeight,
  parseTransformString,
} from '@/app/utilities/utils';
import { FC, useEffect, useRef } from 'react';
import { useDesign } from '../store/design-objects';

interface LayerRenderProps {
  pageObject: MoveableObject;
  isChosen?: boolean;
}
export const LayerRender: FC<LayerRenderProps> = ({
  pageObject,
  isChosen = false,
}) => {
  const element = pageObject.getElement();
  const activePage = useActivePage();
  const containerRef = useRef<HTMLLIElement>(null);
  const { moveableTargets, setMoveableTargets } = useDesign();

  useEffect(() => {
    if (element && containerRef.current) {
      const transformString = parseTransformString(element.style.transform);
      pageObject.htmlString = element.outerHTML;
      const loadedElement = pageObject.createElementFromHtml();
      if (loadedElement instanceof HTMLElement) {
        loadedElement.style.transform = `rotate(${
          transformString.rotate
        }) scale(${48 / (calculateActualHeight(element) || 48)})`;
        while (containerRef.current?.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(loadedElement);
      }
    }
  }, [element, pageObject]);

  const handleClickSelect = (objectId: string) => {
    const objectWithId: HTMLElement | null = document.querySelector(
      `[id='${activePage?.activePage || ''}'] [id='${objectId}']`,
    );
    if (objectWithId) {
      if (isChosen) {
        if (isSelect(objectId)) {
          setMoveableTargets(
            moveableTargets?.filter(moveableTarget => {
              return moveableTarget.id !== objectId;
            }),
          );
        } else {
          setMoveableTargets([...moveableTargets, objectWithId]);
        }
      } else {
        setMoveableTargets([objectWithId]);
      }
    }
  };
  const isSelect = (id?: string) => {
    if (!id) return false;
    return moveableTargets
      ?.map(moveableTarget => {
        return moveableTarget.id;
      })
      .includes(id);
  };
  return (
    <li
      className={`h-12 w-full bg-[#35475a33] rounded-lg flex items-center justify-center my-1 relative cursor-pointer border-2 ${
        isSelect(element?.id) && 'border-indigo-900	'
      }`}
      key={element?.id || ''}
      ref={containerRef}
      onClick={() => handleClickSelect(element?.id || '')}
    ></li>
  );
};
