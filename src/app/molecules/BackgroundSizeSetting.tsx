import { Accordion, AccordionItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Ruler1 } from '../icons';
import { convertFrameSize } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSize } from '../types';
import { ListRecommendedSizes } from './ListRecommendedSizes';
import { getRecommendedSize } from '../services/page.service';
import { UNITS } from '../constants/unit-constants';
import { ManuallySettingSize } from './ManuallySettingSize';
import { twMerge } from '../utilities/tailwind';
import clsx from 'clsx';

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

  const backgroundSizeSettingOptions = [
    {
      label: 'Enter manually',
      content: <ManuallySettingSize />,
    },
    {
      label: 'Standard print size',
      content: (
        <ListRecommendedSizes
          onSelect={onSelectRecommendedSize}
          sizes={sizes}
        />
      ),
    },
  ];

  useFetchPageSizes(setSizes);

  return (
    <>
      <Accordion showDivider={false} className="w-full px-4">
        {backgroundSizeSettingOptions.map(({ label, content }) => (
          <AccordionItem
            key={label}
            className="data-[open=true]:border-none"
            classNames={{
              trigger:
                'py-3 border-b border-b-[#82828226] data-[open=true]:border-none [&[data-open="true"]>div>span]:text-primary1 [&[data-open="true"]>div>span]:font-bold [&[data-open="true"]>span]:-rotate-180',
              content:
                'pt-0 pb-4 data-[open=true]:border-b border-b-[#82828226]',
            }}
            indicator={({ isOpen }) => (
              <ChevronDown
                className={twMerge(
                  clsx('w-4 h-4', {
                    'text-primary1': isOpen,
                    'text-primaryGray': !isOpen,
                  }),
                )}
              />
            )}
            aria-label={label}
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Ruler1 />
                  <p className="text-smd leading-4.5">{label}</p>
                </div>
              </div>
            }
          >
            {content}
          </AccordionItem>
        ))}
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
