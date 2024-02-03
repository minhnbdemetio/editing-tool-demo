import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { SideMenuItem, SideMenuItems } from './items';
import { twMerge } from '@/app/utilities/tailwind';
import { ChevronDoubleLeft, Close, Widget } from '@/app/icons';
import { PageMenu } from '../PageMenu';
import { Page } from '@/app/icons/Page';
import { usePages } from '@/app/hooks/usePage';
import { VerticalDivider } from '../VerticalDivider';

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

  const [openPage, setOpenPage] = useState(false);
  const pages = usePages();

  return (
    <div
      className={clsx(
        'w-full h-19 bg-white flex flex-row overflow-x-auto px-4',
        'desktop:flex desktop:flex-col desktop:h-full desktop:w-[56px] desktop:px-0',
      )}
    >
      <div
        ref={listRef}
        className={twMerge(
          'w-full h-full overflow-auto flex gap-3 items-center',
          'desktop:flex-col desktop:flex-auto desktop:mt-4 desktop:h-[calc(100%-100px)]',
        )}
      >
        {!openPage
          ? SideMenuItems.map(({ icon: Icon, key, label }) => (
              <button
                onClick={e => {
                  e.persist();
                  scrollTo(e);
                  onChange(key);
                }}
                className={twMerge(
                  clsx(
                    'w-[66px] shrink-0 gap-1 items-center flex justify-center flex-col aspect-[66/76] h-full text-primaryGray',
                    'desktop:h-auto desktop:w-full desktop:py-1 desktop:aspect-square',
                  ),
                )}
                key={key}
              >
                <Icon className="w-[24px] h-[24px] mx-auto " />
                <p className="w-full leading-[14px] text-xs font-normal  text-center whitespace-nowrap  overflow-hidden text-ellipsis">
                  {label}
                </p>
              </button>
            ))
          : null}

        <VerticalDivider />

        <button
          onClick={() => {
            setOpenPage(true);
          }}
          className={twMerge('px-3 desktop:hidden relative')}
        >
          <Page className=" w-[45px] h-[45px]" />
          <span className="absolute top-1/2 left-[25px] -translate-y-1/2 font-bold font-normal">
            {pages.length}
          </span>
        </button>

        {openPage && <PageMenu onClose={() => setOpenPage(false)} />}
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
