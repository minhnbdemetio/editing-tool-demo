import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { usePageSize } from '../store/use-page-size';
import { twMerge } from '../utilities/tailwind';
import { useLineEnabled } from '../store/line-preview';
import { millimetersToPixels } from '../utilities/units';
import { CuttingZoneIntroduction } from './CuttingZoneIntroductions';

interface CuttingZoneReminderProps extends PropsWithChildren {}

const DEFAULT_SAFE_ZONE_PADDING = 10;

const Zone: React.FC<{
  paddingX: number;
  paddingY: number;
  color: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderSize?: number;
  className?: string;
}> = ({
  paddingX,
  paddingY,
  color,
  borderStyle = 'solid',
  borderSize = 1,
  className,
}) => {
  return (
    <>
      <div
        className={twMerge('top-0 left-0 absolute  ', className)}
        style={{
          top: paddingY - borderSize,
          borderBottom: `${borderSize}px ${borderStyle} ${color}`,
          left: paddingX,
          width: `calc(100% - ${paddingX * 2}px)`,
          zIndex: 20,
        }}
      ></div>
      <div
        className={twMerge('bottom-0 left-0  absolute  ')}
        style={{
          bottom: paddingY - borderSize,
          borderTop: `${borderSize}px ${borderStyle} ${color}`,
          width: `calc(100% - ${paddingX * 2}px)`,
          left: paddingX,
          zIndex: 20,
        }}
      ></div>

      <div
        className={twMerge('top-0 left-0 absolute flex flex-col  ')}
        style={{
          left: paddingX - borderSize,
          borderLeft: `${borderSize}px ${borderStyle} ${color}`,
          height: `calc(100% - ${paddingY * 2}px)`,
          top: paddingY,
          zIndex: 20,
        }}
      >
        <div className={twMerge('w-full h-full ')}></div>
      </div>

      <div
        className={twMerge('top-0 right-0 h-full absolute flex flex-col ')}
        style={{
          right: paddingX - borderSize,
          borderRight: `${borderSize}px ${borderStyle} ${color}`,
          height: `calc(100% - ${paddingY * 2}px)`,
          top: paddingY,
          zIndex: 20,
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

  const BLUR_ZONE = (
    <>
      <div
        className={twMerge(
          'top-0 left-0 w-full absolute  bg-white opacity-65 selector1',
        )}
        style={{ height: paddingY }}
      ></div>
      <div
        className={twMerge(
          'bottom-0 left-0 w-full absolute bg-white opacity-65 ',
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
        <div className={twMerge('w-full h-full bg-white opacity-65')}></div>
      </div>

      <div
        className={twMerge('top-0 right-0 h-full absolute flex flex-col ')}
        style={{
          width: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
      >
        <div className={twMerge('w-full h-full bg-white opacity-65')}></div>
      </div>
    </>
  );

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
            color="rgb(152 152 152)"
            borderStyle="dotted"
            borderSize={1}
          />
          {BLUR_ZONE}
          <CuttingZoneIntroduction
            padding={paddingY}
            safeZonePadding={safeZonePaddingY}
          />
        </>
      )}
    </div>
  );
};
