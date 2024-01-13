import { FC } from 'react';

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
  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit hidden text-md', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <ul>
        <li
          id={`${TEXT_CONTAINER}${object.id}`}
          suppressContentEditableWarning
          contentEditable
        >
          Add a subheading
        </li>
      </ul>
    </div>
  );
};
