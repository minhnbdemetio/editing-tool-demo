'use client';

import { FC, useState } from 'react';
import { MenuContent } from './MenuContent';
import { SideMenu } from './SideMenu';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { SideMenuItem } from './SideMenu/items';
import { ObjectProperties } from './ObjectProperties';
import { TransparentModal } from '../atoms/TransparentModal';
import { SelectedObjectProperty } from './ObjectProperty/SelectedObjectProperty';
import { useSelectedProperty } from '../store/selected-property';
import { useActiveMoveableObject } from '../store/active-moveable-object';
import { Backdrop } from '../atoms/Backdrop';

export const Menu: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SideMenuItem['key']>('templates');

  const [menuExpand, setMenuExpand] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { activeMoveableObject } = useActiveMoveableObject();
  const { selectedProperty } = useSelectedProperty();

  const onChangeMenu = (key: SideMenuItem['key']) => {
    setSelectedSection(key);
    setOpen(true);
  };

  return (
    <>
      <div
        className={twMerge(
          'fixed bottom-0 duration-300 w-full left-0 z-50 flex flex-col-reverse shadow-menu bg-white',
          {
            'max-h-[80%]': open,
          },
          'desktop:relative desktop:top-0 desktop:left-0 desktop:max-h-none desktop:h-full desktop:w-fit desktop:flex-row',
        )}
      >
        <SideMenu
          menuExpand={menuExpand}
          onMenuCollapse={setMenuExpand}
          onChange={onChangeMenu}
          selectedSection={selectedSection}
        />

        <MenuContent
          section={selectedSection}
          menuExpand={menuExpand}
          className={clsx({ hidden: !open })}
          setOpen={setOpen}
        />
      </div>

      <Backdrop
        open={open}
        onClick={() => {
          setOpen(false);
        }}
        className="desktop:hidden"
      />

      <div
        className={clsx('py-1 flex items-center fixed bottom-20 z-40 w-full', {
          hidden: Boolean(selectedProperty),
        })}
      >
        {activeMoveableObject && <ObjectProperties />}
      </div>

      <TransparentModal
        className={twMerge(
          'z-10 fixed bottom-[80px] max-h-[30%] h-fit overflow-auto',
          {
            hidden: !selectedProperty,
          },
        )}
      >
        <SelectedObjectProperty />
      </TransparentModal>
    </>
  );
};
