import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveableShapeType } from '@/app/lib/moveable/editable/EditableShape';
import { MoveableArrow } from '@/app/lib/moveable/shape/MoveableArrow';
import { MoveableFivePointStar } from '@/app/lib/moveable/shape/MoveableFivePointStar';
import { MoveableHeart } from '@/app/lib/moveable/shape/MoveableHeart';
import { MoveableHexagon } from '@/app/lib/moveable/shape/MoveableHexagon';
import { MoveablePentagon } from '@/app/lib/moveable/shape/MoveablePentagon';
import { MoveablePlus } from '@/app/lib/moveable/shape/MoveablePlus';
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
      <div
        onClick={() => {
          const shape = new MoveableHexagon();

          addObjectToActivePage(shape);
        }}
      >
        add hexagon
      </div>{' '}
      <div
        onClick={() => {
          const shape = new MoveableFivePointStar();

          addObjectToActivePage(shape);
        }}
      >
        five point start
      </div>
      <div
        onClick={() => {
          const shape = new MoveableHeart();

          addObjectToActivePage(shape);
        }}
      >
        heart
      </div>
      <div
        onClick={() => {
          const shape = new MoveablePlus();

          addObjectToActivePage(shape);
        }}
      >
        plus
      </div>
      <div
        onClick={() => {
          const shape = new MoveableArrow();

          addObjectToActivePage(shape);
        }}
      >
        Arrow
      </div>
    </div>
  );
};
