import {
  Accordion,
  AccordionItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Ruler } from '../icons';
import { convertFrameSize, getDisplayDimension } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSize } from '../types';
import { ListRecommendedSizes } from './ListRecommendedSizes';
import { getRecommendedSize } from '../services/page.service';
import { UNITS } from '../constants/unit-constants';
import { ManuallySettingSize } from './ManuallySettingSize';

interface BackgroundSizePopoverProps {}

export const BackgroundSizePopover: React.FC<
  BackgroundSizePopoverProps
> = () => {
  const pageSize = usePageSize();

  const [sizes, setSizes] = useState<PageSize[]>([]);

  const onSelectRecommendedSize = (size: PageSize) => {
    const width = convertFrameSize(size.unit, UNITS.PIXEL, size.width, null);
    const height = convertFrameSize(size.unit, UNITS.PIXEL, size.height, null);

    const defaultCuttingSize = convertFrameSize(
      UNITS.MILLIMETER,
      UNITS.PIXEL,
      2,
      null,
    );

    const workingHeightPixels = size.workingHeight
      ? convertFrameSize(size.unit, 'px', size.workingHeight, null)
      : height + defaultCuttingSize;
    const workingWidthPixels = size.workingWidth
      ? convertFrameSize(size.unit, 'px', size.workingWidth, null)
      : width + defaultCuttingSize;

    pageSize.update({
      workingUnit: size.unit,
      cuttingUnit: size.unit,
      workingHeightPixels,
      workingWidthPixels,
      cuttingHeightPixels: height,
      cuttingWidthPixels: width,
    });
  };

  useFetchPageSizes(setSizes);

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
          <Accordion showDivider={false} className="w-full px-0">
            <AccordionItem
              classNames={{
                trigger: 'py-1 px-4',
                content: 'px-0',
              }}
              aria-label="Enter manually"
              title={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    <Ruler className="w-[20px] h-[20px] text-black-500" />
                    <p className="text-md font-normal text-gray-500">
                      Enter manually
                    </p>
                  </div>
                </div>
              }
            >
              <ManuallySettingSize />
            </AccordionItem>

            <AccordionItem
              aria-label="Standard print size"
              classNames={{
                trigger: 'py-1 px-4',
                content: 'px-0',
              }}
              title={
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-[10px]">
                    <Ruler className="w-[20px] h-[20px] text-black-500" />
                    <p className="text-md font-normal text-gray-500">
                      Standard print size
                    </p>
                  </div>
                </div>
              }
            >
              <div className="w-full ">
                <ListRecommendedSizes
                  onSelect={onSelectRecommendedSize}
                  sizes={sizes}
                />
              </div>
            </AccordionItem>
          </Accordion>
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
