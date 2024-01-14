import { Button } from '@/app/atoms/Button';
import { TransparentModal } from '@/app/atoms/TransparentModal';
import { twMerge } from '@/app/utilities/tailwind';
import { FC, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

interface EffectPickColorProps {
  defaultColor?: string;
  onChangeColor: (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onCloseColorPicker?: () => void;
}

export const EffectPickColor: FC<EffectPickColorProps> = ({
  defaultColor,
  onChangeColor,
  onCloseColorPicker,
}) => {
  const [color, setColor] = useState<string>(defaultColor || '#000000');
  return (
    <TransparentModal
      className={twMerge('z-10 fixed bottom-0 max-h-[30%] h-fit overflow-auto')}
    >
      <div className="relative mb-3 min-h-10">
        <Button onClick={() => onCloseColorPicker && onCloseColorPicker()}>
          Back
        </Button>
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform top-1/2 text-[20px] font-normal">
          Color picker
        </span>
      </div>
      <SketchPicker
        width="auto"
        color={color}
        onChange={(
          color: ColorResult,
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setColor(color.hex);
          onChangeColor(color, event);
        }}
      ></SketchPicker>
    </TransparentModal>
  );
};
