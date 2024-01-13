import { Button } from '@nextui-org/react';
import React from 'react';
import { ArrowToLeft } from '@/app/icons';

interface MobileNudgeButtonsProps {
  onMoveRight: () => void;
  onMoveLeft: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const MobileNudgeButtons: React.FC<MobileNudgeButtonsProps> = ({
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
}) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={onMoveLeft}
        >
          <ArrowToLeft />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={onMoveUp}
        >
          <ArrowToLeft className="rotate-90" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={onMoveRight}
        >
          <ArrowToLeft className="rotate-180" />
        </Button>
        <Button
          className="w-1/5 h-10 rounded-md bg-[#f2f3f5]"
          onClick={onMoveDown}
        >
          <ArrowToLeft className="-rotate-90" />
        </Button>
      </div>
    </>
  );
};
