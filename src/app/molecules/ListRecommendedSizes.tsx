import React, { useEffect, useState } from 'react';
import { getRecommendedSize } from '../services/page.service';
import { usePageSize } from '../store/use-page-size';
import { PageSize } from '../types';
import { twMerge } from '../utilities/tailwind';

interface ListRecommendedSizesProps {
  sizes: PageSize[];
  onSelect?: (size: PageSize) => void;
}

export const ListRecommendedSizes: React.FC<ListRecommendedSizesProps> = ({
  sizes,
  onSelect = () => {},
}) => {
  return (
    <div>
      <ul className={twMerge('text-smm leading-4 space-y-3 py-2')}>
        {sizes.map(size => (
          <li onClick={() => onSelect(size)} key={size.id}>
            <button className="px-[34px] group w-full">
              <p className="flex items-center gap-2">
                {size.label}{' '}
                <span className="text-sm text-gray-[200] hidden group-hover:inline-block duration-200">
                  {size.width} x {size.height} {size.unit}
                </span>
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
