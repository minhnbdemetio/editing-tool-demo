import { FC, useState } from 'react';
import { Square, Horizontal, Vertical } from '@/app/icons';
import {
  SearchInput,
  SettingFilterGroupProps,
  SettingTypeEnum,
} from '@/app/molecules/SearchInput';
import { SettingFilterProps } from '@/app/molecules/SearchInput/InputSetting';

const recommendedKeywords = [
  'Xuân',
  'Hạ',
  'Thu',
  'Đông',
  'Động vật',
  'Thời tiết',
  'Màu sắc',
];
const settingsFormat: SettingFilterProps[] = [
  { key: 'square', icon: Square, label: 'Square' },
  { key: 'horizontal', icon: Horizontal, label: 'Horizontal' },
  { key: 'vertical', icon: Vertical, label: 'Vertical' },
];
const settingsPrice: SettingFilterProps[] = [
  { key: 'free', label: 'Free', isSelect: false },
  { key: 'premium', label: 'Premium', isSelect: false },
];
const settingsTempo: SettingFilterProps[] = [
  { key: 'slow', label: 'Slow', isSelect: false },
  { key: 'fast', label: 'Fast', isSelect: false },
];

const defaultTemplateSetting = [
  {
    key: 'format',
    type: SettingTypeEnum.Format,
    name: 'Format',
    settingFilter: settingsFormat,
  },
  {
    key: 'Price',
    type: SettingTypeEnum.Checkbox,
    name: 'Price',
    settingFilter: settingsPrice,
  },
  {
    key: 'tempo',
    type: SettingTypeEnum.CheckboxSingle,
    name: 'Tempo',
    settingFilter: settingsTempo,
  },
];
export const TemplatesMenuContent: FC = () => {
  const [templateSettingFormat, setTemplateSettingFormat] = useState<
    SettingFilterGroupProps[]
  >(defaultTemplateSetting);

  const onResetFilter = () => {
    setTemplateSettingFormat([]);
    setTemplateSettingFormat(defaultTemplateSetting);
  };
  return (
    <div className="w-full h-full">
      <div className="p-6 w-full h-fit">
        <SearchInput
          recommendedKeywords={recommendedKeywords}
          placeholder="Search templates"
          settingFilters={templateSettingFormat}
          hasSetting
          applyFilter={newSetting => {
            setTemplateSettingFormat(newSetting);
          }}
          onResetFilter={onResetFilter}
        />
      </div>
    </div>
  );
};
