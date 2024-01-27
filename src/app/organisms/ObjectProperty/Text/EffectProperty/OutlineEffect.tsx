import {
  useActiveTextObject,
  useUpdateTextStyleEffectOptions,
} from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider, Tooltip } from '@nextui-org/react';
import { FC, useState } from 'react';
import { EffectPickColor } from './EffectPickColor';
import { ColorResult } from 'react-color';
import { TextEffectOptions } from '@/app/lib/moveable/effects/text/TextEffect';
import { TEXT_OUTLINE_DEFAULT_VALUE } from '@/app/lib/moveable/constant/text';

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

export const OutlineEffect: FC<SpliceEffectPropertyProps> = () => {
  const activeText = useActiveTextObject();
  const [outline, setOutline] = useState<TextEffectOptions>(
    activeText?.styleEffect?.getOptions() || TEXT_OUTLINE_DEFAULT_VALUE,
  );
  const [colorPickerOpen, setOpenColorPicker] = useState<boolean>(false);
  const handleUpdateSpliceEffect = useUpdateTextStyleEffectOptions();
  const handleChangeColor = (color: ColorResult) => {
    const value = {
      ...outline,
      color: color.hex,
    };
    handleUpdateSpliceEffect(value, () => setOutline(value));
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
                          handleUpdateSpliceEffect(value, () =>
                            setOutline(value),
                          );
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
                    handleUpdateSpliceEffect(val, () => setOutline(val));
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
