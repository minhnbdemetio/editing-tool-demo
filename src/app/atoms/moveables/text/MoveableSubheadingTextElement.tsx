import { FC } from 'react';

import clsx from 'clsx';
import { MoveableSubheadingTextObject } from '@/app/factories/MoveableSubheadingText';

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
      contentEditable
      suppressContentEditableWarning
    >
      <ul>
        <li>Add a subheading</li>
      </ul>
    </div>
  );
};
