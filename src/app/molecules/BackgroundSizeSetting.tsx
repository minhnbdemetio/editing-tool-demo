import { Accordion, AccordionItem, Divider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Ruler1 } from '../icons';
import { convertFrameSize } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSize } from '../types';
import { ListRecommendedSizes } from './ListRecommendedSizes';
import { getRecommendedSize } from '../services/page.service';
import { UNITS } from '../constants/unit-constants';
import { ManuallySettingSize } from './ManuallySettingSize';
import { twMerge } from '../utilities/tailwind';

interface BackgroundSizeSettingProps {}

export const BackgroundSizeSetting: React.FC<
  BackgroundSizeSettingProps
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
      <Accordion showDivider={false} className="w-full px-0">
        <AccordionItem
          classNames={{
            trigger: 'py-1 px-4 [&[data-open="true"]>div>span]:!text-primary1',
            title: '!text-default6',
            content: 'px-0',
          }}
          indicator={({ isOpen }) => (
            <ChevronRight
              className={twMerge('w-4 h-4 text-default6', {
                'text-primary1': isOpen,
              })}
            />
          )}
          aria-label="Enter manually"
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Ruler1 />
                <p className="text-md font-normal ">Enter manually</p>
              </div>
            </div>
          }
        >
          <ManuallySettingSize />
        </AccordionItem>
        <AccordionItem
          classNames={{
            trigger: 'py-1 px-4 [&[data-open="true"]>div>span]:!text-primary1',
            title: '!text-default6',
            content: 'px-0',
          }}
          indicator={({ isOpen }) => (
            <ChevronRight
              className={twMerge('w-4 h-4 text-default6', {
                'text-primary1': isOpen,
              })}
            />
          )}
          title={
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[10px]">
                <Ruler1 />
                <p className="text-md font-normal">Standard print size</p>
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
