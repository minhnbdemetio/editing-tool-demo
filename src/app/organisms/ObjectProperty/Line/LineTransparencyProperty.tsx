import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { useForceReloadLineController } from '@/app/store/force-reload-line-controller';
import { SvgLineType } from '@/app/utilities/svg-line';
import { Slider } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';

export const LineTransparencyProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const reload = useForceReloadLineController(s => s.reload);

  const [transparency, setTransparency] = useState<number>(
    activeLineObject?.line.getOpacity() || 100,
  );

  const [] = useState();

  const onChangeTransparency = useCallback(
    (transparency: number | number[]) => {
      setTransparency(transparency as number);

      activeLineObject?.line.setOpacity(transparency as number);
      activeLineObject?.updateUI();
      reload();
    },
    [activeLineObject, reload],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <div>
        <Slider
          label="Light weight"
          step={1}
          maxValue={100}
          minValue={1}
          value={transparency}
          onChange={onChangeTransparency}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
      </div>
    </>
  );
};
