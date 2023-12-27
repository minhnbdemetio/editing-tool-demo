export declare type IconProps = {
  className?: string;
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
export declare type PageSizeUnits = 'ml' | 'cm' | 'px' | 'in';
