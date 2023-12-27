import {
  Accordion,
  AccordionItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { ChevronDown, Ruler } from '../icons';
import { convertFrameSize, getDisplayDimension } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSizeGroupInput } from './PageSizeGroupInput';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { PageSizeUnits } from '../types';

interface BackgroundSizePopoverProps {}

export const BackgroundSizePopover: React.FC<
  BackgroundSizePopoverProps
> = () => {
  const pageSize = usePageSize();

  const [pageSizeForm, setPageSizeForm] = useState<{
    workingWidth: number;
    workingHeight: number;
    workingUnit: PageSizeUnits;
    cuttingWidth: number;
    cuttingHeight: number;
    cuttingUnit: PageSizeUnits;
  }>({
    workingHeight: pageSize.workingHeightPixels,
    workingWidth: pageSize.workingHeightPixels,
    workingUnit: pageSize.workingUnit,
    cuttingHeight: pageSize.cuttingHeightPixels,
    cuttingWidth: pageSize.cuttingWidthPixels,
    cuttingUnit: pageSize.cuttingUnit,
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const maxWorking = convertFrameSize(
          'px',
          pageSizeForm.workingUnit,
          8000,
          2,
        );
        const minWorking = convertFrameSize(
          'px',
          pageSizeForm.workingUnit,
          1,
          2,
        );

        console.debug(minWorking);
        const schema = Yup.object({
          workingWidth: Yup.number()
            .required('required!')
            .min(minWorking, 'Min ' + minWorking)
            .max(maxWorking, 'Max ' + maxWorking),
          workingHeight: Yup.number()
            .required('required!')
            .min(minWorking, 'Min ' + minWorking)
            .max(maxWorking, 'Max ' + maxWorking),
          cuttingWidth: Yup.number()
            .required('required!')
            .min(minWorking, 'Min ' + minWorking)
            .max(maxWorking, 'Max ' + maxWorking),
          cuttingHeight: Yup.number()
            .required('required!')
            .min(minWorking, 'Min ' + minWorking)
            .max(maxWorking, 'Max ' + maxWorking),
        });

        const getConvertedNumber = (number: number) => {
          return convertFrameSize('px', pageSizeForm.workingUnit, number, 2);
        };

        await schema.validate(
          {
            workingWidth: getConvertedNumber(pageSizeForm.workingWidth),
            workingHeight: getConvertedNumber(pageSizeForm.workingHeight),
            cuttingWidth: getConvertedNumber(pageSizeForm.cuttingWidth),
            cuttingHeight: getConvertedNumber(pageSizeForm.cuttingHeight),
          },
          {
            abortEarly: false,
          },
        );

        setErrors({});

        pageSize.update(pageSizeForm);
      } catch (e) {
        if (e instanceof ValidationError) {
          const tempErrors: { [k: string]: string } = {};
          e.inner.forEach(error => {
            if (error.path && error.message) {
              tempErrors[error.path] = error.message;
            }
          });

          console.debug(tempErrors);
          setErrors(tempErrors);
        }
      }
    },
    [pageSize, pageSizeForm],
  );

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
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-1">
                    <PageSizeGroupInput
                      changeHeight={workingHeightPixels => {
                        console.debug(workingHeightPixels);
                        // pageSize.update({ workingHeightPixels });
                        setPageSizeForm(s => ({
                          ...s,
                          workingHeight: workingHeightPixels,
                        }));
                      }}
                      changeWidth={workingWidthPixels => {
                        // pageSize.update({ workingWidthPixels });
                        setPageSizeForm(s => ({
                          ...s,
                          workingWidth: workingWidthPixels,
                        }));
                      }}
                      changeUnit={workingUnit =>
                        setPageSizeForm(s => ({
                          ...s,
                          workingUnit: workingUnit,
                        }))
                      }
                      height={pageSize.workingHeightPixels}
                      width={pageSize.workingWidthPixels}
                      unit={pageSize.workingUnit}
                      errors={{
                        width: errors.workingWidth,
                        height: errors.workingHeight,
                      }}
                    />
                    <PageSizeGroupInput
                      changeHeight={cuttingHeightPixels => {
                        // pageSize.update({ cuttingHeightPixels });
                        setPageSizeForm(s => ({
                          ...s,
                          cuttingHeight: cuttingHeightPixels,
                        }));
                      }}
                      changeWidth={cuttingWidthPixels => {
                        setPageSizeForm(s => ({
                          ...s,
                          cuttingWidth: cuttingWidthPixels,
                        }));
                      }}
                      changeUnit={cuttingUnit => {
                        setPageSizeForm(s => ({
                          ...s,
                          cuttingUnit,
                        }));
                      }}
                      height={pageSize.cuttingHeightPixels}
                      width={pageSize.cuttingWidthPixels}
                      unit={pageSize.cuttingUnit}
                      errors={{
                        width: errors.cuttingWidth,
                        height: errors.cuttingHeight,
                      }}
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
