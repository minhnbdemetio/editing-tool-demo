import { FC } from 'react';
import { usePages } from '@/app/hooks/usePage';
import { Add } from '@/app/icons';
import { PageRender } from './PageRender';

interface PageListProps {
  addPage: () => void;
}

export const PageList: FC<PageListProps> = ({ addPage }) => {
  const pages = usePages();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {pages?.map((page, index) => {
        return <PageRender key={page} page={page} index={index} />;
      })}
      <div
        className="flex w-full px-0.5 pb-2 flex-col items-center gap-2 flex-shrink-0 rounded-lg relative cursor-pointer"
        onClick={() => addPage()}
      >
        <div className="relative w-full bg-default13 aspect-[153/137] rounded-lg border flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Add className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
