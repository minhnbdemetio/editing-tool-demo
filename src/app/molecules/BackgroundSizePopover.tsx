import {
  Accordion,
  AccordionItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Ruler } from '../icons';
import { convertFrameSize, getDisplayDimension } from '../utilities/units';
import { usePageSize } from '../store/use-page-size';
import { PageSizeGroupInput } from './PageSizeGroupInput';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { PageSize, PageSizeUnits } from '../types';
import { ListRecommendedSizes } from './ListRecommendedSizes';
import { getRecommendedSize } from '../services/page.service';
import { UNITS } from '../constants/unit-constants';

interface BackgroundSizePopoverProps {}

export const BackgroundSizePopover: React.FC<
  BackgroundSizePopoverProps
> = () => {
  const pageSize = usePageSize();

  const [sizes, setSizes] = useState<PageSize[]>([]);

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
        const maxNumber = convertFrameSize(
          'px',
          pageSizeForm.workingUnit,
          8000,
          2,
        );
        const minNumber = convertFrameSize(
          'px',
          pageSizeForm.workingUnit,
          1,
          2,
        );

        const minMessage = 'Greater than ' + minNumber;
        const maxMessage = 'Smaller than ' + maxNumber;
        const schema = Yup.object({
          workingWidth: Yup.number()
            .required('required!')
            .min(minNumber, minMessage)
            .max(maxNumber, maxMessage),
          workingHeight: Yup.number()
            .required('required!')
            .min(minNumber, minMessage)
            .max(maxNumber, maxMessage),
          cuttingWidth: Yup.number()
            .required('required!')
            .min(minNumber, minMessage)
            .max(maxNumber, maxMessage),
          cuttingHeight: Yup.number()
            .required('required!')
            .min(minNumber, minMessage)
            .max(maxNumber, maxMessage),
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
              <div className="w-full px-9 ">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-1">
                    <PageSizeGroupInput
                      label="Cutting Line"
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
                      label="Printing Line"
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
