import {
  useCopyActiveObject,
  usePasteObject,
} from '@/app/hooks/useActiveMoveableObject';
import { Link } from '@/app/icons';
import { AlternativeText } from '@/app/icons/AlternativeText';
import { BringForward } from '@/app/icons/BringForward';
import { BringToFront } from '@/app/icons/BringToFront';
import { Comment } from '@/app/icons/Comment';
import { Copy } from '@/app/icons/Copy';
import { Delete } from '@/app/icons/Delete';
import { Lock } from '@/app/icons/Lock';
import { Paste } from '@/app/icons/Paste';
import { SelectMultiple } from '@/app/icons/SelectMultiple';
import { SendBackward } from '@/app/icons/SendBackward';
import { SendToBack } from '@/app/icons/SendToBack';
import { ShowTiming } from '@/app/icons/ShowTiming';
import { TranslateText } from '@/app/icons/TranslateText';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const TextMoreProperty: FC = () => {
  const handleCopyObject = useCopyActiveObject();
  const handlePastObject = usePasteObject();

  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>More</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll w-full">
        <Button onClick={handleCopyObject} size="lg" isIconOnly>
          <Copy />
        </Button>
        <Button onClick={handlePastObject} size="lg" isIconOnly>
          <Paste />
        </Button>
        <Button size="lg" isIconOnly>
          <SelectMultiple />
        </Button>
        <Button size="lg" isIconOnly>
          <Comment />
        </Button>
        <Button size="lg" isIconOnly>
          <BringForward />
        </Button>
        <Button size="lg" isIconOnly>
          <BringToFront />
        </Button>
        <Button size="lg" isIconOnly>
          <SendBackward />
        </Button>
        <Button size="lg" isIconOnly>
          <SendToBack />
        </Button>
        <Button size="lg" isIconOnly>
          <ShowTiming />
        </Button>
        <Button size="lg" isIconOnly>
          <Link />
        </Button>
        <Button size="lg" isIconOnly>
          <Lock />
        </Button>
        <Button size="lg" isIconOnly>
          <AlternativeText />
        </Button>
        <Button size="lg" isIconOnly>
          <Delete />
        </Button>
        <Button size="lg" isIconOnly>
          <TranslateText />
        </Button>
      </div>
    </div>
  );
};
