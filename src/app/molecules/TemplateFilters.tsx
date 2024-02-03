'use client';

import React, { useCallback, useState } from 'react';
import { FilterSection } from '../atoms/FilterSection';
import { ColorFilterSetting } from './ColorFilterSettings';
import { twMerge } from '../utilities/tailwind';
import { Checkbox } from '@nextui-org/react';
import { useTemplateFilters } from '../store/template-filters';
import { TemplateFilterType } from '../types';

interface TemplateFiltersProps {}

export const TemplateFilters: React.FC<TemplateFiltersProps> = () => {
  const [selectedColor, setSelectedColor] = useState('rgb(191, 191, 191)');

  const templateFilters = useTemplateFilters(s => s.templates);

  const onReset = useCallback(() => {}, []);

  const renderTemplateFilter = (templateFilter: TemplateFilterType) => {
    if (templateFilter.type === 'color') {
      return (
        <FilterSection
          title="Color"
          endAdornment={
            <button
              onClick={onReset}
              className={twMerge(
                'leading-[24px] h-[24px] text-[12px] text-gray-500 font-normal border-border border-px border-solid px-2 rounded-[14px] font-[500]',
                'hover:text-black-500',
              )}
            >
              Reset
            </button>
          }
        >
          <ColorFilterSetting
            selected={selectedColor}
            onChange={setSelectedColor}
            defaultValues={templateFilter.colors}
          />
        </FilterSection>
      );
    }

    if (templateFilter.type === 'price') {
      return (
        <FilterSection title="Price">
          <div className={twMerge('grid grid-cols-2 gap-2')}>
            {templateFilter.prices.map(price => (
              <Checkbox
                classNames={{
                  label: 'text-md font-normal text-black-500',
                  icon: 'w-[24px] h-[24px]',
                  wrapper: 'w-[26px] h-[26px]',
                }}
                key={price.id}
                size="lg"
              >
                {price.label}
              </Checkbox>
            ))}
          </div>
        </FilterSection>
      );
    }

    return null;
  };

  return (
    <>
      <div className="px-4 pb-2">
        {templateFilters.map(template => (
          <div key={template.id}>{renderTemplateFilter(template)}</div>
        ))}
      </div>

      <div className="pt-2 px-4 border-t-border border-t-[1px] border-solid">
        <button className="bg-green-500 w-full text-md font-[500] font-normal h-[40px] text-primaryContrast rounded-md">
          Apply filters
        </button>
      </div>
    </>
  );
};
