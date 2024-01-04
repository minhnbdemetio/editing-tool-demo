import React, { PropsWithChildren } from 'react';
import { twMerge } from '../utilities/tailwind';

interface MenuGroupProps extends PropsWithChildren {
  divider?: boolean;
  className?: string;
}

export const MenuGroup: React.FC<MenuGroupProps> = ({
  divider = true,
  children,
  className,
}) => {
  return (
    <>
      <div
        className={twMerge(
          'py-2 ',
          {
            'border-b-[1px] border-b-border border-b-solid': divider,
          },
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};
