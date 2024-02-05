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
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const ShapeMoreProperty: FC = () => {
  const handleCopyObject = useCopyActiveObject();
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
    const clonedObject = activeMoveableObject?.clone();
    if (clonedObject) {
      addObjectToActivePage(clonedObject);
    }
  };

  const pasteObject = usePasteObject();

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
