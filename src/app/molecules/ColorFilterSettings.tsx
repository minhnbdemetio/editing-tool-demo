import React, { useMemo, useRef, useState } from 'react';
import { twMerge } from '../utilities/tailwind';
import { SketchPicker } from 'react-color';
import { Popover } from '../atoms/Popover';

interface ColorFilterSettingProps {
  selected?: string;
  onChange?: (color: string) => void;
  defaultValues: string[];
}

export const ColorFilterSetting: React.FC<ColorFilterSettingProps> = ({
  selected,
  onChange = () => {},
  defaultValues,
}) => {
  const selectedDefaultColor = useMemo(
    () => defaultValues.find(dv => dv === selected),
    [selected, defaultValues],
  );

  const [manuallyColor, setManuallyColor] = useState('');

  const [manuallyAnchorEl, setManuallyAnchorEl] =
    useState<HTMLDivElement | null>(null);

  const hasColor = useMemo(() => !!selected, [selected]);

  return (
    <div className="grid grid-cols-7 gap-2">
      <div
        className={twMerge(
          'w-full h-auto aspect-square rounded-[50%] border-border overflow-hidden border-[1px] border-solid',
          {
            'p-[2px] border-green-500 border-[2px]': false,
          },
        )}
      >
        <div
          onClick={e => {
            setManuallyAnchorEl(e.currentTarget);
          }}
          className={twMerge(
            `w-full h-auto aspect-square rounded-[50%] !scale-100`,
            `border-border border-[1px] border-solid`,

            {
              'p-1 border-green-500 border-[2px]':
                !selectedDefaultColor && manuallyColor,
            },
          )}
        >
          <div
            style={
              manuallyColor
                ? { backgroundColor: manuallyColor }
                : { backgroundImage: "url('/multi_color.png')" }
            }
            className="w-full h-full rounded-[50%] bg-cover bg-no-repeat bg-center"
          ></div>
        </div>

        <Popover
          name="color-pickers"
          className="!p-0"
          placement="bottom-end"
          anchorEl={manuallyAnchorEl}
          backdropClassName="z-[120]"
          onClose={() => setManuallyAnchorEl(null)}
        >
          <SketchPicker
            color={selected}
            onChange={cl => {
              setManuallyColor(cl.hex);
              onChange(cl.hex);
            }}
          ></SketchPicker>
        </Popover>
      </div>
      {defaultValues.map(color => (
        <div
          key={color}
          onClick={() => onChange(color)}
          className={twMerge(
            'w-full h-auto aspect-square rounded-[50%] border-border overflow-hidden border-[1px] border-solid',
            {
              'p-[2px] border-green-500 border-[2px]':
                hasColor && color === selected,
            },
          )}
        >
          <div
            style={{ backgroundColor: color }}
            className="w-full h-full rounded-[50%]"
          ></div>
        </div>
      ))}
    </div>
  );
};
