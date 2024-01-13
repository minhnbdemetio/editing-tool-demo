'use client';

import { FC, useState } from 'react';
import { MenuContent } from './MenuContent';
import { SideMenu } from './SideMenu';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { Add } from '../icons/Add';
import { SideMenuItem } from './SideMenu/items';
import { ObjectProperties } from './ObjectProperties';
import { TransparentModal } from '../atoms/TransparentModal';
import { SelectedObjectProperty } from './ObjectProperty/SelectedObjectProperty';
import { useSelectedProperty } from '../store/selected-property';
import { useActiveMoveableObject } from '../store/active-moveable-object';

export const Menu: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SideMenuItem['key']>('templates');

  const [menuExpand, setMenuExpand] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { activeMoveableObject } = useActiveMoveableObject();
  const { selectedProperty } = useSelectedProperty();

  return (
    <>
      <div
        className={twMerge(
          'absolute duration-300 w-full max-h-[80%] left-0 z-50 flex flex-col-reverse h-full',
          {
            'bottom-0': open,
            hidden: !open,
          },
          'desktop:relative desktop:top-0 desktop:left-0 desktop:max-h-none  desktop:h-full desktop:w-fit desktop:flex-row',
        )}
      >
        <SideMenu
          menuExpand={menuExpand}
          onMenuCollapse={setMenuExpand}
          onChange={setSelectedSection}
          selectedSection={selectedSection}
        />

        <MenuContent section={selectedSection} menuExpand={menuExpand} />
      </div>

      <div
        onClick={() => {
          setOpen(false);
        }}
        className={clsx(
          'absolute top-0 fadein z-20 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]',
          {
            'hidden ': !open,
          },
          'desktop:hidden',
        )}
      ></div>

      <div
        className={clsx('py-1 flex items-center fixed bottom-0 z-40 w-full', {
          hidden: Boolean(selectedProperty),
        })}
      >
        <button
          onClick={() => {
            setOpen(o => !o);
          }}
          className={twMerge(
            'bg-green-500 p-3 rounded-[50%] shadow-lg mx-2',
            'desktop:hidden',
          )}
        >
          <Add className="text-primaryContrast w-[24px] h-[24px]" />
        </button>
        {activeMoveableObject && <ObjectProperties />}
      </div>

      <TransparentModal
        className={twMerge('z-10 fixed bottom-0 max-h-[30%] h-fit', {
          hidden: !selectedProperty,
        })}
      >
        <SelectedObjectProperty />
      </TransparentModal>
    </>
  );
};
