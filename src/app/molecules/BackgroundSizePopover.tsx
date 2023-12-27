import {
  Accordion,
  AccordionItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, LockClosed, LockOpen, Ruler } from '../icons';
import { convertFrameSize, getDisplayDimension } from '../utilities/units';
import { UNITS } from '../constants/unit-constants';
import { usePageSize } from '../store/use-page-size';
import { PageSizeGroupInput } from './PageSizeGroupInput';

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
              'font-normal text-md text-gray-400 h-full min-w-[50px] flex items-center ',
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
        <PopoverContent className=" upload-popover rounded-md px-2 w-[300px]">
          <Accordion showDivider={false} className="w-full">
            <AccordionItem
              aria-label="Accordion 1"
              title={
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-[10px]">
                    <Ruler className="w-[20px] h-[20px] text-black-500" />
                    <p className="text-md font-normal text-black-500">
                      Enter manually
                    </p>
                  </div>
                </div>
              }
            >
              <div className="w-full px-4 ">
                <form>
                  <div className="grid grid-cols-1 gap-1">
                    <PageSizeGroupInput
                      changeHeight={workingHeightPixels => {
                        console.debug(workingHeightPixels);
                        pageSize.update({ workingHeightPixels });
                      }}
                      changeWidth={workingWidthPixels => {
                        pageSize.update({ workingWidthPixels });
                      }}
                      changeUnit={workingUnit =>
                        pageSize.update({ workingUnit })
                      }
                      height={pageSize.workingHeightPixels}
                      width={pageSize.workingWidthPixels}
                      unit={pageSize.workingUnit}
                    />
                    <PageSizeGroupInput
                      changeHeight={cuttingHeightPixels => {
                        pageSize.update({ cuttingHeightPixels });
                      }}
                      changeWidth={cuttingWidthPixels => {
                        pageSize.update({ cuttingWidthPixels });
                      }}
                      changeUnit={cuttingUnit =>
                        pageSize.update({ cuttingUnit })
                      }
                      height={pageSize.cuttingHeightPixels}
                      width={pageSize.cuttingWidthPixels}
                      unit={pageSize.cuttingUnit}
                    />
                  </div>

                  <button className="w-full text-md font-normal text-primaryContrast bg-green-500 h-[40px] rounded-sm mt-4">
                    Apply
                  </button>
                </form>
              </div>
            </AccordionItem>

            <AccordionItem
              aria-label="Accordion 1"
              title={
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-[10px]">
                    <Ruler className="w-[20px] h-[20px] text-black-500" />
                    <p className="text-md font-normal text-black-500">
                      Standard print size
                    </p>
                  </div>
                </div>
              }
            >
              <div className="w-full px-4 "></div>
            </AccordionItem>
          </Accordion>
        </PopoverContent>
      </Popover>
    </>
  );
};
