import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveableShapeType } from '@/app/lib/moveable/editable/EditableShape';
import { MoveableHeart } from '@/app/lib/moveable/shape/MoveableHeart';
import { MoveablePentagon } from '@/app/lib/moveable/shape/MoveablePentagon';
import { MoveableShape } from '@/app/lib/moveable/shape/MoveableShape';
import { MoveableSquare } from '@/app/lib/moveable/shape/MoveableSquare';
import { MoveableSquaredTriangle } from '@/app/lib/moveable/shape/MoveableSquaredTriangle';
import { MoveableTriangle } from '@/app/lib/moveable/shape/MoveableTriangle';
import React, { useCallback } from 'react';

export const Shapes: React.FC = () => {
  const addObjectToActivePage = useAddObjectToActivePage();

  return (
    <div>
      <div
        onClick={() => {
          const shape = new MoveableSquare();

          addObjectToActivePage(shape);
        }}
      >
        add square
      </div>
      <div
        onClick={() => {
          const shape = new MoveableTriangle();

          addObjectToActivePage(shape);
        }}
      >
        add triangle
      </div>
      <div
        onClick={() => {
          const shape = new MoveableSquaredTriangle();

          addObjectToActivePage(shape);
        }}
      >
        add squared triangle
      </div>
      <div
        onClick={() => {
          const shape = new MoveablePentagon();

          addObjectToActivePage(shape);
        }}
      >
        add pentagon
      </div>
    </div>
  );
};
