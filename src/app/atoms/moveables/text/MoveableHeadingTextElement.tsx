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
      className={clsx('absolute w-fit hidden text-lg', className)}
      style={{ writingMode: 'horizontal-tb' }}
      
      suppressContentEditableWarning
    >
      <ul>
        <li contentEditable>Add a heading</li>
      </ul>
    </div>
  );
};
