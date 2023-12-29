import { FC, useCallback, useEffect, useState } from 'react';
import { TemplateSelector } from '../TemplateSelector';
import { Popover } from '@/app/atoms/Popover';
import { TemplateFilterModal } from '@/app/molecules/TemplateFilterModal';
import { TemplateFilters } from '@/app/molecules/TemplateFilters';
import useMediaQuery from '@/app/store/useMediaQuery';
import { SliderItem } from '@/app/molecules/SliderShow/sliderShow';
import { useTemplateFilters } from '@/app/store/template-filters';
import { getFilterOptions } from '@/app/services/template.service';
import { useActivePage } from '@/app/store/active-page';
import { fabric } from 'fabric';
import SearchInput from '@/app/molecules/SearchInput';

const recommendedKeywords = [
  'Xuân',
  'Hạ',
  'Thu',
  'Đông',
  'Động vật',
  'Thời tiết',
  'Màu sắc',
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

  const setTemplateFilters = useTemplateFilters(s => s.setTemplates);

  useEffect(() => {
    (async () => {
      const templateFilters = await getFilterOptions();

      setTemplateFilters(templateFilters);
    })();
  }, [setTemplateFilters]);

  const onSettingClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFilterAnchorEl(e.currentTarget);
    },
    [],
  );

  const { activePage } = useActivePage();

  const handleAddPhoto = (item: SliderItem) => {
    fabric.Image.fromURL(
      item.url,
      image => (activePage.canvas as fabric.Canvas)?.add(image),
      {
        hasControls: true,
        hasRotatingPoint: true,
        selectable: true,
        scaleX: 0.1,
        scaleY: 0.1,
      },
    );
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <SearchInput
        recommendedKeywords={recommendedKeywords}
        placeholder="Search templates"
        hasSetting
        onClickSetting={onSettingClick}
      />

      <TemplateSelector />

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
      {/* <div className="w-[360]  mx-2">
        <SliderShow
          items={recentlyUsed}
          title="Recently Used"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          items={recentlyUsed}
          title="Medic"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          items={recentlyUsed}
          title="Wedding"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          items={recentlyUsed}
          title="Supper Bowl"
          handleClickItem={handleAddPhoto}
        />
        <SliderShow
          items={recentlyUsed}
          title="Cute"
          handleClickItem={handleAddPhoto}
        />
      </div> */}
    </div>
  );
};
