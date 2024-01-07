import { Button } from '@/app/atoms/Button';
import { Image, Slider, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { FC, useState } from 'react';

function resetTextEffect(el: HTMLElement) {
  el.style.textShadow = 'none';
  el.style.webkitTextFillColor = 'currentcolor';
}

type TextShadowOptions =
  | 'offset'
  | 'direction'
  | 'blur'
  | 'transparency'
  | 'color';

const TEXT_EFFECTS_STYLES = [
  {
    id: 'none',
    name: 'None',
    imgUrl: '/text-effects/styles/none.webp',
    options: [],
    effectFn: resetTextEffect,
  },
  {
    id: 'shadow',
    name: 'Shadow',
    imgUrl: '/text-effects/styles/shadow.webp',
    options: [
      {
        target: 'offset',
        name: 'Offset',
        type: 'number',
        default: 50,
        step: 1,
        minValue: 0,
        maxValue: 100,
      },
      {
        target: 'direction',
        name: 'Direction',
        type: 'number',
        default: -45,
        step: 1,
        minValue: -180,
        maxValue: 180,
      },
      {
        target: 'blur',
        name: 'Shadow blur',
        type: 'number',
        step: 1,
        default: 0,
        minValue: 0,
        maxValue: 100,
      },
      {
        target: 'transparency',
        name: 'Transparency',
        type: 'number',
        default: 40,
        step: 1,
        minValue: 0,
        maxValue: 100,
      },
      {
        target: 'color',
        name: 'Shadow color',
        type: 'color',
        value: '#000000',
      },
    ],
    effectFn: (el: HTMLElement, textShadow: string) => {
      resetTextEffect(el);
      el.style.textShadow = textShadow;
    },
  },
  {
    id: 'lift',
    name: 'Lift',
    imgUrl: '/text-effects/styles/lift.webp',
  },
  {
    id: 'hollow',
    name: 'Hollow',
    imgUrl: '/text-effects/styles/hollow.webp',
  },
  {
    id: 'emboss',
    name: 'Splice',
    imgUrl: '/text-effects/styles/splice.webp',
  },
  {
    id: 'outline',
    name: 'Outline',
    imgUrl: '/text-effects/styles/outline.webp',
  },
  {
    id: 'echo',
    name: 'Echo',
    imgUrl: '/text-effects/styles/echo.webp',
  },
  {
    id: 'glitch',
    name: 'Glitch',
    imgUrl: '/text-effects/styles/glitch.webp',
  },
  {
    id: 'neon',
    name: 'Neon',
    imgUrl: '/text-effects/styles/neon.webp',
  },
  {
    id: 'background',
    name: 'Background',
    imgUrl: '/text-effects/styles/background.webp',
  },
];

interface SpacingPropertyProps {}

export const EffectProperty: FC<SpacingPropertyProps> = ({}) => {
  const [effectStyle, setEffectStyle] = useState('none');
  const [textShadow, setTextShadow] = useState<
    { [key in TextShadowOptions]: string | number }
  >({
    offset: 50,
    direction: -45,
    blur: 0,
    transparency: 40,
    color: '#000000',
  });
  return (
    <div className="w-full h-full overflow-auto">
      <div className="text-center mb-3">
        <span>Effects</span>
      </div>
      <p className="mb-[12px]">Style</p>
      <div className="flex gap-2 items-center overflow-auto">
        {TEXT_EFFECTS_STYLES.map(style => (
          <div className="effect-styles" key={style.id}>
            <div
              className="group flex flex-col flex-1 gap-1 items-center w-[60px] cursor-pointer"
              onClick={() => setEffectStyle(style.id)}
            >
              <Image
                className={clsx('border', {
                  'border-gray-300': effectStyle !== style.id,
                  'border-blue-500': effectStyle === style.id,
                })}
                width={60}
                alt={style.name}
                src={style.imgUrl}
                radius="sm"
                style={{ maxWidth: '60px' }}
              />
              <p className="text-center font-light text-[10px]">
                <span>{style.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {TEXT_EFFECTS_STYLES.map(style => {
        if (style.id !== effectStyle || !style.options?.length) return null;
        return (
          <div key={style.id} className="effect-options font-light text-[14px]">
            {style.options.map(option => {
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
                        style={{ backgroundColor: textShadow.color as string }}
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
                                textShadow[option.target as TextShadowOptions]
                              }
                              onChange={e => {
                                const v = +e.target.value;
                                if (isNaN(v)) return;
                                setTextShadow({
                                  ...textShadow,
                                  [option.target as TextShadowOptions]: v,
                                });
                              }}
                            />
                          </Tooltip>
                        </output>
                      )}
                      value={
                        textShadow[option.target as TextShadowOptions] as number
                      }
                      onChange={value => {
                        if (typeof value === 'number') {
                          setTextShadow({
                            ...textShadow,
                            [option.target as TextShadowOptions]: value,
                          });
                        }
                      }}
                    />
                  );
                }
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
