import { FC } from 'react';
import { MoveableLineObject } from '@/app/factories/MoveableLine';
import './style.scss';

interface MoveableLineElementProps {
  object: MoveableLineObject;
}

export const MoveableLineElement: FC<MoveableLineElementProps> = ({
  object,
}) => {
  return (
    <div
      id={object.id}
      className={` hidden absolute border-none`}
      style={{
        transformOrigin: `${object.line?.padding}px center`,
        transform: `translate(-${object.line?.padding}px, -${object.line?.padding}px)`,
      }}
      dangerouslySetInnerHTML={{ __html: object.line?.toSvg() || '' }}
    ></div>
  );
};
