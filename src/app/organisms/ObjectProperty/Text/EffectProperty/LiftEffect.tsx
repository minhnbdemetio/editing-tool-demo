import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface LiftPropertyProps {}

export const LiftEffect: FC<LiftPropertyProps> = () => {
  const activeText = useActiveTextObject();
  if (activeText?.getTextIntensity() === undefined) {
    activeText?.setEffectLift(50);
  }
  const [insensity, setInsensity] = useState<number | undefined>(
    activeText?.getTextIntensity(),
  );
  useEffect(() => {
    if (insensity) {
      activeText?.setEffectLift(insensity);
    }
  }, [insensity]);
  return (
    <Slider
      label="Intensity"
      size="sm"
      step={1}
      maxValue={100}
      minValue={0}
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
              value={insensity}
              onChange={e => {
                const v = +e.target.value;
                if (isNaN(v)) return;
                setInsensity(v);
              }}
            />
          </Tooltip>
        </output>
      )}
      value={insensity}
      onChange={value => {
        if (typeof value === 'number') {
          setInsensity(value);
        }
      }}
    />
  );
};