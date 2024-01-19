export declare type IconProps = {
  className?: string;
};

export declare type PageSizeUnits = 'mm' | 'cm' | 'px' | 'in';

export declare type PageSize = {
  id: number;
  unit: PageSizeUnits;
  width: number;
  height: number;
  workingWidth?: number;
  workingHeight?: number;
  label: string;
};
export declare type PriceFilterType = {
  type: 'price';
  id: number;
  prices: { id: number; label: string }[];
};

export declare type ColorFilterType = {
  type: 'color';
  id: number;
  colors: string[];
};

export declare type TemplateFilterType = PriceFilterType | ColorFilterType;

declare type PhotoFilter = {
  contrast: number;
  brightness: number;
  saturation: number;
  blur: number;
  temperature: number;
  hue:
    | {
        r: number;
        g: number;
        b: number;
      }
    | undefined;
  vignette: number;
};
