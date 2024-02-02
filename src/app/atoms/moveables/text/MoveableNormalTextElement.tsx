import { FC } from 'react';

import { MoveableTextObject } from '@/app/lib/moveable/text/MoveableText';
import { TEXT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/text';
import { OBJECT_INNER_ELEMENTS } from '@/app/lib/moveable/constant/object';

interface MoveableTextProps {
  object: MoveableTextObject;
}

export const MoveableNormalTextElement: FC<MoveableTextProps> = ({
  object,
}) => {
  return (
    <div id={object.id} className={`w-fit hidden absolute text-md`}>
      <div
        className="w-full h-full"
        id={`${OBJECT_INNER_ELEMENTS.FLIPPER}-${object.id}`}
      >
        <span
          id={`${TEXT_INNER_ELEMENTS.CONTAINER}-${object.id}`}
          suppressContentEditableWarning
          contentEditable
        >
          Add a heading
        </span>
      </div>
    </div>
  );
};
