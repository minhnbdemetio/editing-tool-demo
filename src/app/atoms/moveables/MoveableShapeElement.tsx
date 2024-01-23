import { MoveableShape } from '@/app/lib/moveable/shape/MoveableShape';
import { FC, useEffect } from 'react';

interface MoveableShapeProps {
  object: MoveableShape;
}

export const MoveableShapeElement: FC<MoveableShapeProps> = ({ object }) => {
  console.debug({ w: object.width, h: object.height });

  useEffect(() => {
    process.nextTick(() => object.render());
  }, [object]);

  return (
    <div
      data-id={object.id}
      id={object.id}
      className={`hidden absolute w-fit h-fit overflow-hidden`}
    ></div>
  );
};
