import React, { useCallback, useState } from 'react';
import { FilterSection } from '../atoms/ FilterSection';
import { ColorFilterSetting } from './ColorFilterSettings';
import { twMerge } from '../utilities/tailwind';
import { Checkbox } from '@nextui-org/react';

interface TemplateFiltersProps {}

const DEFAULT_VALUES = [
  'rgb(255, 82, 82)',
  'rgb(255, 158, 72)',
  'rgb(254, 230, 13)',
  'rgb(169, 234, 46)',
  'rgb(13, 200, 77)',
  'rgb(147, 242, 221)',
  'rgb(56, 128, 255)',
  'rgb(47, 65, 249)',
  'rgb(153, 94, 255)',
  'rgb(255, 132, 234)',
  'rgb(255, 255, 255)',
  'rgb(191, 191, 191)',
  'rgb(0, 0, 0)',
];

const PRICE_FILTER = [
  { label: 'Cheap', id: 1 },
  { label: 'Normal', id: 2 },
  { label: 'High-end', id: 3 },
];

const DEFAULT_SELECTED_COLOR = DEFAULT_VALUES[0];

export const TemplateFilters: React.FC<TemplateFiltersProps> = () => {
  const [selectedColor, setSelectedColor] = useState('rgb(191, 191, 191)');

  const onReset = useCallback(() => {
    setSelectedColor(DEFAULT_SELECTED_COLOR);
  }, []);

  return (
    <>
      <div className="px-4 pb-2">
        <FilterSection
          title="Color"
          endAdornment={
            <button
              onClick={onReset}
              className={twMerge(
                'leading-[24px] h-[24px] text-[12px] text-gray-500 font-normal border-border border-[1px] border-solid px-2 rounded-[14px] font-[500]',
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
            defaultValues={DEFAULT_VALUES}
          />
        </FilterSection>
        <FilterSection title="Price">
          <div className={twMerge('grid grid-cols-2 gap-2')}>
            {PRICE_FILTER.map(price => (
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
      </div>

      <div className="pt-2 px-4 border-t-border border-t-[1px] border-solid">
        <button className="bg-green-500 w-full text-md font-[500] font-normal h-[40px] text-primaryContrast rounded-md">
          Apply filters
        </button>
      </div>
    </>
  );
};
