import { ChevronLeft } from '@/app/icons';
import { Button, Checkbox } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { Slider } from '@nextui-org/react';
import { useActiveMoveablePhotoObject } from '@/app/hooks/useActiveMoveableObject';

interface PhotoFillColorProps {
  onBack: () => void;
  toggleFillColor: () => void;
  checkFillColor: boolean;
}

export const PhotoFillColor: FC<PhotoFillColorProps> = ({
  onBack,
  toggleFillColor,
  checkFillColor,
}) => {
  const activePhoto = useActiveMoveablePhotoObject();
  const [color, setColor] = useState<string | undefined>(undefined);
  const [showColorPicker, setShowColorPicker] = useState<Boolean>(false);
  const [opacity, setOpacity] = useState<number>(100);

  useEffect(() => {
    setColor(activePhoto?.fillColor);
    setOpacity(Number(activePhoto?.fillOpacity));
  }, [activePhoto]);

  const handleChangeColor = (color: any) => {
    activePhoto?.setFillColor(color.hex);
    setColor(color.hex);
  };
  const onChangeOpacity = (opacity: number | number[]) => {
    let newOpacity = Number(opacity);
    if (newOpacity < 0) newOpacity = 0;
    if (newOpacity > 100) newOpacity = 100;
    activePhoto?.setFillOpacity(newOpacity / 100);
    setOpacity(newOpacity);
  };
  return (
    <div className="w-full h-full">
      {showColorPicker ? (
        <>
          <div className="relative mb-3 min-h-10">
            {showColorPicker && (
              <Button onClick={() => setShowColorPicker(false)}>Back</Button>
            )}
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform top-1/2">
              Color
            </span>
          </div>
          <SketchPicker
            width="auto"
            color={color}
            onChange={handleChangeColor}
          ></SketchPicker>
        </>
      ) : (
        <>
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
                isSelected={checkFillColor}
                size="lg"
                onClick={toggleFillColor}
              >
                Fill Color
              </Checkbox>
            </div>
            <div
              className="border w-8 h-8 border-[#25282f1a] rounded-md flex items-center justify-center"
              onClick={() => {
                setShowColorPicker(true);
              }}
            >
              <div
                className="w-6 h-6 rounded-md"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          </div>
          <div className="m-4">
            <span>Intensity</span>
          </div>
          <div className="flex w-full px-2 items-center justify-center">
            <Slider
              size="sm"
              aria-label="Temperature"
              step={0.01}
              maxValue={100}
              minValue={0}
              value={opacity}
              onChange={onChangeOpacity}
              classNames={{ base: 'w-full !max-w-none' }}
              className="max-w-md text-black"
            />
            <input
              type="number"
              value={opacity}
              onChange={e => {
                onChangeOpacity(+e.target.value as number);
              }}
              min={0}
              max={100}
              className="w-[72px] border-px border-border border-solid text-md rounded-sm font-normal text-black-500 ml-2 p-2"
            />
            <span className="ml-[-20px] text-md">%</span>
          </div>
        </>
      )}
    </div>
  );
};
