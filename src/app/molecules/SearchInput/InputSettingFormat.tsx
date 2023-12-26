import { FC } from 'react';
import { Check } from '@/app/icons';
import { SettingFilterGroupProps, SettingFilterProps } from './searchInput';
export interface InputSettingFormatProps {
  setting: SettingFilterGroupProps;
  changeSettingFormat: (settingsFormat: SettingFilterGroupProps) => void;
}

export const InputSettingFormat: FC<InputSettingFormatProps> = ({
  setting,
  changeSettingFormat,
}) => {
  const handlechangeSelect = (format: SettingFilterProps) => {
    const newFormat = [...setting.settingFilter]?.map(item => {
      if (item.key === format.key) {
        return { ...format, isSelect: !format.isSelect };
      }
      return item;
    });

    changeSettingFormat({ ...setting, settingFilter: newFormat });
  };
  return (
    <div className="w-full h-fit px-2">
      {setting.settingFilter?.map(format => {
        const { key, icon: Icon, label, isSelect } = format;
        return (
          <div
            className="w-full flex p-2 cursor-pointer justify-between items-center hover:bg-slate-100 rounded-md"
            key={key}
            onClick={() => handlechangeSelect(format)}
          >
            <div className="flex items-center">
              {Icon && <Icon className="w-[20px] h-[20px]" />}
              <span className="ml-2 text-sm"> {label}</span>
            </div>
            <div>{isSelect && <Check className="w-[20px] h-[20px]" />}</div>
          </div>
        );
      })}
    </div>
  );
};
