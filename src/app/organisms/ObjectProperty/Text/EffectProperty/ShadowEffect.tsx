import { MoveableTextShadow } from '@/app/factories/MoveableText';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { EffectPickColor } from './EffectPickColor';
import { ColorResult } from 'react-color';

interface ShadowPropertyProps {}
type TextShadowOptions =
  | 'offset'
  | 'direction'
  | 'blur'
  | 'transparency'
  | 'color';
const SHADOW_OPTIONS = [
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
];

const DEFAULT_VALUE = {
  color: '#000',
  offset: 50,
  direction: 45,
  blur: 0,
  transparency: 40,
};

export const ShadowEffect: FC<ShadowPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [textShadow, setTextShadow] = useState<MoveableTextShadow | undefined>(
    activeText?.getTextShadow() || DEFAULT_VALUE,
  );
  const [colorPickerOpen, setOpenColorPicker] = useState<boolean>(false);
  useEffect(() => {
    activeText?.setTextShadow(activeText?.getTextShadow() || DEFAULT_VALUE);
  }, []);
  const handleChangeColor = (color: ColorResult) => {
    const value = {
      ...textShadow,
      color: color.hex,
    };
    setTextShadow(value);
    activeText?.setTextShadow(value);
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
                <Button
                  className={`w-[32px] h-[32px] min-w-[32px] rounded-[4px]`}
                  style={{ backgroundColor: textShadow?.color as string }}
                  onClick={() => setOpenColorPicker(!colorPickerOpen)}
                ></Button>
                {colorPickerOpen && (
                  <EffectPickColor
                    defaultColor={textShadow?.color}
                    onChangeColor={handleChangeColor}
                    onCloseColorPicker={() => setOpenColorPicker(false)}
                  />
                )}
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
                          textShadow &&
                          textShadow[option.target as TextShadowOptions]
                        }
                        onChange={e => {
                          const v = +e.target.value;
                          if (isNaN(v)) return;
                          const value = {
                            ...textShadow,
                            [option.target]: v,
                          };
                          setTextShadow(value);
                          activeText?.setTextShadow(value);
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={
                  textShadow &&
                  (textShadow[option.target as TextShadowOptions] as number)
                }
                onChange={value => {
                  if (typeof value === 'number') {
                    const val = {
                      ...textShadow,
                      [option.target]: value,
                    };
                    setTextShadow(val);
                    activeText?.setTextShadow(val);
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
