import { FC, useState } from 'react';
import MoveableHelper from 'moveable-helper';
import Moveable from 'react-moveable';
import { MoveableObject } from '@/app/factories/MoveableObject';

interface MoveableRectangleProps {
  object: MoveableObject;
}

export const MoveableObjectElement: FC<MoveableRectangleProps> = ({
  object,
}) => {
  const [helper] = useState(() => {
    return new MoveableHelper();
  });

  return (
    <Moveable
      target={document.getElementById(object.id)}
      draggable={true}
      scalable={true}
      keepRatio={true}
      rotatable={true}
      resizable={true}
      onDrag={e => (e.target.style.transform = e.transform)}
      onScale={e => {
        e.target.style.transform = e.drag.transform;
      }}
      onRotate={e => {
        e.target.style.transform = e.drag.transform;
      }}
      onResize={e => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
      }}
    />
  );
};
