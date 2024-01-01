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
      <ul className={twMerge(' text-md text-gray-400 font-normal')}>
        {sizes.map(size => (
          <li
            onClick={() => onSelect(size)}
            className={twMerge(
              'hover:bg-gray-200 duration-200 group',
              'cursor-pointer  px-[45px] py-2',
            )}
            key={size.id}
          >
            <p className="flex items-center gap-2">
              {size.label}{' '}
              <span className="text-sm text-gray-[200] hidden group-hover:inline-block duration-200">
                {size.width} x {size.height} {size.unit}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
