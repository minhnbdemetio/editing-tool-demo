import { TextSpliceEffectOption } from '@/app/lib/moveable/text/MoveableText';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { EffectPickColor } from './EffectPickColor';
import { ColorResult } from 'react-color';

interface SpliceEffectPropertyProps {}
type TextShadowOptions = 'offset' | 'direction' | 'thickness' | 'color';
const SHADOW_OPTIONS = [
  {
    target: 'thickness',
    name: 'Thickness',
    type: 'number',
    step: 1,
    default: 50,
    minValue: 1,
    maxValue: 100,
  },
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
    target: 'color',
    name: 'Shadow color',
    type: 'color',
    value: '#000000',
  },
];

const DEFAULT_VALUE = {
  color: '#808080',
  offset: 50,
  direction: -45,
  thickness: 50,
};
export const SpliceEffect: FC<SpliceEffectPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [spliceEffect, setSpliceEffect] = useState<
    TextSpliceEffectOption | undefined
  >(activeText?.spliceEffect || DEFAULT_VALUE);
  const [colorPickerOpen, setOpenColorPicker] = useState<boolean>(false);
  useEffect(() => {
    activeText?.setSpliceEffect(activeText?.spliceEffect || DEFAULT_VALUE);
  }, []);
  const handleChangeColor = (color: ColorResult) => {
    const value = {
      ...spliceEffect,
      color: color.hex,
    };
    setSpliceEffect(value);
    activeText?.setSpliceEffect(value);
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
                  style={{ backgroundColor: spliceEffect?.color as string }}
                  onClick={() => setOpenColorPicker(!colorPickerOpen)}
                ></Button>
                {colorPickerOpen && (
                  <EffectPickColor
                    defaultColor={spliceEffect?.color}
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
                          spliceEffect &&
                          spliceEffect[option.target as TextShadowOptions]
                        }
                        onChange={e => {
                          const v = +e.target.value;
                          if (isNaN(v)) return;
                          const value = {
                            ...spliceEffect,
                            [option.target]: v,
                          };
                          setSpliceEffect(value);
                          activeText?.setSpliceEffect(value);
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={
                  spliceEffect &&
                  (spliceEffect[option.target as TextShadowOptions] as number)
                }
                onChange={value => {
                  if (typeof value === 'number') {
                    const val = {
                      ...spliceEffect,
                      [option.target]: value,
                    };
                    setSpliceEffect(val);
                    activeText?.setSpliceEffect(val);
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
