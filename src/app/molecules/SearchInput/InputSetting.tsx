import { FC, useEffect, useState } from 'react';
import { InputSettingFormat } from './InputSettingFormat';
import { Button, Divider } from '@nextui-org/react';
import { InputSettingCheckbox } from './InputSettingCheckbox';
import { InputSettingColorPicker } from './InputSettingColorPicker';
import { SettingFilterGroupProps, SettingTypeEnum } from './searchInput';

export interface InputSettingProps {
  settingFilters: SettingFilterGroupProps[];
  onApplyFilter: (settingFilters: SettingFilterGroupProps[]) => void;
  onResetFilter?: () => void;
}

export const InputSetting: FC<InputSettingProps> = ({
  settingFilters,
  onApplyFilter,
  onResetFilter,
}) => {
  const [settings, setSettings] =
    useState<SettingFilterGroupProps[]>(settingFilters);

  useEffect(() => {
    setSettings(settingFilters);
  }, [settingFilters]);

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

  const handleResetFilter = () => {
    setSettings(settingFilters);
    onResetFilter && onResetFilter();
  };
  return (
    <div className="w-full h-fit py-2">
      {settings?.map((setting, index) => (
        <div key={setting.key}>
          <div className="flex justify-between align-center my-1">
            <span className="text-[#70798f] text-md cursor-default">
              {setting.name}
            </span>
            <div>
              {!index && (
                <Button size="sm" variant="ghost" onClick={handleResetFilter}>
                  Reset
                </Button>
              )}
            </div>
          </div>
          {setting.type === SettingTypeEnum.Format && (
            <InputSettingFormat
              setting={setting}
              changeSettingFormat={handleSelect}
            />
          )}
          {setting.type === SettingTypeEnum.Color && (
            <InputSettingColorPicker
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
