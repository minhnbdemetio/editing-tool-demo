import { FC, useState } from 'react';
import { InputSettingFormat } from './InputSettingFormat';
import { Button, Divider } from '@nextui-org/react';
import { SettingFilterGroupProps, SettingTypeEnum } from '.';
import { InputSettingCheckbox } from './InputSettingCheckbox';

export interface SettingFilterProps {
  key: string;
  icon?: FC<{ className?: string }>;
  label: string;
  isSelect?: boolean;
}

export interface InputSettingProps {
  settingFilters: SettingFilterGroupProps[];
  onApplyFilter: (settingFilters: SettingFilterGroupProps[]) => void;
}

export const InputSetting: FC<InputSettingProps> = ({
  settingFilters,
  onApplyFilter,
}) => {
  const [settings, setSettings] =
    useState<SettingFilterGroupProps[]>(settingFilters);

  const handleSelect = (format: SettingFilterGroupProps) => {
    const newSetting = [...settings]?.map(item => {
      if (item.key === format.key) {
        return format;
      }
      return item;
    });
    setSettings(newSetting);
  };
  const handleApplyFilter = () => {
    onApplyFilter(settings);
  };
  return (
    <div className="w-full h-fit py-2">
      {settings?.map(setting => (
        <div key={setting.key}>
          <span className="text-[#70798f] text-md cursor-default">
            {setting.name}
          </span>
          {setting.type === SettingTypeEnum.Format && (
            <InputSettingFormat
              setting={setting}
              changeSettingFormat={handleSelect}
            />
          )}
          {setting.type === SettingTypeEnum.Checkbox && (
            <InputSettingCheckbox
              setting={setting}
              changeSettingFormat={handleSelect}
            />
          )}
          {setting.type === SettingTypeEnum.CheckboxSingle && (
            <InputSettingCheckbox
              setting={setting}
              changeSettingFormat={handleSelect}
              isCheckSingle
            />
          )}
        </div>
      ))}
      <Divider className="my-4" />
      <Button
        className="w-full"
        color="primary"
        variant="solid"
        onClick={handleApplyFilter}
      >
        Apply filter
      </Button>
    </div>
  );
};
