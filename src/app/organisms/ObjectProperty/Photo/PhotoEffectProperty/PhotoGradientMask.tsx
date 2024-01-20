import { ChevronLeft, Square } from '@/app/icons';
import { Button, Checkbox } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { Slider } from '@nextui-org/react';
import { useActivePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { GradientMask } from '@/app/factories/MoveablePhoto';
import { DEFAULT_GRADIENT_MASK } from '.';
import { LineStartNone } from '@/app/icons/LineStartNone';
import { Line } from '@/app/icons/Line';
import { Circle } from '@/app/icons/Circle';

interface PhotoGradientMaskProps {
  onBack: () => void;
  checkGradientMask: boolean;
  toggleGradientMask: () => void;
}

export const PhotoGradientMask: FC<PhotoGradientMaskProps> = ({
  onBack,
  checkGradientMask,
  toggleGradientMask,
}) => {
  const activePhoto = useActivePhotoObject();
  const [gradientMask, setGradientMask] = useState<GradientMask>(
    activePhoto?.gradientMask || DEFAULT_GRADIENT_MASK,
  );

  useEffect(() => {
    setGradientMask(activePhoto?.gradientMask || DEFAULT_GRADIENT_MASK);
  }, []);

  const onUpdateRange = (val: number) => {};
  const changeFillColor = () => {};
  const onUpdateGradientMask = () => {};

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between items-center my-1">
        <div>
          <Button size="sm" isIconOnly variant="light" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <Checkbox
            classNames={{
              label: 'text-md font-normal text-black-500',
              icon: 'w-[24px] h-[24px]',
              wrapper: 'w-[26px] h-[26px]',
            }}
            isSelected={checkGradientMask}
            size="lg"
            onClick={toggleGradientMask}
          >
            Gradient Mask
          </Checkbox>
        </div>
      </div>
      <div className="flex items-center justify-center m-2">
        <p>Type</p>
        <p className="">
          <Button className="w-full" isIconOnly onClick={() => {}}>
            <Square />
          </Button>
          <Button className="w-full" isIconOnly onClick={() => {}}>
            <Circle />
          </Button>
          <Button className="w-full" isIconOnly onClick={() => {}}>
            <Line />
          </Button>
        </p>
      </div>
      <div className="m-2">
        <span>Direction</span>
      </div>

      <div className="flex w-full px-2 items-center justify-center">
        <Slider
          size="sm"
          aria-label="Temperature"
          step={1}
          maxValue={360}
          minValue={0}
          value={gradientMask.direction}
          onChange={val => {
            const value = +val;
            if (value) {
              setGradientMask({
                ...gradientMask,
                direction: value,
              });
            }
          }}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
        <input
          type="number"
          value={gradientMask.direction}
          onChange={e => {
            const value = +e.target.value as number;
            if (value) {
              setGradientMask({
                ...gradientMask,
                direction: value,
              });
            }
          }}
          min={0}
          max={100}
          className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500 ml-2 p-2"
        />
      </div>
      <div className="m-2">
        <span>Range</span>
      </div>
      <div className="flex w-full px-2 items-center justify-center">
        <Slider
          size="sm"
          aria-label="Temperature"
          step={1}
          maxValue={100}
          minValue={0}
          value={gradientMask.range}
          onChange={val => !isNaN(+val) && onUpdateRange(+val)}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
        <input
          type="number"
          value={gradientMask.range}
          onChange={e => {
            onUpdateRange(+e.target.value as number);
          }}
          min={0}
          max={100}
          className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500 ml-2 p-2"
        />
        <span className="ml-[-20px] text-md">%</span>
      </div>
    </div>
  );
};
