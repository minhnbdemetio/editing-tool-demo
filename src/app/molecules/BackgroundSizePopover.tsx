import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, LockClosed, LockOpen, Ruler } from '../icons';
import { convertFrameSize } from '../utilities/units';
import { UNITS } from '../constants/unit-constants';

interface BackgroundSizePopoverProps {}

export const BackgroundSizePopover: React.FC<
  BackgroundSizePopoverProps
> = () => {
  const [originalSize, setOriginalSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 1080,
    height: 1080,
  });

  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [unit, setUnit] = useState('px');
  const [ratioLocked, setRatioLocked] = useState(true);

  const [ratio, setRatio] = useState(width / height);

  useEffect(() => {
    if (ratioLocked) {
      setRatio(width / height);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratioLocked]);

  const collapseRatioLock = useCallback(
    () => setRatioLocked(prev => !prev),
    [],
  );

  const changeHeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = +e.currentTarget.value;
      const newOrgHeight = convertFrameSize(unit, 'px', newHeight, null);
      const newOrgWidth = ratioLocked
        ? (newHeight || 0) * ratio
        : originalSize.width;

      setHeight(+e.currentTarget.value);

      setWidth(convertFrameSize('px', unit, newOrgWidth));

      setOriginalSize({
        width: newOrgWidth,
        height: newOrgHeight,
      });
    },
    [originalSize.width, ratio, ratioLocked, unit],
  );

  const changeWidth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWidth = +e.currentTarget.value;
      const newOrgWidth = convertFrameSize(unit, 'px', newWidth, null);
      const newOrgHeight = ratioLocked
        ? (newOrgWidth || 0) / ratio
        : originalSize.height;

      setWidth(newWidth);
      setHeight(convertFrameSize('px', unit, newOrgHeight));

      setOriginalSize({ width: newOrgWidth, height: newOrgHeight });
    },
    [originalSize.height, ratio, ratioLocked, unit],
  );

  const changeUnit = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newUnit = e.currentTarget.value;

      const newWidth = convertFrameSize('px', newUnit, originalSize.width);
      const newHeight = convertFrameSize('px', newUnit, originalSize.height);

      setWidth(+newWidth);
      setHeight(+newHeight);
      setUnit(newUnit);
    },
    [originalSize],
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
              {Math.ceil(width)}
              {unit} x {Math.ceil(height)}
              {unit}
            </p>
            <ChevronDown className="text-gray-200 w-[28px] h-[18px]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className=" upload-popover rounded-md px-0">
          <div className="w-full px-4 py-2">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-[10px]">
                <Ruler className="w-[20px] h-[20px] text-black-500" />
                <p className="text-md font-normal text-black-500">
                  Enter manually
                </p>
              </div>

              {/* <ChevronDown className="w-[20px] h-[20px] text-black-500" /> */}
            </div>

            <form>
              <div className="flex items-center gap-2">
                <input
                  value={width}
                  onChange={changeWidth}
                  className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500  p-2"
                />
                <button type="button" onClick={collapseRatioLock}>
                  {ratioLocked ? (
                    <LockClosed className="w-[14px] h-[14px]" />
                  ) : (
                    <LockOpen className="w-[14px] h-[14px]" />
                  )}
                </button>
                <input
                  value={height}
                  onChange={changeHeight}
                  className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500  p-2"
                />

                <select
                  value={unit}
                  onChange={changeUnit}
                  className="w-[72px] border-[1px] border-border border-solid text-md rounded-sm font-normal text-black-500 p-2"
                >
                  {Object.values(UNITS).map(u => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full text-md font-normal text-primaryContrast bg-green-500 h-[40px] rounded-sm mt-4">
                Apply
              </button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
