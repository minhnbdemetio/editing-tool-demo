import { FC, MouseEvent, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { PageMenuAction, PageMenuItems } from './items';
import { twMerge } from '@/app/utilities/tailwind';
import { useAddPage, useClonePage, useDeletePage } from '@/app/hooks/usePage';
import { useActivePage } from '@/app/store/active-page';
import { PageList } from './PageList';
import { Close } from '@/app/icons';
import { VerticalDivider } from '../VerticalDivider';
import { useSelectMultiplePages } from '@/app/store/select-multiple-pages';

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
  const {
    activePages,
    isEnabledSelectMultiple,
    setActivePages,
    setIsEnabledSelectMultiple,
  } = useSelectMultiplePages();

  const handleAddPage = useCallback(() => {
    if (isEnabledSelectMultiple) {
      activePages.forEach(() => addPage([]));
    } else {
      addPage([]);
    }
  }, [isEnabledSelectMultiple, activePages, addPage]);

  const handleClickAction = (action: PageMenuAction) => {
    switch (action) {
      case 'addPage':
        handleAddPage();

        break;
      case 'duplicate':
        if (isEnabledSelectMultiple) {
          activePages.forEach(page => {
            clonePage(page);
          });
        } else if (activePage) {
          clonePage(activePage);
        }

        break;
      case 'delete':
        if (isEnabledSelectMultiple) {
          activePages.forEach(page => deletePage(page));

          setActivePages([]);
        } else if (activePage) {
          deletePage(activePage);
        }

        break;
      case 'select':
        setIsEnabledSelectMultiple(!isEnabledSelectMultiple);

        if (isEnabledSelectMultiple) {
          setActivePages([]);
        }

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
          'w-full min-h-19 bg-white flex flex-row gap-3 px-4 items-center shadow-menu',
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
              key={key}
              className="w-auto aspect-[66/76] py-2 desktop:aspect-square desktop:py-1"
            >
              <span
                className={twMerge(
                  'w-full h-full items-center flex justify-center flex-col text-primaryGray',
                  {
                    'bg-[#8493AE]/[0.16] rounded-lg':
                      isEnabledSelectMultiple && key === 'select',
                  },
                )}
              >
                <div className="relative">
                  <Icon className="w-[22px] h-[22px] mx-auto mb-1 text-[#48505F]" />
                  {key === 'select' && isEnabledSelectMultiple ? (
                    <span
                      className={clsx(
                        'w-4 h-4 rounded-full bg-error text-white text-xs leading-snug font-bold',
                        'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2',
                      )}
                    >
                      {activePages.length}
                    </span>
                  ) : null}
                </div>
                <p className="w-full leading-[15px] text-xs font-normal  text-center whitespace-nowrap  overflow-hidden text-ellipsis">
                  {label}
                </p>
              </span>
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
