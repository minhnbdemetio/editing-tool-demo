import { FC, RefObject } from 'react';
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
      dangerouslySetInnerHTML={{ __html: object.line?.toSvg() || '' }}
    ></div>
  );
};
