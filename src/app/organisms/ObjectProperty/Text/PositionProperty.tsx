import { GoToTop, MoveOn } from '@/app/icons';
import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { PositionPropertyAdvanced } from './PositionPropertyAdvanced';

interface PositionPropertyProps {}
enum MODE {
  'arrange',
  'advanced',
}
export const PositionProperty: FC<PositionPropertyProps> = ({}) => {
  const [mode, setMode] = useState<MODE>(MODE.arrange);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center m-1">
        <span>Vị trí</span>
      </div>
      {mode === MODE.arrange ? (
        <div className="w-full flex-1">
          <div className="flex w-full">
            <div className="w-1/2 flex h-10 items-center">
              <MoveOn className="mx-4" />
              Tiến lên 1 lớp
            </div>
            <div className="w-1/2 flex h-10 items-center">
              <MoveOn className="mx-4 rotate-180" /> Lùi 1 lớp
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/2 flex h-10 items-center">
              <GoToTop className="mx-4" />
              Lên trước
            </div>
            <div className="w-1/2 flex h-10 items-center">
              <GoToTop className="mx-4 rotate-180" /> Về sau
            </div>
          </div>
        </div>
      ) : (
        <PositionPropertyAdvanced />
      )}
      <div className="flex w-full text-center justify-center">
        <Button
          className={`${mode !== MODE.arrange && 'bg-white'}`}
          onClick={() => setMode(MODE.arrange)}
        >
          Sắp xếp
        </Button>
        <Button
          className={`${mode !== MODE.advanced && 'bg-white'}`}
          onClick={() => setMode(MODE.advanced)}
        >
          Nâng cao
        </Button>
      </div>
    </div>
  );
};
