import { FC } from 'react';

import clsx from 'clsx';
import { MoveableBodyTextObject } from '@/app/factories/MoveableBodyText';
import { TEXT_CONTAINER } from '@/app/constants/moveable';

interface MoveableTextProps {
  object: MoveableBodyTextObject;
  className?: string;
}

export const MoveableBodyTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  return (
    <div
      id={object.id}
      className={clsx('absolute w-fit hidden text-sm', className)}
      style={{ writingMode: 'horizontal-tb' }}
    >
      <ul>
        <li
          id={`${TEXT_CONTAINER}${object.id}`}
          suppressContentEditableWarning
          contentEditable
        >
          Add a body text
        </li>
      </ul>
    </div>
  );
};
