import {
  useActiveTextObject,
  useUpdateTextStyleEffectOptions,
} from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useState } from 'react';
import { TEXT_NEON_DEFAULT_VALUE } from '@/app/lib/moveable/constant/text';

interface NeonEffectProps {}

export const NeonEffect: FC<NeonEffectProps> = () => {
  const activeText = useActiveTextObject();
  const [neonEffect, setNeonEffect] = useState(
    activeText?.styleEffect?.getOptions() || TEXT_NEON_DEFAULT_VALUE,
  );
  const handleUpdateStyleEffect = useUpdateTextStyleEffectOptions();
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
              value={neonEffect.thickness}
              onChange={e => {
                const v = +e.target.value;
                if (isNaN(v)) return;
                handleUpdateStyleEffect({ thickness: v }, () =>
                  setNeonEffect({ thickness: v }),
                );
              }}
            />
          </Tooltip>
        </output>
      )}
      value={neonEffect.thickness}
      onChange={value => {
        if (typeof value === 'number') {
          handleUpdateStyleEffect({ thickness: value }, () =>
            setNeonEffect({ thickness: value }),
          );
        }
      }}
    />
  );
};
