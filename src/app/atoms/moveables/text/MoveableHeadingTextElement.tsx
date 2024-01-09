import { FC } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';
import clsx from 'clsx';

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
      className={clsx('w-fit hidden text-lg', className)}
      style={{ writingMode: 'horizontal-tb' }}
      contentEditable
      suppressContentEditableWarning
    >
      <ul>
        <li>Add a heading</li>
      </ul>
    </div>
  );
};
