import React, { PropsWithChildren, useMemo } from 'react';
import { usePageSize } from '../store/use-page-size';
import { twMerge } from '../utilities/tailwind';

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
    <div className="relative h-fit w-fit">
      {children}

      <div
        className={
          ' absolute top-0 left-0 flex justify-center h-full flex-col items-center border-collapse'
        }
        style={{ width: paddingX }}
      >
        <div
          style={{
            borderBottom: `${paddingY}px solid #93a5b563`,
            borderRight: `${paddingY}px solid transparent`,
          }}
        ></div>
        <div
          className="w-full bg-[#93a5b563]"
          style={{
            height: `calc(100% - ${paddingY * 2}px)`,
          }}
        ></div>
        <div
          style={{
            borderTop: `${paddingY}px solid #93a5b563`,
            borderRight: `${paddingY}px solid transparent`,
          }}
        ></div>
      </div>

      <div
        className={
          ' absolute top-0 right-0 flex justify-center h-full flex-col items-center border-collapse'
        }
        style={{ width: paddingX }}
      >
        <div
          style={{
            borderBottom: `${paddingY}px solid #93a5b563`,
            borderLeft: `${paddingY}px solid transparent`,
          }}
        ></div>
        <div
          className="w-full bg-[#93a5b563]"
          style={{
            height: `calc(100% - ${paddingY * 2}px)`,
          }}
        ></div>
        <div
          style={{
            width: 0,
            borderTop: `${paddingY}px solid #93a5b563`,
            borderLeft: `${paddingY}px solid transparent`,
          }}
        ></div>
      </div>

      <div
        className={
          ' absolute top-0 left-0 flex justify-center w-full flex-row items-center border-collapse'
        }
        style={{ height: paddingY }}
      >
        <div
          style={{
            borderTop: `${paddingY}px solid #93a5b563`,
            borderLeft: `${paddingY}px solid transparent`,
          }}
        ></div>
        <div
          className="h-full bg-[#93a5b563]"
          style={{
            width: `calc(100% - ${paddingY * 2}px)`,
          }}
        ></div>
        <div
          style={{
            width: 0,
            borderTop: `${paddingY}px solid #93a5b563`,
            borderRight: `${paddingY}px solid transparent`,
          }}
        ></div>
      </div>

      <div
        className={
          ' absolute bottom-0 left-0 flex justify-center w-full flex-row items-center border-collapse'
        }
        style={{ height: paddingY }}
      >
        <div
          style={{
            borderBottom: `${paddingY}px solid #93a5b563`,
            borderLeft: `${paddingY}px solid transparent`,
          }}
        ></div>
        <div
          className="h-full bg-[#93a5b563]"
          style={{
            width: `calc(100% - ${paddingY * 2}px)`,
          }}
        ></div>
        <div
          style={{
            width: 0,
            borderBottom: `${paddingY}px solid #93a5b563`,
            borderRight: `${paddingY}px solid transparent`,
          }}
        ></div>
      </div>
    </div>
  );
};
