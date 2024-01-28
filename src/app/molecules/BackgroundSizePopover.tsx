import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { ChevronDown } from '../icons';
import { getDisplayDimension } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSize } from '../types';
import { getRecommendedSize } from '../services/page.service';
import { BackgroundSizeSetting } from './BackgroundSizeSetting';

interface BackgroundSizePopoverProps {}

export const BackgroundSizePopover: React.FC<
  BackgroundSizePopoverProps
> = () => {
  const pageSize = usePageSize();

  return (
    <>
      <Popover placement="bottom-start" offset={10}>
        <PopoverTrigger>
          <button
            className={clsx(
              'font-normal  text-md text-gray-400 h-full min-w-[50px] flex items-center ',
              'duration-100 hover:text-primary',
            )}
          >
            <p>
              {getDisplayDimension(
                pageSize.workingUnit,
                pageSize.workingWidthPixels,
              )}{' '}
              x{' '}
              {getDisplayDimension(
                pageSize.workingUnit,
                pageSize.workingHeightPixels,
              )}
            </p>
            <ChevronDown className="text-gray-200 w-[28px] h-[18px]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className=" upload-popover rounded-md px-0 w-[420px]">
          <BackgroundSizeSetting />
        </PopoverContent>
      </Popover>
    </>
  );
};

function useFetchPageSizes(
  setSizes: React.Dispatch<React.SetStateAction<PageSize[]>>,
) {
  useEffect(() => {
    (async () => {
      try {
        const sizes = await getRecommendedSize();
        setSizes(sizes);
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();
  }, [setSizes]);
}
