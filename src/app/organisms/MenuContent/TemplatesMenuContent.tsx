import { FC, useCallback, useState } from 'react';
import { SearchInput } from '@/app/molecules/SearchInput';
import { Popover } from '@/app/atoms/Popover';
import { TemplateFilterModal } from '@/app/molecules/TemplateFilterModal';
import { TemplateFilters } from '@/app/molecules/TemplateFilters';
import useMediaQuery from '@/app/hooks/useMediaQuery';
import {
  DefaultInput,
  SettingFilterGroupProps,
  SettingFilterProps,
  SettingTypeEnum,
} from '@/app/molecules/SearchInput/searchInput';
import SliderShow from '@/app/molecules/SliderShow';
import { SliderItem } from '@/app/molecules/SliderShow/sliderShow';

const recommendedKeywords = [
  'Xuân',
  'Hạ',
  'Thu',
  'Đông',
  'Động vật',
  'Thời tiết',
  'Màu sắc',
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

const recentlyUsed: SliderItem[] = [
  {
    key: 'id001',
    url: 'https://shorturl.at/opuxU',
  },
  {
    key: 'id002',
    url: 'https://shorturl.at/tKORW',
  },
  {
    key: 'id003',
    url: 'https://shorturl.at/GQXY4',
  },
  {
    key: 'id004',
    url: 'https://shorturl.at/hmW27',
  },
  {
    key: 'id005',
    url: 'https://shorturl.at/dKNY0',
  },
  {
    key: 'id006',
    url: 'https://shorturl.at/opuxU',
  },
  {
    key: 'id007',
    url: 'https://shorturl.at/tKORW',
  },
  {
    key: 'id008',
    url: 'https://shorturl.at/GQXY4',
  },
  {
    key: 'id009',
    url: 'https://shorturl.at/hmW27',
  },
  {
    key: 'id0010',
    url: 'https://shorturl.at/dKNY0',
  },
];

export const TemplatesMenuContent: FC = () => {
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const isMobile = useMediaQuery(s => s.device === 'mobile');

  const onSettingClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFilterAnchorEl(e.currentTarget);
    },
    [],
  );

  return (
    <div className="w-full h-full">
      <div className="p-6 w-full h-fit">
        <SearchInput
          recommendedKeywords={recommendedKeywords}
          placeholder="Search templates"
          hasSetting
          onClickSetting={onSettingClick}
        />
      </div>
      {!isMobile && (
        <Popover
          name="template-filters"
          className="w-[310px] !px-[0]"
          placement="bottom"
          offset={{ x: -121, y: 4 }}
          anchorEl={filterAnchorEl}
          onClose={() => setFilterAnchorEl(null)}
        >
          <TemplateFilters />
        </Popover>
      )}
      {isMobile && (
        <TemplateFilterModal
          onClose={() => setFilterAnchorEl(null)}
          open={Boolean(filterAnchorEl)}
        />
      )}
      <div className="w-[360]  mx-2">
        <SliderShow items={recentlyUsed} title="Recently Used" />
        <SliderShow items={recentlyUsed} title="Medic" />
        <SliderShow items={recentlyUsed} title="Wedding" />
        <SliderShow items={recentlyUsed} title="Supper Bowl" />
        <SliderShow items={recentlyUsed} title="Cute" />
      </div>
    </div>
  );
};
