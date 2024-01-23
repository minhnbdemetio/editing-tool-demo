import { FC, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { MoveableBodyTextObject } from '@/app/lib/moveable/text/MoveableBodyText';
import { TEXT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/text';

interface MoveableTextProps {
  object: MoveableBodyTextObject;
  className?: string;
}

export const MoveableBodyTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  const textContainerRef = useRef(null);
  useEffect(() => {
    const textContainer = textContainerRef.current;
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
      if (textContainer) {
        (textContainer as HTMLInputElement).removeEventListener(
          'input',
          object.onUpdateBackgroundEffect.bind(object),
        );
      }
    };
  }, []);
  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit hidden text-sm', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <ul
        ref={textContainerRef}
        id={`${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`}
        suppressContentEditableWarning
        contentEditable
      >
        <li>Add a body text</li>
      </ul>
    </div>
  );
};
