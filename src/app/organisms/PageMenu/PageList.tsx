import { FC } from 'react';
import { usePages } from '@/app/hooks/usePage';
import { useActivePage } from '@/app/store/active-page';
import { twMerge } from '@/app/utilities/tailwind';
import { Add } from '@/app/icons';

interface PageListProps {
  addPage: () => void;
}

export const PageList: FC<PageListProps> = ({ addPage }) => {
  const pages = usePages();
  const { setActivePage, activePage } = useActivePage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {pages.map((page, index) => {
        return (
          <div
            className={twMerge(
              'flex w-full px-0.5 pb-2 flex-col items-center gap-2 flex-shrink-0 rounded-lg cursor-pointer',
              { 'bg-[#A8C5FA33]': page === activePage },
            )}
            key={page}
            onClick={() => setActivePage(page)}
          >
            <div
              className={twMerge(
                'w-full bg-[#EBECF0] pb-[100%] rounded-lg border',
                {
                  'border-solid border-primary1': page === activePage,
                },
              )}
            ></div>
            <div className="h-6 flex items-center">{index + 1}</div>
          </div>
        );
      })}
      <div
        className="flex w-full px-0.5 pb-2 flex-col items-center gap-2 flex-shrink-0 rounded-lg relative cursor-pointer"
        onClick={() => addPage()}
      >
        <div className="w-full bg-[#EBECF0] pb-[calc(100%)] rounded-lg border flex items-center justify-center"></div>
        <div className="absolute top-[calc(50%-20px)]">
          <Add className="w-10 h-10" />
        </div>
        <div className="h-6 flex items-center">Add page</div>
      </div>
    </div>
  );
};
