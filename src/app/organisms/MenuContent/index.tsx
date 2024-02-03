import { FC } from 'react';
import { TemplatesMenuContent } from './TemplatesMenuContent';
import { PhotosMenuContent } from './PhotosMenuContent';
import clsx from 'clsx';
import { ElementsMenuContent } from './ElementsMenuContent';
import { TextMenuContent } from './TextMenuContent';
import { BackgroundMenuContent } from './BackgroundMenuContent';
import { WorkspacesMenuContent } from './WorkspacesMenuContent';
import { SideMenuItem } from '../SideMenu/items';

interface MenuContentProps {
  section: string;
  menuExpand: boolean;
  setOpen: (val: boolean) => void;
}

export const MenuContent: FC<MenuContentProps> = ({
  section,
  menuExpand,
  setOpen,
}) => {
  const renderMenuContentComponent = () => {
    switch (section) {
      case 'backgrounds': {
        return <BackgroundMenuContent />;
      }
      case 'templates': {
        return <TemplatesMenuContent />;
      }
      case 'photos': {
        return <PhotosMenuContent />;
      }
      case 'elements': {
        return <ElementsMenuContent />;
      }
      case 'text': {
        return <TextMenuContent />;
      }
      case 'workspaces': {
        return <WorkspacesMenuContent setOpen={setOpen} />;
      }
      default: {
        return <ElementsMenuContent />;
      }
    }
  };

  return (
    <div
      className={clsx(
        'z-20 w-full h-full rounded-t-xl bg-white min-h-0',
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
