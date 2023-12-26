import { FC, useCallback, useState } from 'react';
import { SearchInput } from '@/app/molecules/SearchInput';
import { Popover } from '@/app/atoms/Popover';
import { TemplateFilterModal } from '@/app/molecules/TemplateFilterModal';
import { TemplateFilters } from '@/app/molecules/TemplateFilters';
import useMediaQuery from '@/app/hooks/useMediaQuery';

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
    </div>
  );
};
