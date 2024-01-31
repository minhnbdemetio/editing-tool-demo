import { useDeleteObjetCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import {
  useCopyActiveObject,
  useObjectCopied,
  usePasteObject,
  useToggleLock,
} from '@/app/hooks/useActiveMoveableObject';
import { useAddObjectToActivePage } from '@/app/hooks/usePageObjects';
import { Duplicate } from '@/app/icons';
import { Copy } from '@/app/icons/Copy';
import { Delete } from '@/app/icons/Delete';
import { Lock } from '@/app/icons/Lock';
import { Paste } from '@/app/icons/Paste';
import { MoveableShapeType } from '@/app/lib/moveable/editable/EditableShape';
import { MoveableArrow } from '@/app/lib/moveable/shape/MoveableArrow';
import { MoveableHexagon } from '@/app/lib/moveable/shape/MoveableHexagon';
import { MoveableInvertedRoundSquare } from '@/app/lib/moveable/shape/MoveableInvertedRoundSquare';
import { MoveableOctagon } from '@/app/lib/moveable/shape/MoveableOctagon';
import { MoveableParallelogram } from '@/app/lib/moveable/shape/MoveableParallelogram';
import { MoveablePentagon } from '@/app/lib/moveable/shape/MoveablePentagon';
import { MoveablePlus } from '@/app/lib/moveable/shape/MoveablePlus';
import { MoveableQuadrangle } from '@/app/lib/moveable/shape/MoveableQuadrangle';
import { MoveableSquare } from '@/app/lib/moveable/shape/MoveableSquare';
import { MoveableSquareCutT } from '@/app/lib/moveable/shape/MoveableSquareCutT';
import { MoveableSquareCutTr } from '@/app/lib/moveable/shape/MoveableSquareCutTr';
import { MoveableSquareCutTrBl } from '@/app/lib/moveable/shape/MoveableSquareCutTrBl';
import { MoveableSquareMinus } from '@/app/lib/moveable/shape/MoveableSquareMinus';
import { MoveableSquareRT } from '@/app/lib/moveable/shape/MoveableSquareRT';
import { MoveableSquaredTriangle } from '@/app/lib/moveable/shape/MoveableSquaredTriangle';
import { MoveableTriangle } from '@/app/lib/moveable/shape/MoveableTriangle';
import { CornerType } from '@/app/lib/moveable/svg/Square';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const ShapeMoreProperty: FC = () => {
  const handleCopyObject = useCopyActiveObject();
  const objectCopied = useObjectCopied();
  const handleLockObject = useToggleLock();
  const deleteObjectCommand = useDeleteObjetCommand();
  const { getActiveMoveableObject } = useActiveMoveableObject();
  const activeMoveableObject = getActiveMoveableObject();
  const addObjectToActivePage = useAddObjectToActivePage();

  const handleDeleteObject = () => {
    if (!activeMoveableObject?.isLocked) {
      deleteObjectCommand();
    }
  };

  const handleDuplicateObject = async () => {
    handleCopyObject();
    pasteObject();
    // handlePasteObject();
  };

  const pasteObject = async () => {
    const object: any = await objectCopied();
    if (object?.type) {
      const { width, height, shapeType } = object;

      switch (shapeType) {
        case MoveableShapeType.Square:
          addObjectToActivePage(new MoveableSquare({ width, height }));
          return;
        case MoveableShapeType.Triangle:
          addObjectToActivePage(new MoveableTriangle());
          return;
        case MoveableShapeType.SquaredTriangle:
          addObjectToActivePage(new MoveableSquaredTriangle());
          return;
        case MoveableShapeType.Hexagon:
          addObjectToActivePage(new MoveableHexagon());
          return;
        case MoveableShapeType.Octagon:
          addObjectToActivePage(new MoveableOctagon());
          return;
        case MoveableShapeType.Parallelogram:
          addObjectToActivePage(new MoveableParallelogram());
          return;
        case MoveableShapeType.Quadrangle:
          addObjectToActivePage(new MoveableQuadrangle());
          return;
        case MoveableShapeType.Arrow:
          addObjectToActivePage(new MoveableArrow());
          return;
        case MoveableShapeType.Plus:
          addObjectToActivePage(new MoveablePlus());
          return;
        case MoveableShapeType.InvertedRoundSquare:
          addObjectToActivePage(new MoveableInvertedRoundSquare());
          return;
        case MoveableShapeType.SquareCutTr:
          addObjectToActivePage(new MoveableSquareCutTr());
          return;
        case MoveableShapeType.SquareCutT:
          addObjectToActivePage(new MoveableSquareCutT());
          return;
        case MoveableShapeType.SquareCutTrBl:
          addObjectToActivePage(new MoveableSquareCutTrBl());
          return;
        case MoveableShapeType.SquareRT:
          addObjectToActivePage(new MoveableSquareRT());
          return;
        case 'minus':
          addObjectToActivePage(new MoveableSquareMinus());
          return;
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>More</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll w-full">
        <Button onClick={handleDuplicateObject} size="lg" isIconOnly>
          <Duplicate />
        </Button>
        <Button onClick={handleCopyObject} size="lg" isIconOnly>
          <Copy />
        </Button>
        <Button onClick={pasteObject} size="lg" isIconOnly>
          <Paste />
        </Button>
        <Button onClick={handleLockObject} size="lg" isIconOnly>
          <Lock />
        </Button>
        <Button onClick={handleDeleteObject} size="lg" isIconOnly>
          <Delete />
        </Button>
      </div>
    </div>
  );
};
