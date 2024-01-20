import { MoveableTextShadow } from '@/app/factories/MoveableText';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface GlitchEffectPropertyProps {}
type TextShadowOptions = 'offset' | 'direction' | 'color';
const SHADOW_OPTIONS = [
  {
    target: 'offset',
    name: 'Offset',
    type: 'number',
    step: 1,
    default: 50,
    minValue: 0,
    maxValue: 100,
  },
  {
    target: 'direction',
    name: 'Direction',
    type: 'number',
    step: 1,
    default: -45,
    minValue: -180,
    maxValue: 180,
  },
  {
    target: 'color',
    name: 'Shadow color',
    type: 'color',
    value: 'blue-pink',
  },
];

const DEFAULT_VALUE = {
  color: 'blue-pink',
  direction: -45,
  offset: 50,
};
export const GlitchEffect: FC<GlitchEffectPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [glitch, setGlitch] = useState<MoveableTextShadow>(
    activeText?.glitchEffect || DEFAULT_VALUE,
  );
  useEffect(() => {
    activeText?.setGlitchEffect(activeText?.glitchEffect || DEFAULT_VALUE);
  }, []);

  const handleChangeColor = (color: string) => {
    const value = {
      ...glitch,
      color,
    };
    setGlitch(value);
    activeText?.setGlitchEffect(value);
  };
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
                <div className="flex items-center gap-1">
                  <Button
                    className={`w-[32px] h-[32px] min-w-[32px] rounded-[4px]`}
                    style={{
                      boxShadow:
                        glitch.color === 'blue-pink'
                          ? `0 0 0 1px #8b3dff,inset 0 0 0 2px #8b3dff,inset 0 0 0 4px #fff`
                          : `unset`,
                      backgroundImage: `linear-gradient(to right, rgb(0, 255, 255), rgb(0, 255, 255)), linear-gradient(to right, rgb(255, 0, 255), rgb(255, 0, 255))`,
                      backgroundRepeat: `no-repeat`,
                      backgroundSize: `16px, 16px`,
                      backgroundPositionX: `0%, 100%`,
                    }}
                    onClick={() => handleChangeColor('blue-pink')}
                  ></Button>
                  <Button
                    className={`w-[32px] h-[32px] min-w-[32px] rounded-[4px]`}
                    style={{
                      boxShadow:
                        glitch.color !== 'blue-pink'
                          ? `0 0 0 1px #8b3dff,inset 0 0 0 2px #8b3dff,inset 0 0 0 4px #fff`
                          : `unset`,
                      backgroundImage: `linear-gradient(to right, rgb(0, 255, 255), rgb(0, 255, 255)), linear-gradient(to right, rgb(255, 0, 255), rgb(255, 0, 255))`,
                      backgroundRepeat: `no-repeat`,
                      backgroundSize: `16px, 16px`,
                      backgroundPositionX: `0%, 100%`,
                    }}
                    onClick={() => handleChangeColor('blue-red')}
                  ></Button>
                </div>
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
                          glitch && glitch[option.target as TextShadowOptions]
                        }
                        onChange={e => {
                          const v = +e.target.value;
                          if (isNaN(v)) return;
                          const value = {
                            ...glitch,
                            [option.target]: v,
                          };
                          setGlitch(value);
                          activeText?.setGlitchEffect(value);
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={
                  glitch &&
                  (glitch[option.target as TextShadowOptions] as number)
                }
                onChange={value => {
                  if (typeof value === 'number') {
                    const val = {
                      ...glitch,
                      [option.target]: value,
                    };
                    setGlitch(val);
                    activeText?.setGlitchEffect(val);
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