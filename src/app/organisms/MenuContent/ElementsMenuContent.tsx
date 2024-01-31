import { FC, useState } from 'react';
import { Square, Horizontal, Vertical } from '@/app/icons';
import SearchInput from '@/app/molecules/SearchInput';
import {
  DefaultInput,
  SettingFilterGroupProps,
  SettingFilterProps,
  SettingTypeEnum,
} from '@/app/molecules/SearchInput/searchInput';
import { Lines } from '@/app/molecules/Lines';
import { Shapes } from '@/app/molecules/Shapes';

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

const settingColor: SettingFilterProps[] = [
  { key: DefaultInput, value: '#ffffff', isSelect: false },
  { key: '#50d71e', value: '#50d71e', isSelect: false },
  { key: '#ef4444', value: '#ef4444', isSelect: false },
  { key: '#84cc16', value: '#84cc16', isSelect: false },
  { key: '#06b6d4', value: '#06b6d4', isSelect: false },
  { key: '#6366f1', value: '#6366f1', isSelect: false },
  { key: '#db2777', value: '#db2777', isSelect: false },
];

const defaultTemplateSetting = [
  {
    key: 'color',
    type: SettingTypeEnum.Color,
    name: 'Color',
    settingFilter: settingColor,
  },
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

export const ElementsMenuContent: FC = () => {
  const [templateSettingFormat, setTemplateSettingFormat] = useState<
    SettingFilterGroupProps[]
  >(defaultTemplateSetting);

  const onResetFilter = () => {
    setTemplateSettingFormat([]);
    setTemplateSettingFormat(defaultTemplateSetting);
  };
  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-6 w-full h-fit">
        <SearchInput
          recommendedKeywords={recommendedKeywords}
          placeholder="Search element"
          settingFilters={templateSettingFormat}
          hasSetting
          applyFilter={newSetting => {
            setTemplateSettingFormat(newSetting);
          }}
          onResetFilter={onResetFilter}
        />

        <Lines />
        <Shapes />
      </div>
    </div>
  );
};
