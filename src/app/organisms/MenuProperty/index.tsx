import { FC } from 'react';
import clsx from 'clsx';
import { PhotoMenuProperty } from './PhotoMenuProperty';

interface MenuPropertyProps {
  section: string;
  menuExpand: boolean;
}

export const MenuProperty: FC<MenuPropertyProps> = ({
  section,
  menuExpand,
}) => {
  const menuPropertyComponent = () => {
    switch (section) {
      default: {
        return <PhotoMenuProperty />;
      }
    }
  };

  return (
    <div
      className={clsx(
        'z-20 w-full h-full rounded-t-xl  bg-white',
        {
          hidden: menuExpand,
        },
        'desktop:relative desktop:left-0 desktop:rounded-t-none desktop:w-[360px]',
      )}
    >
      {menuPropertyComponent()}
    </div>
  );
};
