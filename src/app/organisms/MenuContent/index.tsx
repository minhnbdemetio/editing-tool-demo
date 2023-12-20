import { FC } from 'react';
import { TemplatesMenuContent } from './TemplatesMenuContent';
import { PhotosMenuContent } from './PhotosMenuContent';

interface MenuContentProps {
  section: string;
}

export const MenuContent: FC<MenuContentProps> = ({ section }) => {
  const menuContentComponent = () => {
    switch (section) {
      case 'templates': {
        return <TemplatesMenuContent />;
      }
      case 'photos': {
        return <PhotosMenuContent />;
      }
      default: {
        return <></>;
      }
    }
  };

  return <>{menuContentComponent()}</>;
};
