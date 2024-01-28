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
import { Close, Widget, Add } from '@/app/icons';
import { PageMenu } from './PageMenu';

export const Menu: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SideMenuItem['key']>('templates');

  const [menuExpand, setMenuExpand] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openPage, setOpenPage] = useState(false);
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
          hidden: Boolean(selectedProperty) || openPage,
        })}
      >
        <button
          onClick={() => {
            setOpen(o => !o);
          }}
          className={twMerge(
            'bg-primary1 p-3 rounded-[50%] shadow-lg m-4',
            'desktop:hidden',
          )}
        >
          <Add className="text-primaryContrast w-[24px] h-[24px]" />
        </button>
        {activeMoveableObject && <ObjectProperties />}
      </div>

      <div
        className={clsx('py-1 flex items-center fixed bottom-0 z-40', {
          'right-0': !Boolean(openPage),
        })}
      >
        <button
          onClick={() => {
            setOpenPage(o => !o);
          }}
          className={twMerge(
            'bg-default1 p-3 rounded-[50%] shadow-lg m-4',
            'desktop:hidden',
          )}
        >
          {openPage ? (
            <Close className=" w-[24px] h-[24px]" />
          ) : (
            <Widget className=" w-[24px] h-[24px]" />
          )}
        </button>
      </div>
      <div className={twMerge('relative', { hidden: !openPage })}>
        {openPage && <PageMenu onClose={() => setOpenPage(false)} />}
      </div>
      <TransparentModal
        className={twMerge(
          'z-10 fixed bottom-0 max-h-[30%] h-fit overflow-auto',
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
