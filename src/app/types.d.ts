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
