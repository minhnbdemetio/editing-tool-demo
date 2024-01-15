import { FC, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { MoveableSubheadingTextObject } from '@/app/factories/MoveableSubheadingText';
import { TEXT_CONTAINER } from '@/app/constants/moveable';

interface MoveableTextProps {
  object: MoveableSubheadingTextObject;
  className?: string;
}

export const MoveableSubheadingTextElement: FC<MoveableTextProps> = ({
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
    };
  }, []);
  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit hidden text-md', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <ul
        ref={textContainerRef}
        id={`${TEXT_CONTAINER}${object.id}`}
        suppressContentEditableWarning
        contentEditable
      >
        <li>Add a subheading</li>
      </ul>
    </div>
  );
};
