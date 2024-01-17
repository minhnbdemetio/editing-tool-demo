import { create } from 'zustand';

export enum SelectedProperty {
  TextFont = 1,
  TextStyles,
  TextFontSize,
  TextColor,
  TextFormat,
  TextSpacing,
  TextEffect,
  TextAnimation,
  TextTransparency,
  TextLayers,
  TextPosition,
  TextNudge,
  TextMore,
  LineColor,
  LineStyle,
  LineStart,
  LineEnd,
  LineType,
  LineFormat,
  LineTransparency,
  LineNudge,
  LineAlign,
  LineShadow,
  LineFlip,
  PhotoNudge,
  PhotoFilter,
  PhotoManualFilter,
  PhotoEffect,
  PhotoCrop,
  PhotoOpacity,
  PhotoAlign,
  PhotoOrder,
  PhotoFlip,
  PhotoMore,
  PhotoLayer,
}

interface SelectedPropertyState {
  selectedProperty: SelectedProperty | null | undefined;
  setSelectedProperty: (property: SelectedProperty | null | undefined) => any;
}

export const useSelectedProperty = create<SelectedPropertyState>(set => ({
  selectedProperty: null,
  setSelectedProperty: (property: SelectedProperty | null | undefined) =>
    set(() => ({ selectedProperty: property })),
}));
