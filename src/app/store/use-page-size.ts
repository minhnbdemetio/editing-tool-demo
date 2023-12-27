import { create } from 'zustand';
import { UNITS } from '../constants/unit-constants';
import { PageSizeUnits } from '../types';
import { convertFrameSize } from '../utilities/units';

export const usePageSize = create<{
  workingWidthPixels: number; // pixels
  workingHeightPixels: number; // pixels
  workingUnit: PageSizeUnits;

  cuttingWidthPixels: number; // pixels
  cuttingHeightPixels: number; // pixels
  cuttingUnit: PageSizeUnits;

  update: (size: {
    workingWidthPixels?: number;
    workingHeightPixels?: number;
    workingUnit?: PageSizeUnits;

    cuttingWidthPixels?: number;
    cuttingHeightPixels?: number;
    cuttingUnit?: PageSizeUnits;
  }) => void;
}>(set => ({
  workingHeightPixels: convertFrameSize(
    UNITS.MILLIMETER,
    UNITS.PIXEL,
    102,
    null,
  ),
  workingWidthPixels: convertFrameSize(
    UNITS.MILLIMETER,
    UNITS.PIXEL,
    102,
    null,
  ),
  cuttingHeightPixels: convertFrameSize(
    UNITS.MILLIMETER,
    UNITS.PIXEL,
    98,
    null,
  ),
  cuttingWidthPixels: convertFrameSize(UNITS.MILLIMETER, UNITS.PIXEL, 98, null),
  workingUnit: 'ml',
  cuttingUnit: 'ml',
  update: pageSize => set(prev => ({ ...prev, ...pageSize })),
}));
