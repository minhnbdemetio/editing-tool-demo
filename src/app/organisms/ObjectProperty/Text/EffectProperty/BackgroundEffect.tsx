import { MoveableTextShadow } from '@/app/factories/MoveableText';
import { useActiveMoveableTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

type TextShadowOptions = 'offset' | 'direction' | 'thickness' | 'color';
const SHADOW_OPTIONS = [
  {
    target: 'offset',
    name: 'Roundness',
    type: 'number',
    step: 1,
    default: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    target: 'thickness',
    name: 'Spread',
    type: 'number',
    step: 1,
    default: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    target: 'direction',
    name: 'Spread',
    type: 'number',
    step: 1,
    default: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    target: 'color',
    name: 'Shadow color',
    type: 'color',
    value: '#ffed00',
  },
];

const DEFAULT_VALUE = {
  color: '#ffed00',
  direction: 50,
  offset: 50,
};
export const BackGroundEffect: FC = () => {
  const activeText = useActiveMoveableTextObject();
  const [backgroud, setBackground] = useState<MoveableTextShadow>(
    activeText?.backgroundEffect || DEFAULT_VALUE,
  );
  useEffect(() => {
    activeText?.setBackgroundEffect(activeText?.echoEffect || DEFAULT_VALUE);
  }, []);
  return (
    <>
      {SHADOW_OPTIONS.map(option => {
        switch (option.type) {
          case 'color': {
            return (
              <div
                key={option.target}
                className="mt-[12px] flex items-center justify-between"
              >
                <p>Color</p>
                <Button
                  className={`w-[32px] h-[32px] min-w-[32px] rounded-[4px]`}
                  style={{ backgroundColor: backgroud?.color as string }}
                ></Button>
              </div>
            );
          }
          case 'number': {
            return (
              <Slider
                key={option.target}
                label={option.name}
                size="sm"
                step={option.step}
                maxValue={option.maxValue}
                minValue={option.minValue}
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
                        value={
                          backgroud &&
                          backgroud[option.target as TextShadowOptions]
                        }
                        onChange={e => {
                          const v = +e.target.value;
                          if (isNaN(v)) return;
                          const value = {
                            ...backgroud,
                            [option.target]: v,
                          };
                          setBackground(value);
                          activeText?.setBackgroundEffect(value);
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={
                  backgroud &&
                  (backgroud[option.target as TextShadowOptions] as number)
                }
                onChange={value => {
                  if (typeof value === 'number') {
                    const val = {
                      ...backgroud,
                      [option.target]: value,
                    };
                    setBackground(val);
                    activeText?.setBackgroundEffect(val);
                  }
                }}
              />
            );
          }
        }
      })}
    </>
  );
};
