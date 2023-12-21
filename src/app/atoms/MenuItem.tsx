import React, { PropsWithChildren } from 'react';
import { twMerge } from '../utilities/tailwind';

interface MenuItemProps extends PropsWithChildren {
  hover?: boolean;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  hover = true,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'flex gap-[12px] items-center py-[10px] px-4 duration-200 desktop:cursor-pointer ',
        { 'desktop:hover:bg-gray-200': hover },
        className,
      )}
    >
      {children}
    </div>
  );
};
