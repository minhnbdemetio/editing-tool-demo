export declare type IconProps = {
  className?: string;
};

export declare type PageSizeUnits = 'ml' | 'cm' | 'px' | 'in';

export declare type PageSize = {
  id: number;
  unit: PageSizeUnits;
  width: number;
  height: number;
  cuttingWidth: number;
  cuttingHeight: number;
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
