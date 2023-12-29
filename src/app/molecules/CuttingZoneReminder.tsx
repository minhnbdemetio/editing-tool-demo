import React, { PropsWithChildren, useMemo } from 'react';
import { usePageSize } from '../store/use-page-size';
import { twMerge } from '../utilities/tailwind';
import { useLineEnabled } from '../store/line-preview';

interface CuttingZoneReminderProps extends PropsWithChildren {}

export const CuttingZoneReminder: React.FC<CuttingZoneReminderProps> = ({
  children,
}) => {
  const {
    workingHeightPixels,
    workingWidthPixels,
    cuttingHeightPixels,
    cuttingWidthPixels,
  } = usePageSize();

  const { lineEnabled } = useLineEnabled();

  const { paddingX, paddingY } = useMemo(() => {
    return {
      paddingX: Math.round((workingWidthPixels - cuttingWidthPixels) / 2),
      paddingY: Math.round((workingHeightPixels - cuttingHeightPixels) / 2),
    };
  }, [
    cuttingHeightPixels,
    cuttingWidthPixels,
    workingHeightPixels,
    workingWidthPixels,
  ]);

  return (
    <div className="relative h-fit w-full">
      {children}
      {lineEnabled && (
        <>
          <div
            className={twMerge(
              'top-0 left-0 w-full absolute bg-gray-200 bg-[#93a5b563] ',
            )}
            style={{ height: paddingY }}
          ></div>
          <div
            className={twMerge(
              'bottom-0 left-0 w-full absolute bg-gray-200 bg-[#93a5b563] ',
            )}
            style={{ height: paddingY }}
          ></div>

          <div
            className={twMerge('top-0 left-0 h-full absolute flex flex-col  ')}
            style={{
              width: paddingX,
              paddingTop: paddingY,
              paddingBottom: paddingY,
            }}
          >
            <div className={twMerge('w-full h-full bg-[#93a5b563]')}></div>
          </div>

          <div
            className={twMerge('top-0 right-0 h-full absolute flex flex-col ')}
            style={{
              width: paddingX,
              paddingTop: paddingY,
              paddingBottom: paddingY,
            }}
          >
            <div className={twMerge('w-full h-full bg-[#93a5b563]')}></div>
          </div>
        </>
      )}
    </div>
  );
};
