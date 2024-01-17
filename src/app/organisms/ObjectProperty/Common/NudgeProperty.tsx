import { MobileNudgeButtons } from '@/app/atoms/MobileNudgeButtons';
import { useChangeMoveableElementTransformCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { parseTranslateString } from '@/app/utilities/utils';
import { FC } from 'react';

interface NudgePropertyProps {}

export const NudgeProperty: FC<NudgePropertyProps> = ({}) => {
  const changeTransform = useChangeMoveableElementTransformCommand();
  const { activeMoveableObject } = useActiveMoveableObject();
  const element = activeMoveableObject?.getElement();
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
