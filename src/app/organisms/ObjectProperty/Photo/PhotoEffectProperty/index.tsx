import { ChevronRight } from '@/app/icons';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Button, Checkbox } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { PhotoFillColor } from './PhotoFillColor';
import { PhotoGradientMask } from './PhotoGradientMask';
import {
  useActiveMoveablePhotoObject,
  useUpdateGradientMask,
} from '@/app/hooks/useActiveMoveableObject';
import { GradientMask } from '@/app/lib/moveable/editable/EditablePhoto';

enum EffectType {
  Common = 'common',
  FillColor = 'fillColor',
  Shadow = 'shadow',
  GradientMask = 'gradientMask',
}
export const DEFAULT_GRADIENT_MASK: GradientMask = {
  type: 'rect',
  range: 50,
  direction: 90,
};
export const PhotoEffectProperty: FC = () => {
  const activePhotoObject = useActiveMoveablePhotoObject();
  const [checkFillColor, setCheckFillColor] = useState<boolean>(false);
  const [checkGradientMask, setCheckGradientMask] = useState<boolean>(
    !!activePhotoObject?.gradientMask,
  );
  const [modeEffect, setModeEffect] = useState<EffectType>(EffectType.Common);

  useEffect(() => {
    const activeElement = activePhotoObject?.getElement();
    if (activeElement instanceof HTMLElement) {
      const fillColorElement: HTMLDivElement | null = activeElement.querySelector(
        '.fill-color',
      );
      if (fillColorElement) {
        setCheckFillColor(Boolean(fillColorElement?.style.display === 'block'));
      } else {
        const newFillColorElement = document.createElement('div');
        newFillColorElement.className = 'fill-color';
        newFillColorElement.style.content = '';
        newFillColorElement.style.position = 'absolute';
        newFillColorElement.style.top = '0';
        newFillColorElement.style.left = '0';
        newFillColorElement.style.width = '100%';
        newFillColorElement.style.height = '100%';
        newFillColorElement.style.backgroundColor = '#000000';
        newFillColorElement.style.opacity = '1';
        newFillColorElement.style.zIndex = '1';
        newFillColorElement.style.display = 'none';
        activeElement.appendChild(newFillColorElement);
      }
    }
  }, [activePhotoObject]);

  const changeFillColor = () => {
    const activeElement = activePhotoObject?.getElement();

    if (activeElement instanceof HTMLElement) {
      const fillColorElement: HTMLDivElement | null = activeElement.querySelector(
        '.fill-color',
      );
      if (fillColorElement) {
        if (fillColorElement?.style.display === 'block') {
          fillColorElement.style.display = 'none';
          setCheckFillColor(false);
        } else {
          fillColorElement.style.display = 'block';
          setCheckFillColor(true);
        }
        return;
      }
    }
  };

  const changeGradientMask = useUpdateGradientMask();

  if (modeEffect === EffectType.FillColor)
    return (
      <PhotoFillColor
        onBack={() => {
          setModeEffect(EffectType.Common);
        }}
        checkFillColor={checkFillColor}
        changeFillColor={changeFillColor}
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
            onClick={changeFillColor}
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
