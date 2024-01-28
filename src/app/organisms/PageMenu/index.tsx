import { FC, MouseEvent, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { PageMenuAction, PageMenuItems } from './items';
import { twMerge } from '@/app/utilities/tailwind';
import { useAddPage, useClonePage, useDeletePage } from '@/app/hooks/usePage';
import { useActivePage } from '@/app/store/active-page';
import { PageList } from './PageList';

interface PageMenuProps {
  onClose: () => void;
}

export const PageMenu: FC<PageMenuProps> = ({ onClose }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((e: MouseEvent) => {
    e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);
  const addPage = useAddPage();
  const clonePage = useClonePage();
  const deletePage = useDeletePage();
  const { activePage } = useActivePage();

  const handleAddPage = useCallback(() => {
    addPage([]);
  }, [addPage]);

  const handleClonePage = () => {
    clonePage(activePage);
  };

  const handleClickAction = (action: PageMenuAction) => {
    switch (action) {
      case 'addPage':
        handleAddPage();
        break;
      case 'duplicate':
        handleClonePage();
        break;
      case 'delete':
        activePage && deletePage(activePage);
        break;
    }
  };

  return (
    <div
      className={twMerge(
        'absolute duration-300 w-screen h-full left-0 z-30 flex flex-col-reverse bottom-0 bg-default1',
        'desktop:hidden',
      )}
    >
      <div
        className={clsx(
          'w-full h-[76px] bg-white flex flex-row pl-20 items-center',
          'desktop:hidden',
        )}
      >
        <div className="h-9 w-0.5 bg-[#E0E0E0]"></div>
        <div
          ref={listRef}
          className={twMerge(
            'h-full overflow-y-auto flex-row flex  w-[calc(100%-100px)] no-scrollbar ',
            ' desktop:flex-col  desktop:flex-auto desktop:mt-4 desktop:h-[calc(100%-100px)] w-full ',
          )}
        >
          {PageMenuItems.map(({ icon: Icon, key, label }) => (
            <div
              onClick={e => {
                e.persist();
                scrollTo(e);
                handleClickAction(key);
              }}
              className={twMerge(
                'w-auto items-center flex justify-center flex-col aspect-square h-full text-gray-500 px-[3px] cursor-pointer',
                'desktop:h-auto desktop:w-full desktop:py-1 desktop:aspect-square',
                {
                  'bg-green-200 text-primary': false,
                },
              )}
              key={key}
            >
              <Icon className="w-[22px] h-[22px] mx-auto mb-1 text-[#48505F]" />
              <p className="w-full leading-[15px] text-xs font-normal  text-center whitespace-nowrap  overflow-hidden text-ellipsis">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[calc(100%-76px)] overflow-y-auto">
        <PageList addPage={handleAddPage} />
      </div>
    </div>
  );
};
