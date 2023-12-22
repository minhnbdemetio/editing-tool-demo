'use client';

import { FC, useState } from 'react';
import { MenuContent } from './MenuContent';
import { SideMenu } from './SideMenu';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { Add } from '../icons/Add';
import { SideMenuItem } from './SideMenu/items';

export const Menu: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SideMenuItem['key']>('templates');

  const [menuExpand, setMenuExpand] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <div
        className={twMerge('absolute top-0 transition-all z-30 w-full h-full')}
      > */}
      <div
        className={twMerge(
          'absolute  duration-300 h-full left-[-100%] w-fit h-full top-0  z-30 flex',
          {
            'left-0': open,
          },
          'desktop:relative desktop:left-0',
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
      {/* backdrop */}

      <div
        onClick={() => {
          setOpen(false);
        }}
        className={clsx(
          'absolute top-0 fadein z-20 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]',
          {
            'hidden ': !open,
          },
          'md:hidden',
        )}
      ></div>
      {/* </div> */}

      <button
        onClick={() => {
          setOpen(o => !o);
        }}
        className={twMerge(
          'bg-green-500 p-3 rounded-[50%] z-10 shadow-lg fixed right-[10px] bottom-[10px]',
          'desktop:hidden',
        )}
      >
        <Add className="text-primaryContrast w-[24px] h-[24px]" />
      </button>
    </>
  );
};
