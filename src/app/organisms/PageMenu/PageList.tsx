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
        <div className="w-full bg-[#EBECF0] pb-[calc(100%)] rounded-lg border flex items-center justify-center"></div>
        <div className="absolute top-[calc(50%-20px)]">
          <Add className="w-10 h-10" />
        </div>
        <div className="h-6 flex items-center">Add page</div>
      </div>
    </div>
  );
};
