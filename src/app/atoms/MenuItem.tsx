import React, { PropsWithChildren } from 'react';
import { twMerge } from '../utilities/tailwind';
import { IconProps } from '../types';

interface MenuItemProps extends PropsWithChildren {
  hover?: boolean;
  className?: string;
  endIcon?: React.FC<IconProps>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onEndIconClick?: (e: React.MouseEvent) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  hover = true,
  className,
  endIcon: EndIcon,
  onClick,
  onEndIconClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'flex justify-between items-center py-[10px] px-4 w-full duration-200 desktop:cursor-pointer ',
        { 'desktop:hover:bg-gray-200': hover },
        className,
      )}
    >
      <div className="flex items-center gap-[12px] flex-auto w-full">
        {children}
      </div>

      <div className=" gap-[12px]">
        {!!EndIcon ? (
          onEndIconClick ? (
            <button onClick={onEndIconClick}>
              <EndIcon className="text-gray-500 w-[20px] h-[20px]" />
            </button>
          ) : (
            <EndIcon className="text-gray-500 w-[20px] h-[20px]" />
          )
        ) : null}
      </div>
    </div>
  );
};
