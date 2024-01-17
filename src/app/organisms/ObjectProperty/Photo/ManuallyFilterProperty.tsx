import {
  useActiveMoveableLineObject,
  useActiveMoveablePhotoObject,
  useAlignElement,
} from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider } from '@nextui-org/react';
import { FC, useState } from 'react';

export const ManuallyFilterProperty: FC = () => {
  const photo = useActiveMoveablePhotoObject();

  const [contrast, setContrast] = useState(photo?.contrast || 0);

  return (
    <div className="">
      <Slider
        label="Contrast"
        step={1}
        maxValue={100}
        minValue={-100}
        value={contrast}
        onChange={value => {
          setContrast(value as number);
          photo?.changeContrast(value as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />
    </div>
  );
};
