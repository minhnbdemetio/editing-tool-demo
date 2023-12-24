import { FC, useRef, useState } from 'react';
import {
  DefaultInput,
  SettingFilterGroupProps,
  SettingFilterProps,
} from './searchInput';
import { Button } from '@nextui-org/react';
import { Add } from '@/app/icons/Add';

export interface InputSettingFormatProps {
  setting: SettingFilterGroupProps;
  changeSettingFormat: (settingsFormat: SettingFilterGroupProps) => void;
}

export const InputSettingColorPicker: FC<InputSettingFormatProps> = ({
  setting,
  changeSettingFormat,
}) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeColor = (format: SettingFilterProps) => {
    const newFormat = [...setting.settingFilter]?.map(item => {
      if (item.key === format.key) {
        return { ...format, isSelect: !format.isSelect };
      }
      return { ...item, isSelect: false };
    });

    changeSettingFormat({ ...setting, settingFilter: newFormat });
  };

  const handlePickColor = (format: SettingFilterProps, value: string) => {
    const newFormat = [...setting.settingFilter]?.map(item => {
      if (item.key === format.key) {
        return { ...format, isSelect: true, value: value };
      }
      return { ...item, isSelect: false };
    });

    changeSettingFormat({ ...setting, settingFilter: newFormat });
  };

  return (
    <div className="w-full h-fit px-2 flex flex-wrap justify-between gap-2">
      {setting.settingFilter?.map((format, index) => {
        const { key, value, isSelect } = format;
        if (key === DefaultInput)
          return (
            <div
              className={`w-8 h-8 rounded-md bg-[${value}] cursor-pointer border-1 border-[rgba(90, 101, 119, 0.24)] relative ${
                isSelect &&
                'border-2	border-white shadow-[0px_0px_0px_2px_rgba(39,199,217,1)]'
              }`}
              style={{ backgroundColor: value }}
              onClick={() => {
                colorInputRef.current && colorInputRef.current.click();
              }}
              key={key}
            >
              <input
                className={`w-0 h-0 absolute top-2 left-2`}
                type="color"
                onClick={() => handleChangeColor(format)}
                onChange={e => handlePickColor(format, e.target.value)}
                value={value}
                ref={colorInputRef}
              ></input>
              <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white border-1 border-[rgba(90, 101, 119, 0.24)] flex items-center justify-center">
                <Add className="w-6 h-6" />
              </div>
            </div>
          );
        return (
          <div
            className={`w-8 h-8 rounded-md bg-[${value}] cursor-pointer border-1 border-[rgba(90, 101, 119, 0.24)] ${
              isSelect &&
              'border-2	border-white shadow-[0px_0px_0px_2px_rgba(39,199,217,1)]'
            }`}
            style={{ backgroundColor: value }}
            key={key}
            onClick={() => handleChangeColor(format)}
          ></div>
        );
      })}
    </div>
  );
};
