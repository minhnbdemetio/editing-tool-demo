import { FC, RefObject } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';

interface MoveableTextProps {
  object: MoveableTextObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableTextElement: FC<MoveableTextProps> = ({ object }) => {
  return (
    <div id={object.id} className={`w-fit hidden absolute p-5`}>
      <span suppressContentEditableWarning contentEditable>
        Add a heading
      </span>
    </div>
  );
};
