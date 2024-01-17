import { useAlignElement } from '@/app/hooks/useActiveMoveableObject';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const PhotoAlignProperty: FC = () => {
  const alignElement = useAlignElement();

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button onClick={() => alignElement('left')}>Left</Button>
      <Button onClick={() => alignElement('top')}>Top</Button>
      <Button onClick={() => alignElement('center')}>Center</Button>
      <Button onClick={() => alignElement('middle')}>Middle</Button>
      <Button onClick={() => alignElement('right')}>Right</Button>
      <Button onClick={() => alignElement('bottom')}>Bottom</Button>
    </div>
  );
};
