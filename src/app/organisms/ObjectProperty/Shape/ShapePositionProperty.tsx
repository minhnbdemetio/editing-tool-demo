import { Button } from '@nextui-org/react';
import { FC, useState } from 'react';
import { PositionPropertyArrange } from '../PositionPropertyArrange';
import { PositionPropertyAdvanced } from '../PositionPropertyAdvanced';

interface ShapePositionPropertyProps {}
enum MODE {
  'arrange',
  'advanced',
}
export const ShapePositionProperty: FC<ShapePositionPropertyProps> = ({}) => {
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
