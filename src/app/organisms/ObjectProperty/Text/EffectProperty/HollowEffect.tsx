import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface HollowEffectProps {}

const THICKNESS_DEFAULT = 50;

export const HollowEffect: FC<HollowEffectProps> = () => {
  const activeText = useActiveTextObject();
  const [thickness, setThickness] = useState<number | undefined>(
    activeText?.thicknessHollowEffect || THICKNESS_DEFAULT,
  );
  useEffect(() => {
    activeText?.setThicknessHollowEffect(
      activeText?.thicknessHollowEffect || THICKNESS_DEFAULT,
    );
  }, []);
  return (
    <Slider
      label="Thickness"
      size="sm"
      step={1}
      maxValue={100}
      minValue={1}
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
              value={thickness}
              onChange={e => {
                const v = +e.target.value;
                if (isNaN(v)) return;
                setThickness(v);
                activeText?.setThicknessHollowEffect(v);
              }}
            />
          </Tooltip>
        </output>
      )}
      value={thickness}
      onChange={value => {
        if (typeof value === 'number') {
          setThickness(value);
          activeText?.setThicknessHollowEffect(value);
        }
      }}
    />
  );
};