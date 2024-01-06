import { FC, RefObject, useRef } from 'react';
import { MoveableRectangleObject } from '@/app/factories/MoveableRectangle';
import { useLoadMoveableObject } from '@/app/hooks/useLoadObject';
import { useOutsideClick } from '@/app/hooks/useClickOutside';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { MoveableLineObject } from '@/app/factories/MoveableLine';
import './style.scss';

interface MoveableLineElementProps {
  object: MoveableLineObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableLineElement: FC<MoveableLineElementProps> = ({
  object,
  containerRef,
}) => {
  const { setActiveMoveableObject, activeMoveableObject } =
    useActiveMoveableObject();
  const defaultElementRef = useOutsideClick(() => {
    if (!activeMoveableObject?.skipClickoutEvent) {
      setActiveMoveableObject(null);
    }
  });

  useLoadMoveableObject(containerRef, defaultElementRef, object);

  return (
    <div
      onClick={() => setActiveMoveableObject(object)}
      ref={defaultElementRef}
      id={object.id}
      className={` hidden absolute border-none`}
      dangerouslySetInnerHTML={{ __html: object.line?.toSvg() || '' }}
    ></div>
  );
};
