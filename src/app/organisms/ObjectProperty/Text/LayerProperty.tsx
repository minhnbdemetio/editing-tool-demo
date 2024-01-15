import { usePageObjectsById } from '@/app/hooks/usePageObjects';
import { LayerRender } from '@/app/molecules/LayerRender';
import { useActivePage } from '@/app/store/active-page';
import { FC, useState } from 'react';

interface LayerPropertyProps {}
enum MODE {
  'all',
  'override',
}
export const LayerProperty: FC<LayerPropertyProps> = ({}) => {
  const [mode, setMode] = useState<MODE>(MODE.all);
  const { activePage } = useActivePage();
  const [pageObjects] = usePageObjectsById(activePage);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center m-1">
        <span>Lớp</span>
      </div>
      <div className="w-full h-10 border border-[#2b3b4a4d] rounded flex">
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.all && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.all)}
        >
          Tất cả
        </div>
        <div
          className={`w-1/2 m-1 flex items-center justify-center ${
            mode === MODE.override && 'bg-[#394c6026] rounded font-medium'
          }`}
          onClick={() => setMode(MODE.override)}
        >
          Đè lên nhau
        </div>
      </div>
      {mode === MODE.all && (
        <ul className="h-[calc(30vh-90px)] w-full overflow-auto">
          {pageObjects &&
            pageObjects.map(pageObject => (
              <LayerRender key={pageObject.id} pageObject={pageObject} />
            ))}
        </ul>
      )}
    </div>
  );
};
