import { FC } from 'react';

import clsx from 'clsx';
import { MoveableBodyTextObject } from '@/app/factories/MoveableBodyText';

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
      
      suppressContentEditableWarning
    >
      <ul>
        <li contentEditable>Add a body text</li>
      </ul>
    </div>
  );
};
