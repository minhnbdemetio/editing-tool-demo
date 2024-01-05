import React, { PropsWithChildren, useMemo } from 'react';
import { usePageSize } from '../store/use-page-size';
import { twMerge } from '../utilities/tailwind';
import { useLineEnabled } from '../store/line-preview';
import { millimetersToPixels } from '../utilities/units';

interface CuttingZoneReminderProps extends PropsWithChildren {}

const DEFAULT_SAFE_ZONE_PADDING = 10;

const Zone: React.FC<{
  paddingX: number;
  paddingY: number;
  color: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderSize?: number;
}> = ({ paddingX, paddingY, color, borderStyle = 'solid', borderSize = 1 }) => {
  return (
    <>
      <div
        className={twMerge('top-0 left-0 absolute  ')}
        style={{
          top: paddingY,
          border: `${borderSize}px ${borderStyle} ${color}`,
          left: paddingX,
          width: `calc(100% - ${paddingX * 2}px)`,
        }}
      ></div>
      <div
        className={twMerge('bottom-0 left-0  absolute  ')}
        style={{
          bottom: paddingY,
          border: `${borderSize}px ${borderStyle} ${color}`,
          width: `calc(100% - ${paddingX * 2}px)`,
          left: paddingX,
        }}
      ></div>

      <div
        className={twMerge('top-0 left-0 absolute flex flex-col  ')}
        style={{
          left: paddingX,
          border: `${borderSize}px ${borderStyle} ${color}`,
          height: `calc(100% - ${paddingY * 2}px)`,
          top: paddingY,
        }}
      >
        <div className={twMerge('w-full h-full ')}></div>
      </div>

      <div
        className={twMerge('top-0 right-0 h-full absolute flex flex-col ')}
        style={{
          right: paddingX,
          border: `${borderSize}px ${borderStyle} ${color}`,
          height: `calc(100% - ${paddingY * 2}px)`,
          top: paddingY,
        }}
      >
        <div className={twMerge('w-full h-full ')}></div>
      </div>
    </>
  );
};

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

  const { paddingX, paddingY, safeZonePaddingX, safeZonePaddingY } =
    useMemo(() => {
      return {
        paddingX: Math.round((workingWidthPixels - cuttingWidthPixels) / 2),
        paddingY: Math.round((workingHeightPixels - cuttingHeightPixels) / 2),
        safeZonePaddingX: Math.round(
          (workingWidthPixels - cuttingWidthPixels) / 2 +
            millimetersToPixels(DEFAULT_SAFE_ZONE_PADDING),
        ),
        safeZonePaddingY: Math.round(
          Math.round((workingHeightPixels - cuttingHeightPixels) / 2) +
            millimetersToPixels(DEFAULT_SAFE_ZONE_PADDING),
        ),
      };
    }, [
      cuttingHeightPixels,
      cuttingWidthPixels,
      workingHeightPixels,
      workingWidthPixels,
    ]);

  return (
    <div className="relative h-fit w-full reminder">
      {children}
      {lineEnabled && (
        <>
          <Zone
            paddingX={paddingX}
            paddingY={paddingY}
            borderStyle="dashed"
            borderSize={2}
            color="#d9d9d9"
          />
          <Zone
            paddingX={safeZonePaddingX}
            paddingY={safeZonePaddingY}
            color="#e9e9e9"
            borderStyle="dotted"
            borderSize={1}
          />
        </>
      )}
    </div>
  );
};
