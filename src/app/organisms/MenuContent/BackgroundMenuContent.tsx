import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateSelector } from '../TemplateSelector';
import { Popover } from '@/app/atoms/Popover';
import { TemplateFilterModal } from '@/app/molecules/TemplateFilterModal';
import { TemplateFilters } from '@/app/molecules/TemplateFilters';
import useMediaQuery from '@/app/store/useMediaQuery';
import { useTemplateFilters } from '@/app/store/template-filters';
import { getFilterOptions } from '@/app/services/template/template.service';
import SearchInput from '@/app/molecules/SearchInput';
import { Add, BackgroundColor, BackgroundNone } from '@/app/icons';
import { twMerge } from '@/app/utilities/tailwind';

export const BackgroundMenuContent: FC = () => {
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const defaultColors = ['#EA4335', '#FBBC05', '#94DFFF', '#FFFFFF'];
  const [selected, setSelected] = useState('');
  const hasColor = useMemo(() => !!selected, [selected]);
  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="text-default8 text-center text-md font-bold leading-normal mb-2">
        Background
      </div>
      <div className="w-full h-full">
        <div className="flex justify-between">
          <div className="relative cursor-pointer">
            <BackgroundColor className="w-12 h-12" />
            <div className="bg-white w-6 h-6 rounded-[50%] absolute top-3 left-3 flex items-center justify-center">
              <Add className="w-5 h-5 text-default6" />
            </div>
          </div>
          <div className="cursor-pointer">
            <BackgroundNone className="w-12 h-12 text-none" />
          </div>
          {defaultColors.map(color => (
            <div
              key={color}
              onClick={() => {
                setSelected(color);
              }}
              className={twMerge(
                'w-12 h-12 aspect-square rounded-lg border-border overflow-hidden border-[1px] border-solid cursor-pointer',
                {
                  'p-[2px] border-primary1 border-[2px]':
                    hasColor && color === selected,
                },
              )}
            >
              <div
                style={{ backgroundColor: color }}
                className="w-full h-full rounded-lg"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
