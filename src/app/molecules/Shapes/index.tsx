import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { MoveableShapeType } from '@/app/lib/moveable/editable/EditableShape';
import { MoveableArrow } from '@/app/lib/moveable/shape/MoveableArrow';
import { MoveableFivePointStar } from '@/app/lib/moveable/shape/MoveableFivePointStar';
import { MoveableHeart } from '@/app/lib/moveable/shape/MoveableHeart';
import { MoveableHexagon } from '@/app/lib/moveable/shape/MoveableHexagon';
import { MoveableInvertedRoundSquare } from '@/app/lib/moveable/shape/MoveableInvertedRoundSquare';
import { MoveableOctagon } from '@/app/lib/moveable/shape/MoveableOctagon';
import { MoveableParallelogram } from '@/app/lib/moveable/shape/MoveableParallelogram';
import { MoveablePentagon } from '@/app/lib/moveable/shape/MoveablePentagon';
import { MoveablePlus } from '@/app/lib/moveable/shape/MoveablePlus';
import { MoveableQuadrangle } from '@/app/lib/moveable/shape/MoveableQuadrangle';
import { MoveableShape } from '@/app/lib/moveable/shape/MoveableShape';
import { MoveableSquare } from '@/app/lib/moveable/shape/MoveableSquare';
import { MoveableSquareCutT } from '@/app/lib/moveable/shape/MoveableSquareCutT';
import { MoveableSquareCutTr } from '@/app/lib/moveable/shape/MoveableSquareCutTr';
import { MoveableSquareCutTrBl } from '@/app/lib/moveable/shape/MoveableSquareCutTrBl';
import { MoveableSquareMinus } from '@/app/lib/moveable/shape/MoveableSquareMinus';
import { MoveableSquareRT } from '@/app/lib/moveable/shape/MoveableSquareRT';
import { MoveableSquaredTriangle } from '@/app/lib/moveable/shape/MoveableSquaredTriangle';
import { MoveableTriangle } from '@/app/lib/moveable/shape/MoveableTriangle';
import { CornerType } from '@/app/lib/moveable/svg/Square';
import Image from 'next/image';
import React, { useCallback } from 'react';

const shapes: { key: string; src: string }[] = [
  { src: 'square', key: 'square' },
  // { src: 'circle', key: 'circle' },
  { src: 'triangle.svg', key: 'triangle' },
  { src: 'squared-triangle', key: 'squared-triangle' },
  { src: 'rounded-square.png', key: 'rounded-square' },
  { src: 'pentagon', key: 'pentagon' },
  { src: 'hexagon', key: 'hexagon' },
  { src: 'octagon', key: 'octagon' },
  { src: 'parallelogram', key: 'parallelogram' },
  { src: 'quadrangle', key: 'quadrangle' },
  { src: 'arrow', key: 'arrow' },
  { src: 'plus', key: 'plus' },
  { src: 'inverted-round-square', key: 'inverted-round-square' },
  { src: 'square-cut-tr.png', key: 'square-cut-tr' },
  { src: 'square-cut-t.png', key: 'square-cut-t' },
  { src: 'square-cut-tr-bl.png', key: 'square-cut-tr-bl' },
  { src: 'square-r-t.png', key: 'square-r-t' },
  { src: 'minus.png', key: 'minus' },
];
export const Shapes: React.FC = () => {
  const addObjectToActivePage = useAddObjectToActivePage();

  const addShape = (key: string) => {
    switch (key) {
      case 'square':
        addObjectToActivePage(new MoveableSquare());
        return;
      case 'triangle':
        addObjectToActivePage(new MoveableTriangle());
        return;
      case 'squared-triangle':
        addObjectToActivePage(new MoveableSquaredTriangle());
        return;
      case 'rounded-square':
        addObjectToActivePage(
          new MoveableSquare({
            corners: { all: { type: CornerType.Rounded, size: 20 } },
          }),
        );
      case 'pentagon':
        addObjectToActivePage(new MoveablePentagon());
        return;
      case 'hexagon':
        addObjectToActivePage(new MoveableHexagon());
        return;
      case 'octagon':
        addObjectToActivePage(new MoveableOctagon());
        return;
      case 'parallelogram':
        addObjectToActivePage(new MoveableParallelogram());
        return;
      case 'quadrangle':
        addObjectToActivePage(new MoveableQuadrangle());
        return;
      case 'arrow':
        addObjectToActivePage(new MoveableArrow());
        return;
      case 'plus':
        addObjectToActivePage(new MoveablePlus());
        return;
      case 'inverted-round-square':
        addObjectToActivePage(new MoveableInvertedRoundSquare());
        return;
      case 'square-cut-tr':
        addObjectToActivePage(new MoveableSquareCutTr());
        return;
      case 'square-cut-t':
        addObjectToActivePage(new MoveableSquareCutT());
        return;
      case 'square-cut-tr-bl':
        addObjectToActivePage(new MoveableSquareCutTrBl());
        return;
      case 'square-r-t':
        addObjectToActivePage(new MoveableSquareRT());
        return;
      case 'minus':
        addObjectToActivePage(new MoveableSquareMinus());
        return;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {shapes.map(({ src, key }) => (
        <div
          onClick={() => addShape(key)}
          className="w-full relative aspect-square h-auto"
          key={key}
        >
          <Image src={'/shapes/' + src} fill alt={src} />
        </div>
      ))}
    </div>
  );
};
