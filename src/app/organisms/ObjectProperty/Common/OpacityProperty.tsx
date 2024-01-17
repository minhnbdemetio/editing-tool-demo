import { useChangeMoveableElementOpacityCommand } from '@/app/hooks/editor-commands/useActiveMoveableObjectCommand';
import { useActiveMoveableObject } from '@/app/store/active-moveable-object';
import { Slider } from '@nextui-org/react';
import { FC, useCallback, useEffect, useState } from 'react';

interface OpacityPropertyProps {}

export const OpacityProperty: FC<OpacityPropertyProps> = ({}) => {
  const changeOpacity = useChangeMoveableElementOpacityCommand();
  const [opacity, setOpacity] = useState<number>(100);
  const { activeMoveableObject } = useActiveMoveableObject();
  const activeElement = activeMoveableObject?.getElement();

  const onChangeOpacity = useCallback(
    (_opacity: number | number[]) => {
      let newOpacity = Number(_opacity);
      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 100) newOpacity = 100;

      changeOpacity(newOpacity, () => {});
      setOpacity(newOpacity);
    },
    [changeOpacity],
  );

  useEffect(() => {
    setOpacity((Number(activeElement?.style?.opacity) || 1) * 100);
  }, [activeElement]);

  return (
    <div className="w-full h-full">
      <div className="m-4">
        <span>Opacity</span>
      </div>
      <div className="flex w-full items-center justify-center">
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
          className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500 ml-2 p-2"
        />
        <span className="ml-[-20px] text-md">%</span>
      </div>
    </div>
  );
};
