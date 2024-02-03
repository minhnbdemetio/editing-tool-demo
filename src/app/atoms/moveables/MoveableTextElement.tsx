import { FC, useEffect } from 'react';

import { MoveableTextObject } from '@/app/lib/moveable/text/MoveableText';
import clsx from 'clsx';
import { TEXT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/text';
import { OBJECT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/object';
import { useDesign } from '@/app/store/design-objects';

interface MoveableTextProps {
  object: MoveableTextObject;
  className?: string;
}

export const MoveableTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  const { moveable } = useDesign();

  useEffect(() => {
    const textContainer = document.getElementById(
      `${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`,
    );
    if (!textContainer) return;

    // Create a new ResizeObserver instance
    let resizeObserver = new ResizeObserver(entries => {
      const element = object.getElement();
      if (!element) return;
      element.style.width = `${textContainer.clientWidth}px`;
      element.style.height = `${textContainer.clientHeight}px`;

      if (object.getPreviousSize().height !== textContainer.clientHeight) {
        object.onUpdateTransformDirection();
      }

      object.setPreviousSize({
        width: textContainer.clientWidth,
        height: textContainer.clientHeight,
      });

      moveable?.updateRect();
    });

    // Start observing the div element
    resizeObserver.observe(textContainer);

    // Cleanup function
    return () => {
      if (resizeObserver && textContainer) {
        resizeObserver.unobserve(textContainer);
      }
    };
  }, []);

  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit break-words', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <div
        className="w-full h-full"
        id={`${OBJECT_INNER_ELEMENTS.FLIPPER}-${object.id}`}
      >
        <ul
          className="w-fit"
          id={`${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`}
          suppressContentEditableWarning
        >
          <li>Add a heading</li>
        </ul>
      </div>
    </div>
  );
};