import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { Slider } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';

export const LineShadowProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [direction, setDirection] = useState(
    activeLineObject?.line.shadowDirection || 100,
  );
  const [opacity, setOpacity] = useState(
    activeLineObject?.line.shadowOpacity || 100,
  );
  const [distance, setDistance] = useState(
    activeLineObject?.line.shadowDistance || 0,
  );

  const [blur, setBlur] = useState(activeLineObject?.line.shadowBlur || 0);

  const onChangeDirection = useCallback(
    (_direction: number | number[]) => {
      setDirection(_direction as number);
      activeLineObject?.line.setShadow({
        shadowDirection: _direction as number,
      });
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );
  const onChangeOpacity = useCallback(
    (_opacity: number | number[]) => {
      setOpacity(_opacity as number);
      activeLineObject?.line.setShadow({
        shadowOpacity: _opacity as number,
      });
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );
  const onChangeDistance = useCallback(
    (_shadowDistance: number | number[]) => {
      setDistance(_shadowDistance as number);
      activeLineObject?.line.setShadow({
        shadowDistance: _shadowDistance as number,
      });
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );
  const onChangeBlur = useCallback(
    (_blur: number | number[]) => {
      setBlur(_blur as number);
      activeLineObject?.line.setShadow({
        shadowBlur: _blur as number,
      });
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <div className="overflow-y-auto">
        <Slider
          label="Direction"
          step={1}
          maxValue={360}
          minValue={0}
          value={direction}
          onChange={onChangeDirection}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
        <Slider
          label="Opacity"
          step={1}
          maxValue={100}
          minValue={0}
          value={opacity}
          onChange={onChangeOpacity}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
        <Slider
          label="Distance"
          step={1}
          maxValue={100}
          minValue={0}
          value={distance}
          onChange={onChangeDistance}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
        <Slider
          label="Blur"
          step={1}
          maxValue={100}
          minValue={1}
          value={blur}
          onChange={onChangeBlur}
          classNames={{ base: 'w-full !max-w-none' }}
          className="max-w-md text-black"
        />
      </div>
    </>
  );
};
