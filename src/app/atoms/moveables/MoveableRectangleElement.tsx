import { FC, RefObject, useRef } from 'react';
import { MoveableRectangleObject } from '@/app/factories/MoveableRectangle';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { useOutsideClick } from '@/app/hooks/useClickOutside';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';

interface MoveableRectangleProps {
  object: MoveableRectangleObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableRectangleElement: FC<MoveableRectangleProps> = ({
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
      className={`w-20 h-20 bg-blue-400 hidden absolute`}
    ></div>
  );
};
