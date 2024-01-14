import {
  useActiveTextObject,
  useUpdateOpacity,
} from '@/app/hooks/useActiveMoveableObject';
import { Slider, Tooltip } from '@nextui-org/react';
import { FC, useState } from 'react';

const MIN_OPACITY = 0;
const STEP = 1;
const MAX_OPACITY = 100;

export const TransparencyProperty = ({}) => {
  const activeText = useActiveTextObject();

  const [opacity, setOpacity] = useState(activeText?.getOpacity());

  const handleChangeOpacity = useUpdateOpacity();

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <span>Transparency</span>
      </div>
      <Slider
        label="Font size"
        size="sm"
        step={STEP}
        maxValue={MAX_OPACITY}
        minValue={MIN_OPACITY}
        color="foreground"
        classNames={{
          base: 'max-w-md',
          label: 'text-medium',
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
                value={opacity}
                onChange={e => {
                  const v = +e.target.value;
                  handleChangeOpacity(v, () => setOpacity(v));
                }}
              />
            </Tooltip>
          </output>
        )}
        value={opacity}
        onChange={value => {
          if (typeof value === 'number') {
            handleChangeOpacity(value, () => setOpacity(value));
          }
        }}
      />
    </div>
  );
};
