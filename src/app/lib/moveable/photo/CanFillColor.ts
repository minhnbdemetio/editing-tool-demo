export interface CanFillColor {
  fillColor?: string;
  fillOpacity?: number;
  fill(): void;
  getFillElement: () => HTMLElement | null;
  hideFillColor: () => void;
  setFillColor?: (color?: string) => void;
  setFillOpacity?: (opacity?: number) => void;
  hasFillColor?: () => boolean;
}
