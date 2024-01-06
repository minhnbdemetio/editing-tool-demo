import { FC, RefObject, useRef } from 'react';

import { MoveableTextObject } from '@/app/factories/MoveableText';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { useOutsideClick } from '@/app/hooks/useClickOutside';

interface MoveableTextProps {
  object: MoveableTextObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableTextElement: FC<MoveableTextProps> = ({
  object,
  containerRef,
}) => {
  const { setActiveMoveableObject } = useActiveMoveableObject();

  const defaultElementRef = useOutsideClick(() =>
    setActiveMoveableObject(null),
  );
  useLoadMoveableObject(containerRef, defaultElementRef, object);

  return (
    <div
      onClick={() => setActiveMoveableObject(object)}
      ref={defaultElementRef}
      id={object.id}
      className={`w-fit hidden absolute p-5`}
    >
      <span suppressContentEditableWarning contentEditable>
        Add a heading
      </span>
    </div>
  );
};
