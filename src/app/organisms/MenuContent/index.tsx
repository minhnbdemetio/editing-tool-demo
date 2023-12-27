import { FC } from 'react';
import { TemplatesMenuContent } from './TemplatesMenuContent';
import { PhotosMenuContent } from './PhotosMenuContent';
import clsx from 'clsx';
import { ElementsMenuContent } from './ElementsMenuContent';

interface MenuContentProps {
  section: string;
  menuExpand: boolean;
}

export const MenuContent: FC<MenuContentProps> = ({ section, menuExpand }) => {
  const renderMenuContentComponent = () => {
    switch (section) {
      case 'templates': {
        return <TemplatesMenuContent />;
      }
      case 'photos': {
        return <PhotosMenuContent />;
      }
      case 'elements': {
        return <ElementsMenuContent />;
      }
      default: {
        return <ElementsMenuContent />;
      }
    }
  };

  return (
    <div
      className={clsx(
        'z-20 w-full h-full rounded-t-xl bg-white',
        {
          hidden: menuExpand,
        },
        'desktop:relative desktop:left-0 desktop:rounded-t-none desktop:w-[360px]',
      )}
    >
      {renderMenuContentComponent()}
    </div>
  );
};
