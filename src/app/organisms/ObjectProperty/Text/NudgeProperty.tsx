import { useChangeMoveableTextTransformCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { ArrowToLeft } from '@/app/icons';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

interface NudgePropertyProps {}

export const NudgeProperty: FC<NudgePropertyProps> = ({}) => {
  const handleChangeTransform = useChangeMoveableTextTransformCommand();

  return (
    <div className="w-full h-full">
      <div className="text-center m-4">
        <span>Nhích</span>
      </div>
      <div className="flex w-full justify-between">
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(-1, 0, () => {})}
        >
          <ArrowToLeft />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(0, -1, () => {})}
        >
          <ArrowToLeft className="rotate-90" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(1, 0, () => {})}
        >
          <ArrowToLeft className="rotate-180" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(0, 1, () => {})}
        >
          <ArrowToLeft className="-rotate-90" />
        </Button>
      </div>
    </div>
  );
};
