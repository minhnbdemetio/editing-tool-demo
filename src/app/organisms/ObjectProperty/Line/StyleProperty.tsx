import { useActiveMoveableLineObject } from '@/app/hooks/useActiveMoveableObject';
import { DotsLineStyle } from '@/app/icons/DotsLineStyle';
import { MediumDashedLineStyle } from '@/app/icons/MediumDashedLineStyle';
import { SmallDashedLineStyle } from '@/app/icons/SmallDashedLineStyle';
import { SolidLineStyle } from '@/app/icons/SolidLineStyle';
import { IconProps } from '@/app/types';
import { StrokeDashArraySizes, StrokeLineCap } from '@/app/utilities/svg-line';
import { twMerge } from '@/app/utilities/tailwind';
import { Slider, Switch } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';

const STROKE_LINE_OPTIONS: {
  icon: React.FC<IconProps>;
  id: StrokeDashArraySizes;
}[] = [
  {
    id: StrokeDashArraySizes.None,
    icon: SolidLineStyle,
  },
  {
    id: StrokeDashArraySizes.Large,
    icon: MediumDashedLineStyle,
  },
  {
    id: StrokeDashArraySizes.Medium,
    icon: SmallDashedLineStyle,
  },
  {
    id: StrokeDashArraySizes.Small,
    icon: DotsLineStyle,
  },
];

export const LineProperty: FC = () => {
  const activeLineObject = useActiveMoveableLineObject();

  const [roundedEndPoint, setRoundedEndPoint] = useState(
    activeLineObject?.line.isStrokeLineCap(StrokeLineCap.Round),
  );
  const [strokeDashArray, setStrokeDashArray] = useState<StrokeDashArraySizes>(
    activeLineObject?.line.getStrokeDashArraySize() ||
      StrokeDashArraySizes.None,
  );
  const [lightWeight, setLightWeight] = useState(
    activeLineObject?.line.getStrokeWidth() || 1,
  );
  const [] = useState();

  const onChangeStrokeDashArray = useCallback(
    (strokeDash: StrokeDashArraySizes) => {
      setStrokeDashArray(strokeDash);

      activeLineObject?.line.setStrokeDashArray(strokeDash);
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  const onChangeLightWeight = useCallback(
    (_lightWeight: number | number[]) => {
      setLightWeight(_lightWeight as number);

      activeLineObject?.line.setStrokeWidth(_lightWeight as number);
      activeLineObject?.updateUI();
    },
    [activeLineObject],
  );

  const onChangeRoundStrokeLineCap = useCallback(
    (state: boolean) => {
      if (activeLineObject) {
        const strokeLineCap = state ? StrokeLineCap.Round : StrokeLineCap.Butt;

        setRoundedEndPoint(state);

        activeLineObject.line.setStrokeLineCap(strokeLineCap);
        activeLineObject.updateUI();
      }
    },
    [activeLineObject],
  );

  if (!activeLineObject) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-4 gap-1">
          {STROKE_LINE_OPTIONS.map(({ icon: Icon, id }) => (
            <button
              key={id}
              onClick={() => onChangeStrokeDashArray(id)}
              className={twMerge(
                'border-px border-solid border-gray-500 rounded-md py-1',
                { 'border-green-400': id === strokeDashArray },
              )}
            >
              <Icon className="mx-auto " />
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center ">
          <label htmlFor="rounded-end-point-switch" className="text-black">
            Rounded end points
          </label>

          <Switch
            id="rounded-end-point-switch"
            isSelected={roundedEndPoint}
            onValueChange={onChangeRoundStrokeLineCap}
            classNames={{
              wrapper: 'group-data-[selected=true]:!bg-green-500 bg-black',
            }}
          ></Switch>
        </div>
        <div>
          <Slider
            label="Light weight"
            step={1}
            maxValue={100}
            minValue={1}
            value={lightWeight}
            onChange={onChangeLightWeight}
            classNames={{ base: 'w-full !max-w-none' }}
            className="max-w-md text-black"
          />
        </div>
      </div>
    </>
  );
};
