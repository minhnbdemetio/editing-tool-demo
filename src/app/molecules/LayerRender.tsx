import { MoveableObject } from '@/app/factories/MoveableObject';
import { useActivePage } from '@/app/store/active-page';
import { parseTransformString } from '@/app/utilities/utils';
import { FC, useEffect, useRef } from 'react';
import { useDesign } from '../store/design-objects';

interface LayerRenderProps {
  pageObject: MoveableObject;
}
export const LayerRender: FC<LayerRenderProps> = ({ pageObject }) => {
  const element = pageObject.getElement();
  const activePage = useActivePage();
  const containerRef = useRef<HTMLLIElement>(null);
  const { moveableTargets, setMoveableTargets, getAllObjects, setMovable } =
    useDesign();

  useEffect(() => {
    if (element && containerRef.current) {
      const transformString = parseTransformString(element.style.transform);
      const elementString = transformString.translate
        ? element.outerHTML.replaceAll(
            transformString.translate,
            'translate(0px, 0px)',
          )
        : element.outerHTML;
      pageObject.htmlString = elementString;
      const loadedElement = pageObject.createElementFromHtmlString();
      if (loadedElement) {
        (loadedElement as HTMLElement).style.transform += ` scale(${
          48 / element.getBoundingClientRect().height
        })`;
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
      setMoveableTargets([objectWithId]);
    }
  };

  return (
    <li
      className={`h-12 w-full bg-[#35475a33] rounded-lg flex items-center justify-center my-1 relative`}
      key={element?.id || ''}
      ref={containerRef}
      onClick={() => handleClickSelect(element?.id || '')}
    ></li>
  );
};
