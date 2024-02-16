import { MobileNudgeButtons } from '@/app/atoms/MobileNudgeButtons';
import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { FC } from 'react';

interface NudgePropertyProps {}

export const LineNudgeProperty: FC<NudgePropertyProps> = ({}) => {
  const activeLine = useActiveMoveableLineObject();

  const handleChangeTransform = (x: number, y: number) => {
    if (activeLine) {
      activeLine.line.points.moveAll({ x, y });
      activeLine.updateUI();
      activeLine.updatePointerControllerUI();
      activeLine.updateHeadControl();
    }
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
