import { FC, RefObject } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';
import clsx from 'clsx';

interface MoveableTextProps {
  object: MoveableTextObject;
  containerRef: RefObject<HTMLDivElement>;
  className?: string;
}

export const MoveableHeadingTextElement: FC<MoveableTextProps> = ({
  object,
  className,
}) => {
  return (
    <div
      id={object.id}
      className={clsx('w-fit hidden', className)}
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
