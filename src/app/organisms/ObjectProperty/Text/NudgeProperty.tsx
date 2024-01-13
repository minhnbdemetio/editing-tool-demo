import { MobileNudgeButtons } from '@/app/atoms/MobileNudgeButtons';
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

      <MobileNudgeButtons
        onMoveLeft={() => handleChangeTransform(-1, 0)}
        onMoveUp={() => handleChangeTransform(0, -1)}
        onMoveRight={() => handleChangeTransform(1, 0)}
        onMoveDown={() => handleChangeTransform(0, 1)}
      />
    </div>
  );
};
