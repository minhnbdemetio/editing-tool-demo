import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { PositionPropertyAdvanced } from './PositionPropertyAdvanced';
import { PositionPropertyArrange } from './PositionPropertyArrange';

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
        <PositionPropertyArrange />
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
