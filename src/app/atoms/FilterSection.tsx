import React, { PropsWithChildren } from 'react';

interface FilterSectionProps extends PropsWithChildren {
  title: string;
  endAdornment?: any;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  children,
  title,
  endAdornment,
}) => {
  return (
    <div>
      <div className="flex items-center gap-1 w-full">
        <p className="text-md font-[500] flex-auto leading-[36px] font-normal text-black-500">
          {title}
        </p>
        {!!endAdornment && endAdornment}
      </div>
      <div>{children}</div>
    </div>
  );
};
