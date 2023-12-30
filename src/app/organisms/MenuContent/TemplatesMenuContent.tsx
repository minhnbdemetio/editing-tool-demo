import { FC, useCallback, useEffect, useState } from 'react';
import { TemplateSelector } from '../TemplateSelector';
import { Popover } from '@/app/atoms/Popover';
import { TemplateFilterModal } from '@/app/molecules/TemplateFilterModal';
import { TemplateFilters } from '@/app/molecules/TemplateFilters';
import useMediaQuery from '@/app/store/useMediaQuery';
import { useTemplateFilters } from '@/app/store/template-filters';
import { getFilterOptions } from '@/app/services/template/template.service';
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
    </div>
  );
};
