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
    if (listRef.current) {
      listRef.current.scrollTo({
        top: e.currentTarget.getBoundingClientRect().top - 200,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div
      className={clsx(
        'w-[56px] h-full   bg-white ',
        'desktop:flex desktop:flex-col ',
      )}
    >
      <div
        ref={listRef}
        className={twMerge(
          'h-[calc(100%-100px)] overflow-y-auto w-full no-scrollbar ',
          'desktop:h-auto  desktop:flex-auto desktop:mt-4 ',
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
              'w-full items-center flex justify-center flex-col aspect-square h-auto text-gray-500 px-[3px] cursor-pointer',
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
      <div>
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
