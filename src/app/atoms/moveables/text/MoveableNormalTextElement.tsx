import { FC } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';
import { TEXT_CONTAINER } from '@/app/constants/moveable';

interface MoveableTextProps {
  object: MoveableTextObject;
}

export const MoveableNormalTextElement: FC<MoveableTextProps> = ({
  object,
}) => {
  return (
    <div id={object.id} className={`w-fit hidden absolute p-5 text-md`}>
      <span
        id={`${TEXT_CONTAINER}${object.id}`}
        suppressContentEditableWarning
        contentEditable
      >
        Add a heading
      </span>
    </div>
  );
};
