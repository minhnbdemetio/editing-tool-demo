import React, { useCallback, useState } from 'react';
import { PageSizeGroupInput } from './PageSizeGroupInput';
import { convertFrameSize } from '../utilities/units';
import { PageSizeUnits } from '../types';
import { usePageSize } from '../store/use-page-size';
import { ValidationError } from 'yup';
import * as Yup from 'yup';
import { Button } from '../atoms/Button';

interface ManuallySettingSizeProps {}

export const ManuallySettingSize: React.FC<ManuallySettingSizeProps> = () => {
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

        pageSize.update({
          cuttingUnit: pageSizeForm.cuttingUnit,
          workingUnit: pageSizeForm.workingUnit,
          cuttingHeightPixels: pageSizeForm.cuttingHeight,
          cuttingWidthPixels: pageSizeForm.cuttingWidth,
          workingHeightPixels: pageSizeForm.workingHeight,
          workingWidthPixels: pageSizeForm.workingWidth,
        });
      } catch (e) {
        if (e instanceof ValidationError) {
          const tempErrors: { [k: string]: string } = {};
          e.inner.forEach(error => {
            if (error.path && error.message) {
              tempErrors[error.path] = error.message;
            }
          });

          setErrors(tempErrors);
        }
      }
    },
    [pageSize, pageSizeForm],
  );
  return (
    <div className="w-full pl-[34px] pr-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-1">
          <PageSizeGroupInput
            label="Cutting Line"
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
            height={pageSizeForm.cuttingHeight}
            width={pageSizeForm.cuttingWidth}
            unit={pageSizeForm.cuttingUnit}
            errors={{
              width: errors.cuttingWidth,
              height: errors.cuttingHeight,
            }}
          />
          <PageSizeGroupInput
            label="Printing Line"
            changeHeight={workingHeightPixels => {
              setPageSizeForm(s => ({
                ...s,
                workingHeight: workingHeightPixels,
              }));
            }}
            changeWidth={workingWidthPixels => {
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
            height={pageSizeForm.workingHeight}
            width={pageSizeForm.workingWidth}
            unit={pageSizeForm.workingUnit}
            errors={{
              width: errors.workingWidth,
              height: errors.workingHeight,
            }}
          />
        </div>

        <Button
          color="secondary"
          className="w-full mt-4"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </form>
    </div>
  );
};
