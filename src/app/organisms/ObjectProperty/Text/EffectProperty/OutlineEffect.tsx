import { TextOutlineEffectOption } from '@/app/factories/MoveableText';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { EffectPickColor } from './EffectPickColor';
import { ColorResult } from 'react-color';

interface SpliceEffectPropertyProps {}
type TextShadowOptions = 'thickness' | 'color';
const SHADOW_OPTIONS = [
  {
    target: 'thickness',
    name: 'Thickness',
    type: 'number',
    step: 1,
    default: 100,
    minValue: 1,
    maxValue: 200,
  },
  {
    target: 'color',
    name: 'Shadow color',
    type: 'color',
    value: '#bfbfbf',
  },
];

const DEFAULT_VALUE = {
  color: '#bfbfbf',
  thickness: 100,
};
export const OutlineEffect: FC<SpliceEffectPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [outline, setOutline] = useState<TextOutlineEffectOption>(
    activeText?.outlineEffect || DEFAULT_VALUE,
  );
  const [colorPickerOpen, setOpenColorPicker] = useState<boolean>(false);
  useEffect(() => {
    activeText?.setOutlineEffect(activeText?.outlineEffect || DEFAULT_VALUE);
  }, []);
  const handleChangeColor = (color: ColorResult) => {
    const value = {
      ...outline,
      color: color.hex,
    };
    setOutline(value);
    activeText?.setOutlineEffect(value);
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
                  style={{ backgroundColor: outline?.color as string }}
                  onClick={() => setOpenColorPicker(!colorPickerOpen)}
                ></Button>
                {colorPickerOpen && (
                  <EffectPickColor
                    defaultColor={outline.color}
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
                          outline && outline[option.target as TextShadowOptions]
                        }
                        onChange={e => {
                          const v = +e.target.value;
                          if (isNaN(v)) return;
                          const value = {
                            ...outline,
                            [option.target]: v,
                          };
                          setOutline(value);
                          activeText?.setOutlineEffect(value);
                        }}
                      />
                    </Tooltip>
                  </output>
                )}
                value={
                  outline &&
                  (outline[option.target as TextShadowOptions] as number)
                }
                onChange={value => {
                  if (typeof value === 'number') {
                    const val = {
                      ...outline,
                      [option.target]: value,
                    };
                    setOutline(val);
                    activeText?.setOutlineEffect(val);
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
