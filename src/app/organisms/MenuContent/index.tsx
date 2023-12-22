import { FC } from 'react';
import { TemplatesMenuContent } from './TemplatesMenuContent';
import { PhotosMenuContent } from './PhotosMenuContent';
import clsx from 'clsx';

interface MenuContentProps {
  section: string;
  menuExpand: boolean;
}

export const MenuContent: FC<MenuContentProps> = ({ section, menuExpand }) => {
  const menuContentComponent = () => {
    switch (section) {
      case 'templates': {
        return <TemplatesMenuContent />;
      }
      case 'photos': {
        return <PhotosMenuContent />;
      }
      default: {
        return <PhotosMenuContent />;
      }
    }
  };

  return (
    <div
      className={clsx(
        'absolute top-0 fadein fadeout z-20 left-[56px] w-[360px] h-full bg-white]',
        {
          hidden: menuExpand,
        },
        'desktop:relative desktop:left-0',
      )}
    >
      {menuContentComponent()}
    </div>
  );
};
