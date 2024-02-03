import { FC, MouseEvent, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { PageMenuAction, PageMenuItems } from './items';
import { twMerge } from '@/app/utilities/tailwind';
import { useAddPage, useClonePage, useDeletePage } from '@/app/hooks/usePage';
import { useActivePage } from '@/app/store/active-page';
import { PageList } from './PageList';
import { Close } from '@/app/icons';
import { VerticalDivider } from '../VerticalDivider';

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
  const { activePage, setActivePage } = useActivePage();

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
      case 'select':
        // TODO: Update action
        break;
    }
  };

  return (
    <div
      className={twMerge(
        'fixed top-12 bottom-0 justify-between left-0 duration-300 w-screen z-30 flex flex-col-reverse bg-default1',
        'desktop:hidden',
      )}
    >
      <div
        className={clsx(
          'w-full h-19 bg-white flex flex-row gap-3 px-4 items-center shadow-menu',
          'desktop:hidden',
        )}
      >
        <button
          onClick={onClose}
          className="rounded-full p-3 drop-shadow-button bg-white"
        >
          <Close className=" w-[24px] h-[24px]" />
        </button>

        <VerticalDivider />

        <div
          ref={listRef}
          className={twMerge(
            'h-full overflow-y-auto flex-row flex gap-3 flex-1 no-scrollbar',
            'desktop:flex-col desktop:flex-auto desktop:mt-4 desktop:h-[calc(100%-100px)] w-full ',
          )}
        >
          {PageMenuItems.map(({ icon: Icon, key, label }) => (
            <button
              onClick={e => {
                e.persist();
                scrollTo(e);
                handleClickAction(key);
              }}
              className={twMerge(
                'w-auto items-center flex justify-center flex-col aspect-[66/76] h-full text-primaryGray',
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
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <PageList addPage={handleAddPage} />
      </div>
    </div>
  );
};
