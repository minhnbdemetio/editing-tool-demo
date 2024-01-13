import { FC } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';
import clsx from 'clsx';
import { TEXT_CONTAINER } from '@/app/constants/moveable';

interface MoveableTextProps {
  object: MoveableTextObject;
  className?: string;
}

export const MoveableHeadingTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit hidden text-lg', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <ul>
        <li
          id={`${TEXT_CONTAINER}${object.id}`}
          suppressContentEditableWarning
          contentEditable
        >
          Add a heading
        </li>
      </ul>
    </div>
  );
};
