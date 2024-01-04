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
