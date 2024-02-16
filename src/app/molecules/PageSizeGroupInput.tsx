import React, { useCallback, useEffect, useState } from 'react';
import { IconLink, IconUnLink, LockClosed, LockOpen } from '../icons';
import { UNITS } from '../constants/unit-constants';
import { PageSizeUnits } from '../types';
import { convertFrameSize } from '../utilities/units';
import { Tooltip } from '@nextui-org/react';

interface PageSizeGroupInputProps {
  unit: PageSizeUnits;
  width: number;
  height: number;
  changeUnit: (unit: PageSizeUnits) => void;
  changeWidth: (width: number) => void;
  changeHeight: (height: number) => void;
  label?: string;
  errors?: { width?: string; height?: string };
}

export const PageSizeGroupInput: React.FC<PageSizeGroupInputProps> = ({
  unit,
  height,
  width,
  changeWidth,
  changeHeight,
  changeUnit,
  label,
  errors = {},
}) => {
  const [inputWidth, setInputWidth] = useState(
    convertFrameSize(UNITS.PIXEL, unit, width, 2),
  );
  const [inputHeight, setInputHeight] = useState(
    convertFrameSize(UNITS.PIXEL, unit, height, 2),
  );

  const [ratioLocked, setRatioLocked] = useState(true);

  const [ratio, setRatio] = useState(width / height);

  useEffect(() => {
    if (ratioLocked) {
      setRatio(width / height);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratioLocked]);

  const handleChangeUnit = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newUnit = e.target.value as PageSizeUnits;
      let widthPixels = width;
      let heightPixels = height;

      const newWidth = convertFrameSize(UNITS.PIXEL, newUnit, widthPixels, 2);
      const newHeight = convertFrameSize(UNITS.PIXEL, newUnit, heightPixels, 2);

      setInputWidth(newWidth);
      setInputHeight(newHeight);
      changeUnit(newUnit);
    },
    [width, height, changeUnit],
  );

  const handleChangeWidth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWidth = (+e.target.value as number) || 0;

      const newPixelsWidth = convertFrameSize(
        unit,
        UNITS.PIXEL,
        newWidth || 0,
        null,
      );

      changeWidth(newPixelsWidth);
      setInputWidth(newWidth);

      if (ratioLocked) {
        const newHeight = newWidth / ratio;
        const newHeightPixels = convertFrameSize(
          unit,
          UNITS.PIXEL,
          newHeight || 0,
          null,
        );

        changeHeight(newHeightPixels);
        setInputHeight(newHeight);
      }
    },
    [changeHeight, changeWidth, ratio, ratioLocked, unit],
  );

  const handleChangeHeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = (+e.target.value as number) || 0;
      const newPixelsHeight = convertFrameSize(
        unit,
        UNITS.PIXEL,
        newHeight || 0,
        null,
      );

      changeHeight(newPixelsHeight);
      setInputHeight(newHeight);

      if (ratioLocked) {
        const newWidth = newHeight * ratio;
        const newPixelsWidth = convertFrameSize(
          unit,
          UNITS.PIXEL,
          newWidth || 0,
          null,
        );

        changeWidth(newPixelsWidth);
        setInputWidth(newWidth);
      }
    },
    [changeHeight, changeWidth, ratio, ratioLocked, unit],
  );

  return (
    <>
      <div className="flex items-center gap-2 justify-between">
        {label && <p className="text-smm leading-4 font-normal">{label}</p>}
        <div className="flex items-center gap-2">
          <Tooltip
            showArrow
            placement="top"
            isOpen={!!errors.width}
            content={errors.width}
          >
            <input
              value={inputWidth}
              type="number"
              onChange={handleChangeWidth}
              className="hide-arrow-number-input w-12 h-8 border-px border-border border-solid text-smm rounded font-normal text-black-500 pl-3.5 py-2"
            />
          </Tooltip>
          <button type="button" onClick={() => setRatioLocked(!ratioLocked)}>
            {ratioLocked ? (
              <IconLink className="w-[20px] h-[20px]" />
            ) : (
              <IconUnLink className="w-[20px] h-[20px]" />
            )}
          </button>
          <Tooltip
            showArrow
            placement="top"
            isOpen={!!errors.height}
            content={errors.height}
          >
            <input
              value={inputHeight}
              type="number"
              onChange={handleChangeHeight}
              className="hide-arrow-number-input w-12 h-8 border-px border-border border-solid text-smm rounded font-normal text-black-500 pl-3.5 py-2"
            />
          </Tooltip>

          <select
            value={unit}
            onChange={handleChangeUnit}
            className="w-18 h-8 border-px border-border border-solid text-smm rounded font-normal text-black-500 px-3"
          >
            {Object.values(UNITS).map(u => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
