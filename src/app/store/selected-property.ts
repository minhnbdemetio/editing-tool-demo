import { create } from 'zustand';

export enum SelectedProperty {
  Position = 1,
  TextFont,
  TextStyles,
  TextFontSize,
  TextColor,
  TextFormat,
  TextSpacing,
  TextEffect,
  TextAnimation,
  TextTransparency,
  TextLayers,
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
  PhotoBackground,
  ShapeNudge,
  ShapeFilter,
  ShapeManualFilter,
  ShapeColor,
  ShapeOutline,
  ShapeCrop,
  ShapeOpacity,
  ShapeAlign,
  ShapePosition,
  ShapeOrder,
  ShapeFlip,
  ShapeMore,
  ShapeLayer,
  ShapeBackground,
  ShapeTextColor,
  ShapeTextFont,
  ShapeTextFontSize,
  ShapeTextFormat,
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
