import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { MoveableBodyTextObject } from '@/app/lib/moveable/text/MoveableBodyText';
import { TEXT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/text';
import { OBJECT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/object';

interface MoveableTextProps {
  object: MoveableBodyTextObject;
  className?: string;
}

export const MoveableBodyTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  useEffect(() => {
    const textContainer = document.getElementById(
      `${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`,
    );
    if (!textContainer) return;

    // Create a new ResizeObserver instance
    let resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        object.onUpdateTransformDirection();
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
      className={clsx('absolute w-fit hidden text-[12px]', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <div
        className="w-full h-full"
        id={`${OBJECT_INNER_ELEMENTS.FLIPPER}-${object.id}`}
      >
        <ul
          id={`${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`}
          suppressContentEditableWarning
        >
          <li>Add a body text</li>
        </ul>
      </div>
    </div>
  );
};
