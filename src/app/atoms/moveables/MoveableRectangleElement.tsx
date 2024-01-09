import { FC, RefObject } from 'react';
import { MoveableRectangleObject } from '@/app/factories/MoveableRectangle';

interface MoveableRectangleProps {
  object: MoveableRectangleObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableRectangleElement: FC<MoveableRectangleProps> = ({
  object,
}) => {
  return (
    <div
      id={object.id}
      className={`w-20 h-20 bg-blue-400 hidden absolute`}
    ></div>
  );
};