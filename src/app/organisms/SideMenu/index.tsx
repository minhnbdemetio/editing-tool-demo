import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { SideMenuItem, SideMenuItems } from './items';
import { twMerge } from '@/app/utilities/tailwind';
import { ChevronDoubleLeft } from '@/app/icons';

interface SideMenuProps {
  selectedSection: SideMenuItem['key'];
  menuExpand: boolean;
  onChange: (key: SideMenuItem['key']) => void;
  onMenuCollapse: (menuExpand: boolean) => void;
}

export const SideMenu: FC<SideMenuProps> = ({
  selectedSection,
  onChange,
  menuExpand,
  onMenuCollapse,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((e: MouseEvent) => {
    e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);

  return (
    <div
      className={clsx(
        'w-full h-[72px]   bg-white flex flex-row ',
        'desktop:flex desktop:flex-col desktop:h-full desktop:w-[56px]',
      )}
    >
      <div
        ref={listRef}
        className={twMerge(
          'h-full overflow-y-auto flex-row flex  w-[calc(100%-100px)] no-scrollbar ',
          ' desktop:flex-col desktop:flex-auto desktop:mt-4 desktop:h-[calc(100%-100px)] w-full ',
        )}
      >
        {SideMenuItems.map(({ icon: Icon, key, label }) => (
          <div
            onClick={e => {
              e.persist();
              scrollTo(e);
              onChange(key);
            }}
            className={twMerge(
              'w-auto items-center flex justify-center flex-col aspect-square h-full text-gray-500 px-[3px] cursor-pointer',
              'desktop:h-auto desktop:w-full',
              {
                'bg-green-200 text-primary': selectedSection === key,
              },
            )}
            key={key}
          >
            <Icon className="w-[24px] h-[24px] mx-auto " />
            <p className="w-full leading-[14px] text-xs font-normal  text-center whitespace-nowrap  overflow-hidden text-ellipsis">
              {label}
            </p>
          </div>
        ))}
      </div>
      <div className="hidden desktop:block">
        <button
          onClick={() => onMenuCollapse(!menuExpand)}
          className={twMerge(
            'w-full h-auto flex aspect-square justify-center items-center duration-300',
            { 'rotate-180': menuExpand },
          )}
        >
          <ChevronDoubleLeft className="w-[24px] h-[24px] text-gray-500" />
        </button>
      </div>
    </div>
  );
};
