import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

const CURVE_DEFAULT = 50;

export const CurveEffect: FC = () => {
  const activeText = useActiveTextObject();
  const [curve, setCurve] = useState<number | undefined>(
    activeText?.curve || CURVE_DEFAULT,
  );
  useEffect(() => {
    activeText?.setCurve(activeText?.curve || CURVE_DEFAULT);
  }, []);
  return (
    <Slider
      label="Thickness"
      size="sm"
      step={1}
      maxValue={90}
      minValue={-90}
      color="foreground"
      classNames={{
        label: 'mt-[12px]',
      }}
      renderValue={({ children, ...props }) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              aria-label="Temperature value"
              value={curve}
              onChange={e => {
                const v = +e.target.value;
                if (isNaN(v)) return;
                setCurve(v);
                activeText?.setCurve(v);
              }}
            />
          </Tooltip>
        </output>
      )}
      value={curve}
      onChange={value => {
        if (typeof value === 'number') {
          setCurve(value);
          activeText?.setCurve(value);
        }
      }}
    />
  );
};
