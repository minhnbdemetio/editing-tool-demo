import { useDeleteObjetCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import {
  useCopyActiveObject,
  usePasteObject,
  useToggleLock,
} from '@/app/hooks/useActiveMoveableObject';
import { Copy } from '@/app/icons/Copy';
import { Delete } from '@/app/icons/Delete';
import { Lock } from '@/app/icons/Lock';
import { Paste } from '@/app/icons/Paste';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const ShapeMoreProperty: FC = () => {
  const handleCopyObject = useCopyActiveObject();
  const handlePasteObject = usePasteObject();
  const handleLockObject = useToggleLock();
  const deleteObjectCommand = useDeleteObjetCommand();

  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>More</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll w-full">
        <Button onClick={handleCopyObject} size="lg" isIconOnly>
          <Copy />
        </Button>
        <Button onClick={handlePasteObject} size="lg" isIconOnly>
          <Paste />
        </Button>
        <Button onClick={handleLockObject} size="lg" isIconOnly>
          <Lock />
        </Button>
        <Button onClick={deleteObjectCommand} size="lg" isIconOnly>
          <Delete />
        </Button>
      </div>
    </div>
  );
};
