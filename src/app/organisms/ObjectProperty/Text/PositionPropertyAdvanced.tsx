import { useChangeMoveableTextTransformCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import {
  useChangeTextHeight,
  useChangeTextLockSize,
  useChangeTextRotate,
  useChangeTextWidth,
} from '@/app/hooks/useActiveMoveableObject';
import { ArrowToLeft, GoToTop, LockOpen, MoveOn } from '@/app/icons';
import { Lock } from '@/app/icons/Lock';
import { InputUnit } from '@/app/molecules/InputUnit';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import {
  parseTransformString,
  parseTranslateString,
} from '@/app/utilities/utils';
import { Button } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface PositionPropertyAdvancedProps {}
enum MODE {
  'arrange',
  'advanced',
}
export const PositionPropertyAdvanced: FC<
  PositionPropertyAdvancedProps
> = ({}) => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const handleChangeWidth = useChangeTextWidth();
  const handleChangeHeight = useChangeTextHeight();
  const handleChangeLockSize = useChangeTextLockSize();
  const changeTransform = useChangeMoveableTextTransformCommand();
  const handleChangeRotate = useChangeTextRotate();

  const [lockSize, setLockSize] = useState<number>(0);
  const [width, setWidth] = useState<string>('0px');
  const [height, setHeight] = useState<string>('0px');
  const [translateX, setTranslateX] = useState<string>('0px');
  const [translateY, setTranslateY] = useState<string>('0px');
  const [rotate, setRotate] = useState<string>('0°');

  const activeElement = activeMoveableObject?.getElement();

  useEffect(() => {
    if (activeElement) {
      const beforeTransForm = parseTranslateString(
        activeElement?.style?.transform || '0',
      );
      const beforeRotate =
        parseTransformString(activeElement?.style?.transform).rotate?.replace(
          /[^\d.]/g,
          '',
        ) || '0';

      setWidth(
        activeElement?.getAttribute('width') ||
          activeElement.offsetWidth + 'px',
      );
      setHeight(
        activeElement?.getAttribute('height') ||
          activeElement.offsetHeight + 'px',
      );
      setLockSize(Number(activeElement?.getAttribute('lockSizeId')) || 0);
      setTranslateX(beforeTransForm.translateX + 'px');
      setTranslateY(beforeTransForm.translateY + 'px');
      setRotate(beforeRotate + '°');
    }
  }, [activeElement]);

  const changeWidth = (widthValue: string) => {
    if (lockSize && activeElement) {
      const numericStringWidth = Number(widthValue.replace(/[^\d.]/g, ''));
      const newHeight =
        parseFloat((numericStringWidth / lockSize).toFixed(1)) + 'px';
      handleChangeHeight(newHeight, () => {
        setHeight(newHeight);
      });
    }
    handleChangeWidth(widthValue, () => {
      setWidth(widthValue);
    });
  };
  const changeHeight = (heightValue: string) => {
    if (lockSize && activeElement) {
      const numericStringHeight = Number(heightValue.replace(/[^\d.]/g, ''));
      const newWidth =
        parseFloat((numericStringHeight * lockSize).toFixed(1)) + 'px';
      handleChangeWidth(newWidth, () => {
        setWidth(newWidth);
      });
    }
    handleChangeHeight(heightValue, () => {
      setHeight(heightValue);
    });
  };
  const changeLockSize = () => {
    if (activeElement) {
      const newLockSize = lockSize
        ? 0
        : activeElement?.offsetWidth / activeElement?.offsetHeight;
      handleChangeLockSize(newLockSize, () => {
        setLockSize(newLockSize);
      });
    }
  };
  const changeTranslateX = (translateXValue: string) => {
    changeTransform(
      Number(translateXValue.replace(/[^\d.]/g, '')),
      Number(translateY.replace(/[^\d.]/g, '')),
      () => setTranslateX(translateXValue),
    );
  };
  const changeTranslateY = (translateYValue: string) => {
    changeTransform(
      Number(translateX.replace(/[^\d.]/g, '')),
      Number(translateYValue.replace(/[^\d.]/g, '')),
      () => setTranslateY(translateYValue),
    );
  };

  const changeRotate = (rotateValue: string) => {
    handleChangeRotate(rotateValue.replace(/[^\d.]/g, ''), () => {
      setRotate(rotateValue);
    });
  };

  return (
    <div className="w-full flex-1">
      <div className="flex w-full">
        <div className="w-1/3 p-1">
          <InputUnit
            label={'Rộng'}
            value={width}
            onChangeValue={value => changeWidth(value)}
            onSetValue={setWidth}
          />
        </div>
        <div className="w-1/3 p-1">
          <InputUnit
            label={'Cao'}
            value={height}
            onChangeValue={value => changeHeight(value)}
            onSetValue={setHeight}
          />
        </div>
        <div className="w-1/3 p-1">
          <b>Tỉ lệ</b>
          <Button
            className="w-full mt-1 rounded-sm h-[38px]"
            isIconOnly
            onClick={changeLockSize}
          >
            {lockSize ? <Lock /> : <LockOpen />}
          </Button>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/3 p-1">
          <InputUnit
            label={'X'}
            value={translateX}
            onChangeValue={value => changeTranslateX(value)}
            onSetValue={setTranslateX}
          />
        </div>
        <div className="w-1/3 p-1">
          <InputUnit
            label={'Y'}
            value={translateY}
            onChangeValue={value => changeTranslateY(value)}
            onSetValue={setTranslateY}
          />
        </div>
        <div className="w-1/3 p-1">
          <InputUnit
            label={'Xoay'}
            value={rotate}
            onChangeValue={value => changeRotate(value)}
            onSetValue={setRotate}
            unit="°"
          />
        </div>
      </div>
    </div>
  );
};
