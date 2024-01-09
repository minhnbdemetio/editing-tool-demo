import { FC, RefObject } from 'react';
import { MoveableLineObject } from '@/app/factories/MoveableLine';
import './style.scss';

interface MoveableLineElementProps {
  object: MoveableLineObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableLineElement: FC<MoveableLineElementProps> = ({
  object,
  containerRef,
}) => {
  return (
    <div
      id={object.id}
      className={` hidden absolute border-none`}
      style={{ transformOrigin: `${object.line?.padding}px center` }}
      dangerouslySetInnerHTML={{ __html: object.line?.toSvg() || '' }}
    ></div>
  );
};
