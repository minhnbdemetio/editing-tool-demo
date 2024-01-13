import { useChangeMoveableTextTransformCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { ArrowToLeft } from '@/app/icons';
import { parseTranslateString } from '@/app/utilities/utils';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

interface NudgePropertyProps {}

export const NudgeProperty: FC<NudgePropertyProps> = ({}) => {
  const changeTransform = useChangeMoveableTextTransformCommand();
  const activeText = useActiveTextObject();
  const element = activeText?.getElement();

  const handleChangeTransform = (translateX: number, translateY: number) => {
    const beforeTransForm = parseTranslateString(
      element?.style?.transform || '0',
    );
    changeTransform(
      translateX + beforeTransForm.translateX,
      translateY + beforeTransForm.translateY,
      () => {},
    );
  };

  return (
    <div className="w-full h-full">
      <div className="text-center m-4">
        <span>Nhích</span>
      </div>
      <div className="flex w-full justify-between">
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(-1, 0)}
        >
          <ArrowToLeft />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(0, -1)}
        >
          <ArrowToLeft className="rotate-90" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(1, 0)}
        >
          <ArrowToLeft className="rotate-180" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={() => handleChangeTransform(0, 1)}
        >
          <ArrowToLeft className="-rotate-90" />
        </Button>
      </div>
    </div>
  );
};
