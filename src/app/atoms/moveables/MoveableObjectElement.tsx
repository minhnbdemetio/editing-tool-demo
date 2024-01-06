import { FC, RefObject } from 'react';

import { MoveableObject } from '@/app/factories/MoveableObject';
import { MoveableRectangleElement } from './MoveableRectangleElement';
import { MoveableTextElement } from './MoveableTextElement';
import { MoveableLineElement } from './MoveableLineElement';
import { MovableLineController } from '@/app/molecules/MovableLineController';

interface MoveableObjectProps {
  object: MoveableObject;
  containerRef: RefObject<HTMLDivElement>;
}

export const MoveableObjectElement: FC<MoveableObjectProps> = props => {
  const renderElement = () => {
    switch (props.object.type) {
      case 'rectangle': {
        return <MoveableRectangleElement {...props} />;
      }
      case 'text': {
        return <MoveableTextElement {...props} />;
      }
      case 'line': {
        return <MoveableLineElement {...props} />;
      }
    }
  };

  return (
    <>
      <div className="relative">
        {renderElement()}

        <MovableLineController />
      </div>
    </>
  );
};
