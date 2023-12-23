import { FC } from 'react';
import { SettingFilterGroupProps } from '.';
import { SettingFilterProps } from './InputSetting';
import { Checkbox } from '@nextui-org/react';

export interface InputSettingCheckboxProps {
  setting: SettingFilterGroupProps;
  changeSettingFormat: (settingsFormat: SettingFilterGroupProps) => void;
  isCheckSingle?: boolean;
}

export const InputSettingCheckbox: FC<InputSettingCheckboxProps> = ({
  setting,
  changeSettingFormat,
  isCheckSingle = false,
}) => {
  const handlechangeSelect = (format: SettingFilterProps) => {
    const newFormat = [...setting.settingFilter]?.map(item => {
      if (item.key === format.key) {
        return { ...format, isSelect: !format.isSelect };
      }
      return isCheckSingle ? { ...item, isSelect: false } : item;
    });

    changeSettingFormat({ ...setting, settingFilter: newFormat });
  };
  return (
    <div className="w-full h-fit px-2">
      {setting.settingFilter?.map((format, index) => {
        const { label, isSelect } = format;
        return (
          <div
            className="w-full flex p-2 cursor-pointer justify-between items-center hover:bg-slate-100 rounded-md"
            key={index}
          >
            <div className="flex items-center">
              <Checkbox
                isSelected={isSelect}
                radius="sm"
                onClick={() => handlechangeSelect(format)}
              >
                <span className="text-sm"> {label}</span>
              </Checkbox>
            </div>
          </div>
        );
      })}
    </div>
  );
};
