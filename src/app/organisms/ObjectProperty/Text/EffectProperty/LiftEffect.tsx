import {
  useActiveTextObject,
  useUpdateTextStyleEffectOptions,
} from '@/app/hooks/useActiveMoveableObject';
import { TEXT_LIFT_DEFAULT_VALUE } from '@/app/lib/moveable/constant/text';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface LiftPropertyProps {}

export const LiftEffect: FC<LiftPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [insensity, setInsensity] = useState<number | undefined>(
    activeText?.newStyleEffect?.getOptions()?.offset ||
      TEXT_LIFT_DEFAULT_VALUE.offset,
  );
  const handleUpdateLiftEffect = useUpdateTextStyleEffectOptions();
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
                handleUpdateLiftEffect({ offset: v }, () => setInsensity(v));
              }}
            />
          </Tooltip>
        </output>
      )}
      value={insensity}
      onChange={v => {
        if (typeof v === 'number') {
          handleUpdateLiftEffect({ offset: v }, () => setInsensity(v));
        }
      }}
    />
  );
};
