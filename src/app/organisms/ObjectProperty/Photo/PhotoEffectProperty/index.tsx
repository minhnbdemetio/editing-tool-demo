import { ChevronRight } from '@/app/icons';
import { Button, Checkbox } from '@nextui-org/react';
import { FC, useState } from 'react';
import { PhotoFillColor } from './PhotoFillColor';
import { PhotoGradientMask } from './PhotoGradientMask';
import {
  useActiveMoveablePhotoObject,
  useUpdateGradientMask,
} from '@/app/hooks/useActiveMoveableObject';
import { GradientMask } from '@/app/lib/moveable/photo/gradient-mask/GradientMask';
import { RectGradientMask } from '@/app/lib/moveable/photo/gradient-mask/RectGradientMask';

enum EffectType {
  Common = 'common',
  FillColor = 'fillColor',
  Shadow = 'shadow',
  GradientMask = 'gradientMask',
}
export const DEFAULT_GRADIENT_MASK: GradientMask = new RectGradientMask({
  range: 50,
  direction: 90,
});
export const PhotoEffectProperty: FC = () => {
  const activePhotoObject = useActiveMoveablePhotoObject();
  const [checkFillColor, setCheckFillColor] = useState<boolean>(false);
  const [checkGradientMask, setCheckGradientMask] = useState<boolean>(
    !!activePhotoObject?.gradientMask,
  );
  const [modeEffect, setModeEffect] = useState<EffectType>(EffectType.Common);

  const toggleFillColor = () => {
    const hasFillColor = Boolean(activePhotoObject?.hasFillColor());
    if (hasFillColor) activePhotoObject?.hideFillColor();
    else activePhotoObject?.showFillColor();
    setCheckFillColor(!checkFillColor);
  };

  const changeGradientMask = useUpdateGradientMask();

  if (modeEffect === EffectType.FillColor)
    return (
      <PhotoFillColor
        onBack={() => {
          setModeEffect(EffectType.Common);
        }}
        checkFillColor={checkFillColor}
        toggleFillColor={toggleFillColor}
      />
    );
  if (modeEffect === EffectType.GradientMask) {
    return (
      <PhotoGradientMask
        onBack={() => {
          setModeEffect(EffectType.Common);
        }}
        checkGradientMask={checkGradientMask}
        toggleGradientMask={() => {
          changeGradientMask(
            checkGradientMask ? undefined : DEFAULT_GRADIENT_MASK,
            () => setCheckGradientMask(!checkGradientMask),
          );
        }}
      />
    );
  }
  if (modeEffect === EffectType.Common)
    return (
      <div className="w-full h-full">
        <div className="text-center">
          <span>Effect</span>
        </div>
        <div className="flex w-full justify-between items-center my-1">
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
          <Button
            size="sm"
            isIconOnly
            variant="light"
            onClick={() => {
              setModeEffect(EffectType.FillColor);
            }}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="flex w-full justify-between items-center my-1">
          <Checkbox
            classNames={{
              label: 'text-md font-normal text-black-500',
              icon: 'w-[24px] h-[24px]',
              wrapper: 'w-[26px] h-[26px]',
            }}
            size="lg"
          >
            Shadow
          </Checkbox>
          <Button size="sm" isIconOnly variant="light" onClick={() => {}}>
            <ChevronRight />
          </Button>
        </div>
        <div className="flex w-full justify-between items-center my-1">
          <Checkbox
            classNames={{
              label: 'text-md font-normal text-black-500',
              icon: 'w-[24px] h-[24px]',
              wrapper: 'w-[26px] h-[26px]',
            }}
            size="lg"
            onClick={() => {
              changeGradientMask(
                checkGradientMask ? undefined : DEFAULT_GRADIENT_MASK,
                () => setCheckGradientMask(!checkGradientMask),
              );
            }}
            isSelected={checkGradientMask}
          >
            Gradient mask
          </Checkbox>
          <Button
            size="sm"
            isIconOnly
            variant="light"
            onClick={() => {
              setModeEffect(EffectType.GradientMask);
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    );
  return <></>;
};
