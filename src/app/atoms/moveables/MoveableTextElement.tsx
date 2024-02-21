import { FC, useEffect } from 'react';

import { MoveableTextObject } from '@/app/lib/moveable/text/MoveableText';
import clsx from 'clsx';
import { TEXT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/text';
import { OBJECT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/object';
import { useDesign } from '@/app/store/design-objects';
import { removeAllChildStyles } from '@/app/utilities/dom';

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

    // remove all auto-generated style from contenteditable
    textContainer.addEventListener('input', () => {
      removeAllChildStyles(textContainer);
    });

    // Create a new ResizeObserver instance
    let resizeObserver = new ResizeObserver(entries => {
      const element = object.getElement();
      if (!element) return;
      element.style.width = window.getComputedStyle(textContainer).width;
      element.style.height = window.getComputedStyle(textContainer).height;

      if (object.getPreviousSize().height !== textContainer.clientHeight) {
        object.onUpdateTransformDirection();
      }

      object.setPreviousSize({
        width: textContainer.clientWidth,
        height: textContainer.clientHeight,
      });
      if (!object.getResizingStatus()) {
        moveable?.updateRect();
      }
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
      className={clsx('absolute w-fit', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <div
        className="w-full h-full"
        id={`${OBJECT_INNER_ELEMENTS.FLIPPER}-${object.id}`}
      >
        <ul
          id={`${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`}
          suppressContentEditableWarning
          className="w-full break-words whitespace-break-spaces"
        >
          <li>{object.text}</li>
        </ul>
      </div>
    </div>
  );
};
